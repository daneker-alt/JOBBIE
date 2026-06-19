import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Document, Packer } from 'docx'
import type { WorkspaceData } from './types'
import { buildContractDoc, docToParagraphs } from './contracts/generate'

function buildManifest(d: WorkspaceData): string {
  const { companyProfile: p, ddCategories, investorDocs, activeContracts, ipAssets } = d
  const totalItems = ddCategories.reduce((s, c) => s + c.items.length, 0)
  const doneItems = ddCategories.reduce((s, c) => s + c.items.filter(i => i.done).length, 0)
  const readiness = Math.round((doneItems / totalItems) * 100)

  const lines: string[] = []
  lines.push(`DATA ROOM — ${p.name}`)
  lines.push(`БИН: ${p.bin}    Сформировано: ${new Date().toLocaleDateString('ru-RU')}`)
  lines.push('')
  lines.push(`DD READINESS: ${readiness}%`)
  lines.push('')
  lines.push('— DUE DILIGENCE CHECKLIST —')
  for (const cat of ddCategories) {
    const done = cat.items.filter(i => i.done).length
    lines.push(`${cat.name} (${done}/${cat.items.length})`)
    for (const item of cat.items) {
      lines.push(`  [${item.done ? 'x' : ' '}] ${item.title}`)
    }
  }
  lines.push('')
  lines.push('— ДОКУМЕНТЫ ДЛЯ ИНВЕСТОРА —')
  for (const doc of investorDocs) {
    lines.push(`  ${doc.name} — ${doc.status}${doc.date ? ` (${doc.date})` : ''}`)
  }
  lines.push('')
  lines.push('— IP-АКТИВЫ —')
  for (const a of ipAssets) {
    lines.push(`  ${a.name} (${a.type}) — ${a.status}, риск ${a.riskScore}/100`)
  }
  lines.push('')
  lines.push('— АКТИВНЫЕ КОНТРАКТЫ —')
  for (const c of activeContracts) {
    lines.push(`  ${c.client} — ${c.type} — ${c.status}${c.signature ? ' — подписан (' + c.signature.method + ')' : ''}`)
  }
  lines.push('')
  lines.push('Документ сформирован автоматически платформой Kerege.ON и требует проверки практикующим юристом РК перед передачей инвестору.')
  return lines.join('\n')
}

export async function downloadDataRoom(d: WorkspaceData) {
  const zip = new JSZip()
  zip.file('00-Manifest.txt', buildManifest(d))

  const readyTemplates = d.contractTemplates.filter(t => t.status === 'ready')
  for (const tpl of readyTemplates) {
    const built = buildContractDoc(tpl.name, d.companyProfile, {})
    if (!built) continue
    const document = new Document({ sections: [{ children: docToParagraphs(built) }] })
    const blob = await Packer.toBlob(document)
    const filename = `${tpl.name.split(' ')[0].replace(/[^\w-]/g, '')}.docx`
    zip.file(`Documents/${filename}`, blob)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `DataRoom_${d.companyProfile.name.replace(/[^\w-]/g, '_')}.zip`)
}

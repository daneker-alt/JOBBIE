import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import type { CompanyProfile } from '../types'
import type { ContractDoc } from './content'
import {
  buildNDA, buildIPAssignment, buildContractorAgreement, buildMSA,
  buildSaaSTerms, buildSLA, buildPOCAgreement, buildInvoice,
} from './content'

export type TemplateKey =
  | 'MSA (Master Service Agreement)'
  | 'SaaS Terms of Service'
  | 'SLA (Service Level Agreement)'
  | 'POC / Pilot Agreement'
  | 'NDA (Non-Disclosure Agreement)'
  | 'IP Assignment Agreement'
  | 'Contractor Agreement'
  | 'Invoice Template (KZ)'

export interface GenerateContext {
  counterparty?: string
  assetDescription?: string
  scope?: string
  amount?: string
  description?: string
}

export function buildContractDoc(key: string, profile: CompanyProfile, ctx: GenerateContext = {}): ContractDoc | null {
  switch (key) {
    case 'NDA (Non-Disclosure Agreement)':
      return buildNDA(profile, ctx.counterparty ?? '')
    case 'IP Assignment Agreement':
      return buildIPAssignment(profile, ctx.counterparty ?? '', ctx.assetDescription ?? '')
    case 'Contractor Agreement':
      return buildContractorAgreement(profile, ctx.counterparty ?? '', ctx.scope ?? '')
    case 'MSA (Master Service Agreement)':
      return buildMSA(profile, ctx.counterparty ?? '')
    case 'SaaS Terms of Service':
      return buildSaaSTerms(profile)
    case 'SLA (Service Level Agreement)':
      return buildSLA(profile, ctx.counterparty ?? '')
    case 'POC / Pilot Agreement':
      return buildPOCAgreement(profile, ctx.counterparty ?? '')
    case 'Invoice Template (KZ)':
      return buildInvoice(profile, ctx.counterparty ?? '', ctx.amount ?? '', ctx.description ?? '')
    default:
      return null
  }
}

export function docToParagraphs(doc: ContractDoc): Paragraph[] {
  const paragraphs: Paragraph[] = []

  paragraphs.push(new Paragraph({
    text: doc.title,
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }))

  if (doc.preamble) {
    paragraphs.push(new Paragraph({ text: doc.preamble, spacing: { after: 300 } }))
  }

  for (const section of doc.sections) {
    paragraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [new TextRun({ text: section.heading, bold: true })],
    }))
    for (const clause of section.clauses) {
      paragraphs.push(new Paragraph({ text: clause, spacing: { after: 100 } }))
    }
  }

  paragraphs.push(new Paragraph({ text: '', spacing: { before: 300 } }))
  paragraphs.push(new Paragraph({
    children: [new TextRun({ text: 'Подписи сторон:', bold: true })],
    spacing: { after: 200 },
  }))
  for (const note of doc.signatureBlock) {
    paragraphs.push(new Paragraph({
      children: [new TextRun({ text: note, italics: true, size: 18 })],
      spacing: { after: 100 },
    }))
  }

  return paragraphs
}

export async function downloadContract(key: string, profile: CompanyProfile, ctx: GenerateContext = {}) {
  const doc = buildContractDoc(key, profile, ctx)
  if (!doc) return

  const document = new Document({
    sections: [{ children: docToParagraphs(doc) }],
  })

  const blob = await Packer.toBlob(document)
  const filename = `${key.split(' ')[0].replace(/[^\w-]/g, '')}.docx`
  saveAs(blob, filename)
}

function renderDocHtml(doc: ContractDoc): string {
  const sections = doc.sections.map(s => `
    <h2 style="font-size:13px;font-weight:700;margin:14px 0 6px;">${s.heading}</h2>
    ${s.clauses.map(c => `<p style="margin:0 0 6px;">${c}</p>`).join('')}
  `).join('')
  const signature = doc.signatureBlock.map(n => `<p style="margin:0 0 4px;font-style:italic;color:#666;">${n}</p>`).join('')
  return `
    <div style="width:680px;font-family:Arial,sans-serif;font-size:11.5px;line-height:1.5;color:#111;padding:10px;">
      <h1 style="font-size:16px;text-align:center;margin:0 0 16px;">${doc.title}</h1>
      ${doc.preamble ? `<p style="margin:0 0 14px;">${doc.preamble}</p>` : ''}
      ${sections}
      <p style="margin:20px 0 8px;font-weight:700;">Подписи сторон:</p>
      ${signature}
    </div>
  `
}

export async function downloadContractPdf(key: string, profile: CompanyProfile, ctx: GenerateContext = {}) {
  const doc = buildContractDoc(key, profile, ctx)
  if (!doc) return

  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])

  const container = window.document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '0'
  container.style.top = '0'
  container.style.zIndex = '-9999'
  container.style.pointerEvents = 'none'
  container.style.background = '#fff'
  container.innerHTML = renderDocHtml(doc)
  window.document.body.appendChild(container)

  const canvas = await html2canvas(container, { scale: 1.5, backgroundColor: '#ffffff' })
  window.document.body.removeChild(container)

  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const pxPerPdfPt = canvas.height / imgHeight

  let renderedHeight = 0
  let first = true
  while (renderedHeight < imgHeight) {
    if (!first) pdf.addPage()
    first = false
    const sliceHeightPt = Math.min(pageHeight, imgHeight - renderedHeight)
    const sliceCanvas = window.document.createElement('canvas')
    sliceCanvas.width = canvas.width
    sliceCanvas.height = sliceHeightPt * pxPerPdfPt
    const ctx2d = sliceCanvas.getContext('2d')!
    ctx2d.drawImage(canvas, 0, renderedHeight * pxPerPdfPt, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height)
    pdf.addImage(sliceCanvas.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, imgWidth, sliceHeightPt)
    renderedHeight += sliceHeightPt
  }

  const filename = `${key.split(' ')[0].replace(/[^\w-]/g, '')}.pdf`
  pdf.save(filename)
}

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

function docToParagraphs(doc: ContractDoc): Paragraph[] {
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

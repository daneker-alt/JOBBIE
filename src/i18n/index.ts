import ru from './ru'
import kk from './kk'
import en from './en'
import type { Lang, Dict } from './types'

export type { Lang, Dict }
export const dictionaries: Record<Lang, Dict> = { ru, kk, en }
export const langLabels: Record<Lang, string> = { ru: 'RU', kk: 'KZ', en: 'EN' }
export const langNames: Record<Lang, string> = { ru: 'Русский', kk: 'Қазақша', en: 'English' }

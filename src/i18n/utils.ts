import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL) {
    const lang = url.pathname.split('/').find(lang => lang in ui)
    if (lang) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof lang], data?: string[]) {
        const text = key in ui[lang] ? ui[lang][key] : ui[defaultLang][key]
        // return typeof text === 'function' ? text(data || []) : text; // Para quando precisa fazer interpolação de dados no texto, mas deve-se evitar
        return text
    }
}

export type T = ReturnType<typeof useTranslations>

export function getLanguages() {
    return Object.keys(ui) as Lang[]
}
export const getLangUrl = (currentUrl: string, lang: Lang) => {
    const languages = getLanguages()
    const parts = currentUrl.split("/").filter(x => x && !languages.includes(x as Lang))
    return [...parts.slice(0, -1), lang, parts[parts.length - 1]].join("/")
}
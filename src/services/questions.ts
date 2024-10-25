import type { T } from "../i18n/utils"
import { tree } from "../utils"

export const defaultLanguagesToEvaluate = ['pt', 'en', 'es', 'de', 'fr', 'it', 'ja'] as const
export type LangCodeToEvaluate = typeof defaultLanguagesToEvaluate[number]

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type LevelsType = typeof levels[number]
const areas = ['understanding.listening', 'understanding.reading', 'speaking.spoken_interaction', 'speaking.spoken_production', 'writing'] as const
export type AreasType = typeof areas[number]

export type QuestionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30

export type Question = {
    id: QuestionId,
    area: AreasType,
    level: LevelsType,
    section_title: string,
    description: string,
}

export type HistoryEntry = { area: AreasType, id: number, resposta: 'S' | 'N' }

export const FLAGS = {
    COMPLETE: 1 << 0,
    A1: 1 << 1,
    A2: 1 << 2,
    B1: 1 << 3,
    B2: 1 << 4,
    C1: 1 << 5,
    C2: 1 << 6,
}

export const isInsuficient = (s: number) => !(s & FLAGS.A1)
export const isA1 = (s: number) => !!((s & FLAGS.A1) && !(s & FLAGS.A2))
export const isA2 = (s: number) => !!((s & FLAGS.A2) && !(s & FLAGS.B1))
export const isB1 = (s: number) => !!((s & FLAGS.B1) && !(s & FLAGS.B2))
export const isB2 = (s: number) => !!((s & FLAGS.B2) && !(s & FLAGS.C1))
export const isC1 = (s: number) => !!((s & FLAGS.C1) && !(s & FLAGS.C2))
export const isC2 = (s: number) => !!(s & FLAGS.C2)
export const computeState = (s: number) => {
    const checks = [[isInsuficient, "-"], [isA1, "A1"], [isA2, "A2"], [isB1, "B1"], [isB2, "B2"], [isC1, "C1"], [isC2, "C2"]] as [(s: number) => boolean, string][]
    const result = checks.reverse().find(([func]) => func(s))
    return result?.[1] || "-"
}

export function buildQuestionsPath(t: T) {
    const globalPaths = []
    let i = 0;

    for (const area of areas) {
        const section_title = t(`testtool.question.${area}.section_title`) as string
        const areaQuestions = []

        for (const level of levels) {
            const description = t(`testtool.question.${area}.${level}.description`) as string
            areaQuestions.push({
                id: ++i as QuestionId,
                area,
                level,
                section_title,
                description,
            })
        }

        const path = tree(areaQuestions)
        globalPaths.push({
            area,
            path,
        })
    }

    return globalPaths
}

export function getQuestions(t: T) {
    const globalQuestions = []
    let i = 0;

    for (const area of areas) {
        const section_title = t(`testtool.question.${area}.section_title`)

        for (const level of levels) {
            const description = t(`testtool.question.${area}.${level}.description`)
            globalQuestions.push({
                id: ++i,
                area,
                level,
                section_title,
                description,
            })
        }
    }

    return globalQuestions
}

export function getPathHistory() {
    return JSON.parse(sessionStorage.getItem("path-history") || '[]') as HistoryEntry[]
}

export function setPathHistory(history: HistoryEntry[]) {
    const uniquePathHistory = history.filter((value, index, self) =>
        index === self.findIndex(
            (obj) => obj.id === value.id && obj.area === value.area
        )
    );
    sessionStorage.setItem("path-history", JSON.stringify(uniquePathHistory))
}

export function getResults(t: T) {
    const flagMap = getQuestions(t).reduce((prev, cur) => ({
        ...prev,
        [cur.id]: FLAGS[cur.level],
    }), {} as { [id: number]: number })

    const history = getPathHistory()
    const categories = history.reduce((prev, cur) => ({
        ...prev,
        [cur.area]: (prev[cur.area] || 0) | (cur.resposta === 'N' ? 0 : flagMap[cur.id])
    }),{} as Record<AreasType, number>)

    const result = {} as { [area: string]: string }
    for (const category in categories) {
        result[category] = computeState(categories[category as AreasType])
    }

    return result
}
import { getCollection } from "astro:content";
import type { T } from "../i18n/utils";
import { tree } from "../utils";

export async function getCustomCourses() {
    return getCollection("autoAvaliaCustomForms").then((collection) => {
        return collection.map((doc) => {
            let perguntaId = 0
            return {
                ...doc,
                data: {
                    ...doc.data,
                    perguntas: doc.data.perguntas.map((pergunta) => {
                        return {
                            ...pergunta,
                            id: ++perguntaId,
                        }
                    }),
                },
            }
        })
    })
}

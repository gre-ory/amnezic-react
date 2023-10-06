// //////////////////////////////////////////////////
// import

import { JsonMusic, ToMusic, FromMusic } from "./JsonMusic"
import { ThemeQuestion } from "../data/ThemeQuestion"

// //////////////////////////////////////////////////
// adapter

export function ToThemeQuestion( json: JsonThemeQuestion ): ThemeQuestion {
    return {
        id: json.id,
        text: json.text,
        hint: json.hint,
        music: json.music ? ToMusic( json.music ): undefined,
    }
}

export function FromThemeQuestion( question: ThemeQuestion ): JsonThemeQuestion {
    return {
        id: question.id,
        text: question.text,
        hint: question.hint,
        music: question.music ? FromMusic( question.music ) : undefined,
    }
}

export interface JsonThemeQuestion {
    id: number
    text: string
    hint: string
    music?: JsonMusic
}
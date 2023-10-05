// //////////////////////////////////////////////////
// import

import { JsonMusic, ToMusic } from "./JsonMusic"
import { ThemeQuestion } from "../data/ThemeQuestion"

// //////////////////////////////////////////////////
// adapter

export function ToThemeQuestion( json: JsonThemeQuestion ): ThemeQuestion {
    return {
        id: json.id,
        text: json.text,
        hint: json.hint,
        music: ToMusic( json.music ),
    }
}

export interface JsonThemeQuestion {
    id: number
    text: string
    hint: string
    music: JsonMusic
}
// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonThemeQuestion, ToThemeQuestion } from "./JsonThemeQuestion"

// //////////////////////////////////////////////////
// adapter

export function ToTheme( json: JsonTheme ): Theme {
    return {
        id: json.id,
        title: json.title,
        imgUrl: json.imgUrl,
        questions: ( json.questions || [] ).map( jsonQuestion => ToThemeQuestion( jsonQuestion ) )
    }
}

export interface JsonTheme {
    id: number
    title: string
    imgUrl: string
    questions: JsonThemeQuestion[]
}
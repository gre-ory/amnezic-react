// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonThemeQuestion, FromThemeQuestion, ToThemeQuestion } from "./JsonThemeQuestion"

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

export function FromTheme( theme: Theme ): JsonTheme {
    return {
        id: theme.id,
        title: theme.title,
        imgUrl: theme.imgUrl,
        questions: ( theme.questions || [] ).map( question => FromThemeQuestion( question ) )
    }
}

export interface JsonTheme {
    id: number
    title: string
    imgUrl: string
    questions: JsonThemeQuestion[]
}
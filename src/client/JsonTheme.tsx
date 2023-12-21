// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"
import { ThemeLabels, Language, Category } from "../data/ThemeLabels"

import { JsonThemeQuestion, FromThemeQuestion, ToThemeQuestion } from "./JsonThemeQuestion"

// //////////////////////////////////////////////////
// adapter

export function ToTheme( json: JsonTheme ): Theme {
    return {
        id: json.id,
        title: json.title,
        imgUrl: json.imgUrl,
        labels: ToThemeLabels( json.labels ),
        questions: ( json.questions || [] ).map( jsonQuestion => ToThemeQuestion( jsonQuestion ) )
    }
}

export function ToThemeLabels( json?: JsonThemeLabels ): ThemeLabels {
    if (!json) {
        return {}
    }
    return {
        language: json.language ? json.language as Language : undefined,
        category: json.category ? json.category as Category : undefined,
    }
}

export function FromTheme( theme: Theme ): JsonTheme {
    return {
        id: theme.id,
        title: theme.title,
        imgUrl: theme.imgUrl,
        labels: FromThemeLabels( theme.labels ),
        questions: ( theme.questions || [] ).map( question => FromThemeQuestion( question ) )
    }
}

export function FromThemeLabels( labels: ThemeLabels ): JsonThemeLabels | undefined {
    if ( !labels.language && !labels.category ) {
        return undefined
    }
    return {
        language: labels.language,
        category: labels.category,
    }
}

export interface JsonTheme {
    id: number
    title: string
    imgUrl: string
    labels?: JsonThemeLabels
    questions?: JsonThemeQuestion[]
}

export interface JsonThemeLabels {
    language?: string
    category?: string
}
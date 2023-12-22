// //////////////////////////////////////////////////
// import

import { ThemeInfo } from "../data/ThemeInfo"

import { JsonThemeLabels, ToThemeLabels } from "./JsonTheme"

// //////////////////////////////////////////////////
// adapter

export function ToThemeInfo( json: JsonThemeInfo ): ThemeInfo {
    return {
        id: json.id,
        title: json.title,
        imgUrl: json.imgUrl,
        nbQuestion: json.nbQuestion,
        labels: ToThemeLabels( json.labels ),
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonThemeInfo {
    id: number
    title: string
    imgUrl: string
    nbQuestion: number
    labels?: JsonThemeLabels
}
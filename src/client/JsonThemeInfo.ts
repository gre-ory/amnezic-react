// //////////////////////////////////////////////////
// import

import { ThemeInfo } from "../data/ThemeInfo"

// //////////////////////////////////////////////////
// adapter

export function ToThemeInfo( json: JsonThemeInfo ): ThemeInfo {
    return {
        id: json.id,
        title: json.title,
        imgUrl: json.imgUrl,
        nbQuestion: json.nbQuestion,
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonThemeInfo {
    id: number
    title: string
    imgUrl: string
    nbQuestion: number
}
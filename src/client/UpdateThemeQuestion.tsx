// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"
import { ThemeQuestion } from "../data/ThemeQuestion"

import { JsonTheme, ToTheme } from "./JsonTheme"
import { JsonThemeQuestion, FromThemeQuestion } from "./JsonThemeQuestion"

// //////////////////////////////////////////////////
// update theme question

export async function UpdateThemeQuestion( themeId: number, question: ThemeQuestion ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme-question/${themeId}/${question.id}`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonUpdateThemeQuestionBody = {
        question: FromThemeQuestion( question ),
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while updating theme question: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonUpdateThemeQuestionResponse;
    if (!jsonResponse.success) {
        const message = `Unable to update theme question: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonUpdateThemeQuestionBody {
    question: JsonThemeQuestion
}

export interface JsonUpdateThemeQuestionResponse {
    success: boolean
    theme: JsonTheme
}
// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"
import { ThemeQuestion } from "../data/ThemeQuestion"

import { JsonTheme, FromTheme, ToTheme } from "./JsonTheme"
import { JsonThemeQuestion, FromThemeQuestion } from "./JsonThemeQuestion"

// //////////////////////////////////////////////////
// update theme

export async function UpdateTheme( theme: Theme ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme/${theme.id}`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonUpdateThemeBody = {
        theme: FromTheme( theme ),
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while updating theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonUpdateThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to update theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonUpdateThemeBody {
    theme: JsonTheme
}

export interface JsonUpdateThemeResponse {
    success: boolean
    theme: JsonTheme
}
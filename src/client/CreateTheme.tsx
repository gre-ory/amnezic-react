// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// create theme

export async function CreateTheme( title: string, imgUrl?: string ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme/new`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonCreateThemeBody = {
        theme: {
            title: title,
            imgUrl: imgUrl,
        }
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while creating theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonCreateThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to create theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonCreateThemeBody {
    theme: JsonCreateTheme
}

export interface JsonCreateTheme {
    title: string
    imgUrl?: string
}

export interface JsonCreateThemeResponse {
    success: boolean
    theme: JsonTheme
}
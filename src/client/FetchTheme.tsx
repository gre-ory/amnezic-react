// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// fetch theme

export async function FetchTheme( themeId: number ): Promise<Theme> {

    let requestURL = `${process.env.REACT_APP_API_ROOT_URI}/theme/${themeId}`
    console.log(`[api] requestURL = ${requestURL}`)

    const response = await fetch(requestURL, {method: 'GET'})
    if (!response.ok) {
        const message = `An error has occured while fetching theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonGetThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonGetThemeResponse {
    success: boolean
    theme: JsonTheme
}
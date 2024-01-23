// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Theme } from "../data/Theme"

import { DefaultHeaders } from "./Headers"
import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// fetch theme

export async function FetchTheme( themeId: number ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme/${themeId}`
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',    
        headers: DefaultHeaders(),
    })
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
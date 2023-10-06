// //////////////////////////////////////////////////
// import

import { ThemeInfo } from "../data/ThemeInfo"

import { JsonThemeInfo, ToThemeInfo } from "./JsonThemeInfo"

// //////////////////////////////////////////////////
// themes

export async function FetchThemes(): Promise<ThemeInfo[]> {

    let requestURL = `${process.env.REACT_APP_API_ROOT_URI}/theme`
    console.log(`[api] requestURL = ${requestURL}`)

    const response = await fetch(requestURL, {method: 'GET'})
    if (!response.ok) {
        const message = `An error has occured while fetching themes: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonThemesResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch themes: ${response.status} ${response.body}`;
        throw new Error(message);
    }
    return jsonResponse.themes.map( jsonThemeInfo => ToThemeInfo( jsonThemeInfo ) );
}

// //////////////////////////////////////////////////
// json

export interface JsonThemesResponse {
    success: boolean
    themes: JsonThemeInfo[]
}
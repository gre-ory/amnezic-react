// //////////////////////////////////////////////////
// import

import { ThemeInfo } from "../data/ThemeInfo"

import { DefaultHeaders } from "./Headers"
import { JsonThemeInfo, ToThemeInfo } from "./JsonThemeInfo"

import { config } from '../config'

// //////////////////////////////////////////////////
// themes

export async function FetchThemes(): Promise<ThemeInfo[]> {

    const url = config.apiUrl(`/theme`);
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: DefaultHeaders(),
    })
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
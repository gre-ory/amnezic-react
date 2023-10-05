// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// remove music from theme

export async function RemoveMusicFromTheme( themeId: number, musicId: number ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme-question/${themeId}/${musicId}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
    })
    if (!response.ok) {
        const message = `An error has occured while removing music from theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonRemoveMusicFromThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to remove music from theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonRemoveMusicFromThemeResponse {
    success: boolean
    theme: JsonTheme
}
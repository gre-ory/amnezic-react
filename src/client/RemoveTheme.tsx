// //////////////////////////////////////////////////
// import

import { Theme } from "../data/Theme"

import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// remove theme

export async function RemoveTheme( themeId: number ): Promise<boolean> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme/${themeId}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
    })
    if (!response.ok) {
        const message = `An error has occured while deleting theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonRemoveThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to delete theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.success
}

export interface JsonRemoveThemeResponse {
    success: boolean
}
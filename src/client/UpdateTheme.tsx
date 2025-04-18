// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Theme } from "../data/Theme"

import { SessionHeaders } from "./Headers"
import { JsonTheme, FromTheme, ToTheme } from "./JsonTheme"

import { config } from '../config'

// //////////////////////////////////////////////////
// update theme

export async function UpdateTheme( session: UserSession, theme: Theme ): Promise<Theme> {

    const url = config.apiUrl(`/theme/${theme.id}`);
    console.log(`[client] requestURL = ${url}`)

    let body: JsonUpdateThemeBody = {
        theme: FromTheme( theme ),
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: SessionHeaders(session),
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
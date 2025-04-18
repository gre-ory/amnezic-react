// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Theme } from "../data/Theme"

import { SessionHeaders } from "./Headers"
import { JsonTheme, ToTheme } from "./JsonTheme"

import { config } from '../config'

// //////////////////////////////////////////////////
// create theme

export async function CreateTheme( session: UserSession, title: string ): Promise<Theme> {

    const url = config.apiUrl(`/theme/new`);
    console.log(`[client] requestURL = ${url}`)

    let body: JsonCreateThemeBody = {
        theme: {
            title: title,
        }
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: SessionHeaders(session),
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
}

export interface JsonCreateThemeResponse {
    success: boolean
    theme: JsonTheme
}
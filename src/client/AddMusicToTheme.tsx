// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Theme } from "../data/Theme"

import { SessionHeaders } from "./Headers"
import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// add music to them

export async function AddMusicToTheme( session: UserSession, themeId: number, deezerId: number ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme-question/${themeId}/new?deezer_id=${deezerId}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'PUT',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while adding music to theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonAddMusicToThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to add music to theme: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonAddMusicToThemeResponse {
    success: boolean
    theme: JsonTheme
}
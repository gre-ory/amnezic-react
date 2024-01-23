// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Theme } from "../data/Theme"

import { SessionHeaders } from "./Headers"
import { JsonTheme, ToTheme } from "./JsonTheme"

// //////////////////////////////////////////////////
// remove theme question

export async function RemoveThemeQuestion( session: UserSession, themeId: number, questionId: number ): Promise<Theme> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/theme-question/${themeId}/${questionId}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while removing theme question: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonRemoveThemeQuestionResponse;
    if (!jsonResponse.success) {
        const message = `Unable to remove theme question: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToTheme( jsonResponse.theme )
}

export interface JsonRemoveThemeQuestionResponse {
    success: boolean
    theme: JsonTheme
}
// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"

import { SessionHeaders } from "./Headers"
import { JsonUserSession, ToUserSession } from "./JsonUserSession"

import { config } from '../config'

// //////////////////////////////////////////////////
// themes

export async function FetchSessions( session: UserSession ): Promise<UserSession[]> {

    const url = config.apiUrl(`/session`);
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while fetching sessions: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonFetchSessionsResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch sessions: ${response.status} ${response.body}`;
        throw new Error(message);
    }
    return jsonResponse.sessions.map( jsonUserSession => ToUserSession( jsonUserSession ) );
}

// //////////////////////////////////////////////////
// json

export interface JsonFetchSessionsResponse {
    success: boolean
    sessions: JsonUserSession[]
}
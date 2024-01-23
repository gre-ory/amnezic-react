// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"

import { SessionHeaders } from "./Headers"

// //////////////////////////////////////////////////
// flush user sessions

export async function FlushUserSessions( session: UserSession ): Promise<boolean> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/session`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while flushing user sessions: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonFlushUserSessionsResponse;
    if (!jsonResponse.success) {
        const message = `Unable to flush user sessions: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.success
}

export interface JsonFlushUserSessionsResponse {
    success: boolean
}
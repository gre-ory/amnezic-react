// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"

import { SessionHeaders } from "./Headers"

import { config } from '../config'

// //////////////////////////////////////////////////
// remove user

export async function RemoveUser( session: UserSession, userId: number ): Promise<boolean> {

    const url = config.apiUrl(`/user/${userId}`)
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while deleting user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonRemoveUserResponse;
    if (!jsonResponse.success) {
        const message = `Unable to delete user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.success
}

export interface JsonRemoveUserResponse {
    success: boolean
}
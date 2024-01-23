// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"

import { SessionHeaders } from "./Headers"

// //////////////////////////////////////////////////
// logout

export async function Logout( session: UserSession ): Promise<boolean> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/logout`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while logout: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonLogoutResponse;
    if (!jsonResponse.success) {
        const message = `Unable to logout: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.success
}

export interface JsonLogoutResponse {
    success: boolean
}
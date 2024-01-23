// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"

import { SessionHeaders } from "./Headers"
import { JsonUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// fetch user

export async function FetchUser( session: UserSession, userId: number ): Promise<User> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user/${userId}`
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',    
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while fetching user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonGetUserResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUser( jsonResponse.user )
}

export interface JsonGetUserResponse {
    success: boolean
    user: JsonUser
}
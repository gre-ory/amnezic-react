// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"

import { SessionHeaders } from "./Headers"
import { JsonUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// users

export async function FetchUsers( session: UserSession ): Promise<User[]> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user`
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while fetching users: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonFetchUsersResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch sessions: ${response.status} ${response.body}`;
        throw new Error(message);
    }
    return jsonResponse.users.map( jsonUser => ToUser( jsonUser ) );
}

// //////////////////////////////////////////////////
// json

export interface JsonFetchUsersResponse {
    success: boolean
    users: JsonUser[]
}
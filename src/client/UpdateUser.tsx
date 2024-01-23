// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"

import { SessionHeaders } from "./Headers"
import { JsonUser, FromUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// update user

export async function UpdateUser( session: UserSession, user: User ): Promise<User> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user/${user.id}`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonUpdateUserBody = {
        user: FromUser( user ),
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: SessionHeaders(session),
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while updating user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonUpdateUserResponse;
    if (!jsonResponse.success) {
        const message = `Unable to update user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUser( jsonResponse.user )
}

export interface JsonUpdateUserBody {
    user: JsonUser
}

export interface JsonUpdateUserResponse {
    success: boolean
    user: JsonUser
}
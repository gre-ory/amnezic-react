// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"

import { SessionHeaders } from "./Headers"
import { JsonUser, FromUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// create user

export async function CreateUser( session: UserSession, user: User ): Promise<User> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user/new`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonCreateUserBody = {
        user: FromUser(user),
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: SessionHeaders(session),
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while creating user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonCreateUserResponse;
    if (!jsonResponse.success) {
        const message = `Unable to create user: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUser( jsonResponse.user )
}

export interface JsonCreateUserBody {
    user: JsonUser
}

export interface JsonCreateUserResponse {
    success: boolean
    user: JsonUser
}
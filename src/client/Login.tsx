// //////////////////////////////////////////////////
// import

import { LoginRequest } from "../data/LoginRequest"
import { UserSession } from "../data/UserSession"

import { DefaultHeaders } from "./Headers"
import { JsonLoginRequest, FromLoginRequest } from "./JsonLoginRequest"
import { JsonUserSession, ToUserSession } from "./JsonUserSession"

// //////////////////////////////////////////////////
// login

export async function Login( request: LoginRequest ): Promise<UserSession> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/login`
    console.log(`[client] requestURL = ${url}`)

    let body: JsonLoginBody = {
        login: FromLoginRequest( request ),
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: DefaultHeaders(),
        body: JSON.stringify(body),
    })
    if (!response.ok) {
        const message = `An error has occured while login: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonLoginResponse;
    if (!jsonResponse.success) {
        const message = `Unable to login: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUserSession( jsonResponse.session )
}

export interface JsonLoginBody {
    login: JsonLoginRequest
}

export interface JsonLoginResponse {
    success: boolean
    session: JsonUserSession
}
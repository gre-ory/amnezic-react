// //////////////////////////////////////////////////
// import

import { User } from "../data/User"
import { UserSession } from "../data/UserSession"

import { JsonUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// adapter

export function ToUserSession( json: JsonUserSession ): UserSession {
    if ( json.user ) {
        return {
            token: json.token,
            userId: json.user.id,
            user: ToUser(json.user),
            expiration: json.expirationTs,
        }
    }
    return {
        token: json.token,
        userId: json.userId || 0,
        expiration: json.expirationTs,
    }
}

export interface JsonUserSession {
    token: string
    userId?: number
    user?: JsonUser
    expirationTs: number
}

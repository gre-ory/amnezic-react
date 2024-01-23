// //////////////////////////////////////////////////
// import

import { User } from "../data/User"

// //////////////////////////////////////////////////
// adapter

export function ToUser( json: JsonUser ): User {
    return {
        id: json.id,
        name: json.name,
        permissions: json.permissions,
    }
}

export function FromUser( user: User ): JsonUser {
    return {
        id: user.id,
        name: user.name,
        permissions: user.permissions,
    }
}

export interface JsonUser {
    id: number
    name: string
    permissions: string[]
}

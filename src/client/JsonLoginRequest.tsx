// //////////////////////////////////////////////////
// import

import { LoginRequest } from "../data/LoginRequest"

// //////////////////////////////////////////////////
// adapter

export function FromLoginRequest( loginRequest: LoginRequest ): JsonLoginRequest {
    return {
        name: loginRequest.name,
        password: loginRequest.password,
    }
}

export interface JsonLoginRequest {
    name: string
    password: string
}

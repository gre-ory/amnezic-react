// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"

// //////////////////////////////////////////////////
// session headers

export function SessionHeaders( session: UserSession ): HeadersInit {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.token
    }
}

// //////////////////////////////////////////////////
// default headers

export function DefaultHeaders(): HeadersInit {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
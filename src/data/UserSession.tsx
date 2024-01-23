// //////////////////////////////////////////////////
// import

import { User } from './User'

// //////////////////////////////////////////////////
// user session

export interface UserSession {
    userId: number
    user?: User
    token: string
    expiration: number
}
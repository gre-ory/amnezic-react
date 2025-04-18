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

// //////////////////////////////////////////////////
// store

const SESSION = 'session'

export function clearSession() {
  localStorage.removeItem( SESSION )
}

export function storeSession( session: UserSession ): UserSession {
  localStorage.setItem( SESSION, JSON.stringify( session ) )
  return session
}

export function loadSession(): UserSession | undefined {
  const value: string | null = localStorage.getItem( SESSION )
  if ( value === null || value === '' ) {
    return undefined
  }
  const session: UserSession = JSON.parse( value )
  return session
}
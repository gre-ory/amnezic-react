import React from 'react'
import { useNavigate } from 'react-router-dom'

import { UserSession } from '../data/UserSession'
import { UserPermission } from '../data/UserPermission'
import { toHomePage } from '../data/Navigate'

interface Props {
    session?: UserSession
    permission?: UserPermission
    children: any
}

const ProtectedPage = ( props: Props ) => {
    const { session, permission, children } = props

    const navigate = useNavigate()

    // check session 

    if ( session === undefined ) {
        console.log( "[error] missing session!" )
        navigate( toHomePage() )
        return null
    }

    // check user in session

    if ( session.user === undefined ) {
        console.log( "[error] missing user in session!" )
        navigate( toHomePage() )
        return null
    }

    // check permission ( optional )

    if ( permission !== undefined ) {
        if ( !session.user.permissions.find(p => p == permission) ) {
            console.log( `[error] missing user permission "${permission}"!` )
            navigate( toHomePage() )
            return null
        }
    }

    return children
}

export default ProtectedPage
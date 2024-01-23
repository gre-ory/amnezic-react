// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"
import { UserPermission } from "../data/UserPermission"

import { SessionHeaders } from "./Headers"
import { JsonUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// remove user permission

export async function RemoveUserPermission( session: UserSession, userId: number, permission: UserPermission ): Promise<User> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user-permission/${userId}/${permission}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while removing user permission: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonRemoveUserPermissionResponse;
    if (!jsonResponse.success) {
        const message = `Unable to remove user permission: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUser( jsonResponse.user )
}

export interface JsonRemoveUserPermissionResponse {
    success: boolean
    user: JsonUser
}
// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { User } from "../data/User"
import { UserPermission } from "../data/UserPermission"

import { SessionHeaders } from "./Headers"
import { JsonUser, ToUser } from "./JsonUser"

// //////////////////////////////////////////////////
// add user permission

export async function AddUserPermission( session: UserSession, userId: number, permission: UserPermission ): Promise<User> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/user-permission/${userId}/${permission}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'PUT',
        headers: SessionHeaders(session),
    })
    if (!response.ok) {
        const message = `An error has occured while adding user permission: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonAddUserPermissionResponse;
    if (!jsonResponse.success) {
        const message = `Unable to add user permission: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToUser( jsonResponse.user )
}

export interface JsonAddUserPermissionResponse {
    success: boolean
    user: JsonUser
}
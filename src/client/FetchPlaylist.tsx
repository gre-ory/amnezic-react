// //////////////////////////////////////////////////
// import

import { UserSession } from "../data/UserSession"
import { Playlist } from "../data/Playlist"

import { DefaultHeaders } from "./Headers"
import { JsonPlaylist, ToPlaylist } from "./JsonPlaylist"

// //////////////////////////////////////////////////
// fetch theme

export async function FetchPlaylist( playlistId: number ): Promise<Playlist> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/deezer/playlist/${playlistId}`
    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: DefaultHeaders(),
    })
    if (!response.ok) {
        const message = `An error has occured while fetching playlist: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonGetPlaylistResponse;
    if (!jsonResponse.success) {
        const message = `Unable to fetch playlist: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return ToPlaylist( jsonResponse.playlist )
}

export interface JsonGetPlaylistResponse {
    success: boolean
    playlist: JsonPlaylist
}
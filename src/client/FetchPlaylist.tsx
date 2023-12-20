// //////////////////////////////////////////////////
// import

import { Playlist } from "../data/Playlist"

import { JsonPlaylist, ToPlaylist } from "./JsonPlaylist"

// //////////////////////////////////////////////////
// fetch theme

export async function FetchPlaylist( playlistId: number ): Promise<Playlist> {

    let requestURL = `${process.env.REACT_APP_API_ROOT_URI}/deezer/playlist/${playlistId}`
    console.log(`[api] requestURL = ${requestURL}`)

    const response = await fetch(requestURL, {method: 'GET'})
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
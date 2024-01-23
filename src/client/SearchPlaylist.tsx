// //////////////////////////////////////////////////
// import

import { Playlist } from "../data/Playlist"

import { DefaultHeaders } from "./Headers"
import { JsonPlaylist, ToPlaylist } from "./JsonPlaylist"

// //////////////////////////////////////////////////
// search playlist

export async function SearchPlaylist( search: string, limit: number ): Promise<Playlist[]> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/deezer/playlist?search=${search}&limit=${limit}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: DefaultHeaders(),
    })
    if (!response.ok) {
        const message = `An error has occured while searching playlist: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonSearchPlaylistResponse;
    if (!jsonResponse.success) {
        const message = `Unable to search playlist: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.playlists.map( jsonPlaylist => ToPlaylist( jsonPlaylist ) )
}

export interface JsonSearchPlaylistResponse {
    success: boolean
    playlists: JsonPlaylist[]
}
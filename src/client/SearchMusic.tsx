// //////////////////////////////////////////////////
// import

import { Music } from "../data/Music"

import { DefaultHeaders } from "./Headers"
import { JsonMusic, ToMusic } from "./JsonMusic"

import { config } from '../config'

// //////////////////////////////////////////////////
// search music


export async function SearchMusic( search: string, limit: number ): Promise<Music[]> {

    const url = config.apiUrl(`/deezer/music?search=${search}&limit=${limit}`);
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
        headers: DefaultHeaders(),
    })
    if (!response.ok) {
        const message = `An error has occured while searching music: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonSearchMusicResponse;
    if (!jsonResponse.success) {
        const message = `Unable to search music: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.musics.map( jsonMusic => ToMusic( jsonMusic ) )
}

export interface JsonSearchMusicResponse {
    success: boolean
    musics: JsonMusic[]
}
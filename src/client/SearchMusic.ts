// //////////////////////////////////////////////////
// import

import { Music } from "../data/Music"

import { JsonMusic, ToMusic } from "./JsonMusic"

// //////////////////////////////////////////////////
// search music

export async function SearchMusic( search: string, limit: number ): Promise<Music[]> {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/music?search=${search}&limit=${limit}`
    console.log(`[client] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'GET',
    })
    if (!response.ok) {
        const message = `An error has occured while searching music: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonAddMusicToThemeResponse;
    if (!jsonResponse.success) {
        const message = `Unable to search music: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    return jsonResponse.musics.map( jsonMusic => ToMusic( jsonMusic ) )
}

export interface JsonAddMusicToThemeResponse {
    success: boolean
    musics: JsonMusic[]
}
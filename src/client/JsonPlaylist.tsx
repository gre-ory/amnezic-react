// //////////////////////////////////////////////////
// import

import { Playlist } from "../data/Playlist"

import { JsonMusic, ToMusic } from "./JsonMusic"

// //////////////////////////////////////////////////
// adapter

export function ToPlaylist( json: JsonPlaylist ): Playlist {
    return {
        deezerId: json.deezerId,
        name: json.name,
        public: json.public,
        imgUrl: json.imgUrl,
        nbMusics: json.nbMusics,
        user: json.user,
        musics: json.musics ? json.musics.map( jsonMusic => ToMusic( jsonMusic ) ) : undefined,
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonPlaylist {
    deezerId?: number
    name?: string
    public?: boolean
    imgUrl?: string
    nbMusics?: number
    user?: string
    musics?: JsonMusic[]
}

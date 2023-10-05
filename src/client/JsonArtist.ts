// //////////////////////////////////////////////////
// import

import { Artist } from "../data/Artist"

// //////////////////////////////////////////////////
// adapter

export function ToArtist( json: JsonArtist ): Artist {
    return {
        id: json.id,
        deezerId: json.deezerId,
        name: json.name,
        imgUrl: json.imgUrl,
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonArtist {
    id?: number
    deezerId?: number
    name: string
    imgUrl?: string
}
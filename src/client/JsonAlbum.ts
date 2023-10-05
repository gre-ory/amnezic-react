// //////////////////////////////////////////////////
// import

import { Album } from "../data/Album"

// //////////////////////////////////////////////////
// adapter

export function ToAlbum( json: JsonAlbum ): Album {
    return {
        id: json.id,
        deezerId: json.deezerId,
        name: json.name,
        imgUrl: json.imgUrl,
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonAlbum {
    id?: number
    deezerId?: number
    name: string
    imgUrl?: string
}
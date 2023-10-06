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

export function FromAlbum( album: Album ): JsonAlbum {
    return {
        id: album.id,
        deezerId: album.deezerId,
        name: album.name,
        imgUrl: album.imgUrl,
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
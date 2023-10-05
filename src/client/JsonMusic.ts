// //////////////////////////////////////////////////
// import

import { newArtist } from "../data/Artist"
import { newAlbum } from "../data/Album"
import { Music, newMusic } from "../data/Music"

import { JsonArtist, ToArtist } from "./JsonArtist"
import { JsonAlbum, ToAlbum } from "./JsonAlbum"

// //////////////////////////////////////////////////
// adapter

export function ToMusic( json: JsonMusic ): Music {
    const artist = json.artist ? newArtist( json.artist.name, json.artist.imgUrl ) : undefined
    const album = json.album ? newAlbum( json.album.name, json.album.imgUrl ) : undefined
    return {
        id: json.id,
        deezerId: json.deezerId,
        name: json.name,
        mp3Url: json.mp3Url,
        album: json.album ? ToAlbum( json.album ) : undefined,
        artist: json.artist ? ToArtist( json.artist ) : undefined,
    }
}

// //////////////////////////////////////////////////
// json

export interface JsonMusic {
    id?: number
    deezerId?: number
    name: string
    mp3Url: string
    artist?: JsonArtist
    album?: JsonAlbum
}
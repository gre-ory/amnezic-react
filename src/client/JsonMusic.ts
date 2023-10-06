// //////////////////////////////////////////////////
// import

import { newArtist } from "../data/Artist"
import { newAlbum } from "../data/Album"
import { Music, newMusic } from "../data/Music"

import { JsonArtist, ToArtist, FromArtist } from "./JsonArtist"
import { JsonAlbum, ToAlbum, FromAlbum } from "./JsonAlbum"

// //////////////////////////////////////////////////
// adapter

export function ToMusic( json: JsonMusic ): Music {
    return {
        id: json.id,
        deezerId: json.deezerId,
        name: json.name,
        mp3Url: json.mp3Url,
        album: json.album ? ToAlbum( json.album ) : undefined,
        artist: json.artist ? ToArtist( json.artist ) : undefined,
    }
}

export function FromMusic( music: Music ): JsonMusic {
    return {
        id: music.id,
        deezerId: music.deezerId,
        name: music.name,
        mp3Url: music.mp3Url,
        album: music.album ? FromAlbum( music.album ) : undefined,
        artist: music.artist ? FromArtist( music.artist ) : undefined,
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
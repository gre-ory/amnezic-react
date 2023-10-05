import { Album } from './Album'
import { Artist } from './Artist'

import musicBackground from '../static/music-black.png'

// //////////////////////////////////////////////////
// model

export interface Music {
  id?: number
  deezerId?: number
  name: string
  mp3Url: string 
  artist?: Artist
  album?: Album  
}

// //////////////////////////////////////////////////
// create

export function newMusic( name: string, mp3Url: string, artist?: Artist, album?: Album ): Music {
  return {
    name: name,
    mp3Url: mp3Url,
    artist: artist,
    album: album,
  }
}

// //////////////////////////////////////////////////
// helper

export function getImgUrl( music: Music ): string | undefined {
  if ( music && music.album && music.album.imgUrl ) {
    return music.album.imgUrl
  }
  if ( music && music.artist && music.artist.imgUrl ) {
    return music.artist.imgUrl
  }
  return undefined
}

export function getAlbumImgUrl( music: Music ): string | undefined {
  if ( music && music.album && music.album.imgUrl ) {
    return music.album.imgUrl
  }
  return undefined
}

export function getArtistImgUrl( music: Music ): string | undefined {
  if ( music && music.artist && music.artist.imgUrl ) {
    return music.artist.imgUrl
  }
  return undefined
}
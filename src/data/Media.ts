import { Album } from './Album'
import { Artist } from './Artist'

// //////////////////////////////////////////////////
// model

export interface Media {
  title: string
  music: string 
  artist: Artist
  album: Album  
}

// //////////////////////////////////////////////////
// create

export function newMedia( title: string, music: string, artist: Artist, album: Album ): Media {
  return {
    title: title,
    music: music,
    artist: artist,
    album: album,
  }
}
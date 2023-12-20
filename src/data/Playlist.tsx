import { Music } from './Music'

// //////////////////////////////////////////////////
// model

export interface Playlist {
  deezerId?: number
  name?: string
  public?: boolean
  imgUrl?: string 
  nbMusics?: number
  user?: string
  musics?: Music[]
}

// //////////////////////////////////////////////////
// helper

export function getImgUrl( playlist: Playlist ): string | undefined {
  if ( playlist && playlist.imgUrl ) {
    return playlist.imgUrl
  }
  return undefined
}

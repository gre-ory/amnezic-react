
// //////////////////////////////////////////////////
// model

export interface Album {
  id?: number
  deezerId?: number
  name: string
  imgUrl?: string
}

// //////////////////////////////////////////////////
// create

export function newAlbum( name: string, imgUrl?: string ): Album {
  return {
    name: name,
    imgUrl: imgUrl,
  }
}
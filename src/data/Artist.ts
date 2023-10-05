
// //////////////////////////////////////////////////
// model

export interface Artist {
  id?: number
  deezerId?: number
  name: string
  imgUrl?: string
}

// //////////////////////////////////////////////////
// create

export function newArtist( name: string, imgUrl?: string ): Artist {
  return {
    name: name,
    imgUrl: imgUrl,
  }
}
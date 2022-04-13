
// //////////////////////////////////////////////////
// model

export interface Artist {
  name: string
  picture: string
}

// //////////////////////////////////////////////////
// create

export function newArtist( name: string, picture: string = "" ): Artist {
  return {
    name: name,
    picture: picture,
  }
}

// //////////////////////////////////////////////////
// model

export interface Album {
  title: string
  picture: string
}

// //////////////////////////////////////////////////
// create

export function newAlbum( title: string, picture: string = "" ): Album {
  return {
    title: title,
    picture: picture,
  }
}
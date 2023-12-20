// //////////////////////////////////////////////////
// import

import { newAlbum } from "./Album"
import { newArtist } from "./Artist"
import { addQuestion, Game } from "./Game"
import { newMusic } from "./Music"
import { addAnswer, Question } from "./Question"
import { Settings } from "./Settings"
import { pick, pickIndexes, range, shuffle } from "./Util"
import legacyJson from '../static/legacy.json';
import { Shuffle } from "@mui/icons-material"

// //////////////////////////////////////////////////
// dummy game

const fullMusic = newMusic(
    "Harder, Better, Faster, Stronger & Pêcheur", 
    "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3", 
    newArtist( 
        "Daft Punk & Pêcheur", 
        "https://e-cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg"
    ), 
    newAlbum( 
        "Discovery & Pêcheur", 
        "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg"
    )
)

const noAlbumMusic = newMusic(
    "Crescendolls", 
    "https://cdns-preview-0.dzcdn.net/stream/c-02585dc790f2904c4e870cb3bcecfcf3-8.mp3", 
    newArtist( 
        "Daft Punk", 
        "https://e-cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg"
    ), 
    undefined
) 

const noPictureMusic = newMusic(
    "Superheroes", 
    "https://cdns-preview-3.dzcdn.net/stream/c-3d8caae0a1c59f417f31bb747c43818b-7.mp3", 
    newArtist( 
        "Daft Punk", 
        undefined
    ), 
    undefined
)

const shortMusic = newMusic(
    "Short", 
    "http://gregory.valigiani.free.fr/amnezic/Rem2-14-10.mp3", 
    newArtist( 
        "Short", 
        undefined
    ), 
    undefined
) 

const failedMusic = newMusic(
    "Failed",
    "http://gregory.valigiani.free.fr/amnezic/Clash%20-%20Should%20I%20Stay%20Or%20Go.mp3",
    newArtist( 
        "Failed", 
        undefined
    ), 
    undefined
)

const dummyMusics = [ fullMusic, noAlbumMusic, noPictureMusic, shortMusic, failedMusic ]

export function buildDummyQuestions( game: Game ): Game {

    const nbQuestion = game.settings.nbQuestion
    const nbAnswer = game.settings.nbAnswer
    range( nbQuestion ).forEach( i => {
        const music = dummyMusics[ i % dummyMusics.length ]
        const artist = music.artist ? music.artist.name : `artist ${i+1}`
        const question: Question = addQuestion( game, artist, music )

        for ( let j = 0 ; j < nbAnswer ; j++ ) {
        if ( i % nbAnswer == j ) {
            addAnswer( question, artist, music.name, true )
        } else {
            addAnswer( question, `artist ${j+1}`, `hint ${j+1}`, false )
        }
        }
    } )

    return game
}

// //////////////////////////////////////////////////
// test game

export function buildTestQuestions( game: Game ): Game {

    const genre = legacyJson.genres.find( genre => genre.genre === "Bruitages" );
    if ( genre ) {
        const musics = genre.musics || []

        const nbQuestion = game.settings.nbQuestion
        const nbAnswer = game.settings.nbAnswer
        range( nbQuestion ).map( i => i+1 ).forEach( i => {

            const indexes = pickIndexes( nbAnswer, musics.length )
            const correctIndex = pick( indexes )
            const correctMusic = musics[ correctIndex ]
            const artist = newArtist( correctMusic.artist.name )
            const music = newMusic( correctMusic.title, correctMusic.mp3Url, artist, undefined )
            const question: Question = addQuestion( game, genre.genre, music )

            for ( const index of indexes ) {
                const music = musics[ index ]
                addAnswer( question, music.artist.name, music.title, index === correctIndex )
            }
        } )
    }

    return game
}

// //////////////////////////////////////////////////
// legacy game

export function buildLegacyQuestions( game: Game ): Game {
    
    const nbQuestion = game.settings.nbQuestion
    const nbAnswer = game.settings.nbAnswer

    const nbMusic = legacyJson.genres.map( genre => genre.musics.length ).reduce( ( previous, current ) => previous + current, 0 )
    const questionIndexes = pickIndexes( nbQuestion, nbMusic )

    for ( const questionIndex of questionIndexes ) {

        console.log("questionIndex: %d",questionIndex)

        let startIndex = 0
        for ( const genre of legacyJson.genres ) {
            if ( genre.musics.length === 0 ) {
                continue
            }
            const endIndex = startIndex + genre.musics.length - 1
            console.log("   startIndex: %d - length: %d - endIndex: %d",startIndex,genre.musics.length, endIndex)
            if ( endIndex < questionIndex ) {
                startIndex = endIndex + 1
                continue
            }

            const musics = genre.musics || []
            const correctIndex = questionIndex - startIndex
            console.log("   correctIndex: %d - questionIndex: %d - startIndex: %d",correctIndex,questionIndex, startIndex)
            const correctMusic = musics[ correctIndex ]
            console.log(correctMusic.artist)
            const artist = newArtist( correctMusic.artist && correctMusic.artist.name ? correctMusic.artist.name : '???' )
            const musicURL = process.env.REACT_APP_LEGACY_ROOT_URI + correctMusic.mp3Url
            const music = newMusic( correctMusic.title || '???', musicURL, artist, undefined )
            const question: Question = addQuestion( game, genre.genre, music )

            const indexes = pickIndexes( nbAnswer + 1, musics.length ).filter( index => index != correctIndex ).slice( 0, nbAnswer - 1 )
            indexes.push( correctIndex )
            shuffle( indexes )

            for ( const index of indexes ) {
                const music = musics[ index ]
                addAnswer( question, music.artist && music.artist.name ? music.artist.name : '???', music.title || '???', index === correctIndex )
            }

            break
        }
        
    }

    return game
}
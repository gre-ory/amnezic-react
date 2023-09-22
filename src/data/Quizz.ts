// //////////////////////////////////////////////////
// import

import { newAlbum } from "./Album"
import { newArtist } from "./Artist"
import { addQuestion, Game } from "./Game"
import { newMedia } from "./Media"
import { addAnswer, Question } from "./Question"
import { Settings } from "./Settings"
import { pick, pickIndexes, range, shuffle } from "./Util"
import legacyJson from '../static/legacy.json';
import { Shuffle } from "@mui/icons-material"

// //////////////////////////////////////////////////
// dummy game

const fullMusic = newMedia(
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

const noAlbumMusic = newMedia(
    "Crescendolls", 
    "https://cdns-preview-0.dzcdn.net/stream/c-02585dc790f2904c4e870cb3bcecfcf3-8.mp3", 
    newArtist( 
        "Daft Punk", 
        "https://e-cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg"
    ), 
    undefined
) 

const noPictureMusic = newMedia(
    "Superheroes", 
    "https://cdns-preview-3.dzcdn.net/stream/c-3d8caae0a1c59f417f31bb747c43818b-7.mp3", 
    newArtist( 
        "Daft Punk", 
        undefined
    ), 
    undefined
)

const shortMusic = newMedia(
    "Short", 
    "http://gregory.valigiani.free.fr/amnezic/Rem2-14-10.mp3", 
    newArtist( 
        "Short", 
        undefined
    ), 
    undefined
) 

const failedMusic = newMedia(
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
        const media = dummyMusics[ i % dummyMusics.length ]
        const artist = media.artist ? media.artist.name : `artist ${i+1}`
        const question: Question = addQuestion( game, artist, media )

        for ( let j = 0 ; j < nbAnswer ; j++ ) {
        if ( i % nbAnswer == j ) {
            addAnswer( question, artist, media.title, true )
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
        const musics = genre.media || []

        const nbQuestion = game.settings.nbQuestion
        const nbAnswer = game.settings.nbAnswer
        range( nbQuestion ).map( i => i+1 ).forEach( i => {

            const indexes = pickIndexes( nbAnswer, musics.length )
            const correctIndex = pick( indexes )
            const correctMusic = musics[ correctIndex ]
            const artist = newArtist( correctMusic.artist.name )
            const media = newMedia( correctMusic.title, correctMusic.music, artist, undefined )
            const question: Question = addQuestion( game, genre.genre, media )

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

    const nbMusic = legacyJson.genres.map( genre => genre.media.length ).reduce( ( previous, current ) => previous + current, 0 )
    const questionIndexes = pickIndexes( nbQuestion, nbMusic )

    for ( const questionIndex of questionIndexes ) {

        console.log("questionIndex: %d",questionIndex)

        let startIndex = 0
        for ( const genre of legacyJson.genres ) {
            if ( genre.media.length === 0 ) {
                continue
            }
            const endIndex = startIndex + genre.media.length - 1
            console.log("   startIndex: %d - length: %d - endIndex: %d",startIndex,genre.media.length, endIndex)
            if ( endIndex < questionIndex ) {
                startIndex = endIndex + 1
                continue
            }

            const musics = genre.media || []
            const correctIndex = questionIndex - startIndex
            console.log("   correctIndex: %d - questionIndex: %d - startIndex: %d",correctIndex,questionIndex, startIndex)
            const correctMusic = musics[ correctIndex ]
            console.log(correctMusic.artist)
            const artist = newArtist( correctMusic.artist && correctMusic.artist.name ? correctMusic.artist.name : '???' )
            const musicURL = process.env.REACT_APP_LEGACY_ROOT_URI + correctMusic.music
            const media = newMedia( correctMusic.title || '???', musicURL, artist, undefined )
            const question: Question = addQuestion( game, genre.genre, media )

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

// //////////////////////////////////////////////////
// api game

export async function buildQuestionsFromApi( game: Game ) {

    let requestURL = `${process.env.REACT_APP_API_ROOT_URI}/game/new`
    requestURL = `${requestURL}?nb_question=${game.settings.nbQuestion}`
    requestURL = `${requestURL}&nb_answer=${game.settings.nbAnswer}`
    requestURL = `${requestURL}&nb_player=${game.settings.nbPlayer}`
    console.log(`[api] requestURL = ${requestURL}`)

    const response = await fetch(requestURL, {method: 'PUT'})
    if (!response.ok) {
        const message = `An error has occured while fetching new game: ${response.status} ${response.body}`;
        throw new Error(message);
    }

    const jsonResponse = await response.json() as JsonResponse;
    const jsonGame = jsonResponse.game;
    
    for ( const jsonQuestion of jsonGame.questions ) {
        if ( !jsonQuestion ) {
            continue
        }
        const jsonMusic = jsonQuestion.music
        const jsonTheme = jsonQuestion.theme

        const artist = jsonMusic.artist ? newArtist( jsonMusic.artist.name, jsonMusic.artist.imgUrl ) : undefined
        const album = jsonMusic.album ? newAlbum( jsonMusic.album.name, jsonMusic.album.imgUrl ) : undefined
        const media = newMedia( jsonMusic.name, jsonMusic.mp3Url, artist, album )
        const question: Question = addQuestion( game, jsonTheme.title, media )

        for ( const jsonAnswer of jsonQuestion.answers ) {
            addAnswer( question, jsonAnswer.text, jsonAnswer.hint, jsonAnswer.correct )
        }
    }
}

export interface JsonResponse {
    success: boolean
    game: JsonGame
}

export interface JsonGame {
    id: number
    players: JsonPlayer[]
    questions: JsonQuestion[]
}

export interface JsonPlayer {
    id: number
    name: string
    active: boolean
}

export interface JsonQuestion {
    id: number
    theme: JsonTheme
    music: JsonMusic
    answers: JsonAnswer[]
}

export interface JsonTheme {
    title: string
}

export interface JsonMusic {
    id: number
    name: string
    mp3Url: string
    artist?: JsonArtist
    album?: JsonAlbum
}

export interface JsonArtist {
    id: number
    name: string
    imgUrl: string
}

export interface JsonAlbum {
    id: number
    name: string
    imgUrl: string
}

export interface JsonAnswer {
    id: number
    text: string
    hint: string
    correct: boolean
}
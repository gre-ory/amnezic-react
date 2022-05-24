// //////////////////////////////////////////////////
// import

import { newAlbum } from "./Album"
import { newArtist } from "./Artist"
import { addQuestion, Game } from "./Game"
import { newMedia } from "./Media"
import { addAnswer, Question } from "./Question"
import { Settings } from "./Settings"
import { pick, pickIndexes, range, selectNbOver, shuffle } from "./Util"
import legacyJson from '../static/legacy.json';
import { Shuffle } from "@mui/icons-material"

// //////////////////////////////////////////////////
// dummy game

export function buildDummyQuestions( game: Game ): Game {

    const nbQuestion = game.settings.nbQuestion
    const nbAnswer = game.settings.nbAnswer
    range( nbQuestion ).map( i => i+1 ).forEach( i => {
        // "https://api.deezer.com/artist/27/image"
        const artist = newArtist( "Daft Punk", "https://e-cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg" )
        // "https://api.deezer.com/album/302127/image"
        const album = newAlbum( "Discovery", "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg" )
        const media = newMedia( "Harder, Better, Faster, Stronger", "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3", artist, album )
        const question: Question = addQuestion( game, "Genre", media )

        for ( let j = 0 ; j < nbAnswer ; j++ ) {
        if ( i % nbAnswer == j ) {
            addAnswer( question, media.title, artist.name, true )
        } else {
            addAnswer( question, `title ${j+1}`, `artist ${j+1}`, false )
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

        let startIndex = 0
        for ( const genre of legacyJson.genres ) {
            const endIndex = startIndex + genre.media.length
            if ( endIndex < questionIndex ) {
                startIndex = endIndex + 1
                continue
            }

            const musics = genre.media || []        
            const correctIndex = questionIndex - startIndex
            const correctMusic = musics[ correctIndex ]
            const artist = newArtist( correctMusic.artist.name )
            const media = newMedia( correctMusic.title, correctMusic.music, artist, undefined )
            const question: Question = addQuestion( game, genre.genre, media )

            const indexes = pickIndexes( nbAnswer, musics.length ).filter( index => index != correctIndex ).slice( 0, nbAnswer - 1 )
            indexes.push( correctIndex )
            shuffle( indexes )

            for ( const index of indexes ) {
                const music = musics[ index ]
                addAnswer( question, music.artist.name, music.title, index === correctIndex )
            }

            break
        }
        
    }

    return game
}
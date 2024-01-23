// //////////////////////////////////////////////////
// import

import { addQuestion, Game } from "../data/Game"
import { Music } from "../data/Music"
import { Source } from "../data/Source"
import { addAnswer, Question } from "../data/Question"

import { DefaultHeaders } from "./Headers"
import { JsonMusic, ToMusic } from "./JsonMusic"

// //////////////////////////////////////////////////
// fetch game

export async function FetchGame( game: Game ) {

    let url = `${process.env.REACT_APP_API_ROOT_URI}/game/new`
    url = `${url}?nb_question=${game.settings.nbQuestion}`
    url = `${url}&nb_answer=${game.settings.nbAnswer}`
    url = `${url}&nb_player=${game.settings.nbPlayer}`

    if ( game.settings.source == Source.Legacy ) {
        url = `${url}&sources=${Source.Legacy}`
    } else if ( game.settings.source == Source.Deezer && game.settings.playlist ) {
        url = `${url}&sources=${Source.Deezer}`
        url = `${url}&deezer_playlist_id=${game.settings.playlist.deezerId}`
    } else {
        url = `${url}&sources=${Source.Store}`
        if ( game.settings.themeIds && game.settings.themeIds.length > 0 ) {
            url = `${url}&theme_ids=${game.settings.themeIds.join(",")}`
        }
    }

    console.log(`[api] requestURL = ${url}`)

    const response = await fetch(url, {
        method: 'PUT',
        headers: DefaultHeaders(),
    })
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

        const music: Music = ToMusic( jsonMusic )
        const question: Question = addQuestion( game, jsonTheme.title, music )

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
    players: JsonGamePlayer[]
    questions: JsonGameQuestion[]
}

export interface JsonGamePlayer {
    id: number
    name: string
    active: boolean
}

export interface JsonGameQuestion {
    id: number
    theme: JsonGameTheme
    music: JsonMusic
    answers: JsonGameAnswer[]
}

export interface JsonGameTheme {
    title: string
}

export interface JsonGameAnswer {
    id: number
    text: string
    hint: string
    correct: boolean
}
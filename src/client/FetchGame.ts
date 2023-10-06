// //////////////////////////////////////////////////
// import

import { addQuestion, Game } from "../data/Game"
import { Music } from "../data/Music"
import { addAnswer, Question } from "../data/Question"

import { JsonMusic, ToMusic } from "./JsonMusic"

// //////////////////////////////////////////////////
// fetch game

export async function FetchGame( game: Game ) {

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
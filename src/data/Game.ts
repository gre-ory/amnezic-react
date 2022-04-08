import { customAlphabet } from 'nanoid'

import { newSettings, Settings, updateNbQuestion } from './Settings'
import { newPlayers, Player } from './Player'
import { newQuestion, Question } from './Question'
import { newAnswer } from './Answer'
import { range } from './Util'
import { PageLabel } from './PageLabel'

// //////////////////////////////////////////////////
// model

export const newGameId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 6 )
export const newGameCode = customAlphabet( '0123456789', 6 )

export interface Game {
  readonly id: string
  readonly code: string
  readonly date: number
  page: PageLabel
  setUp: boolean
  started: boolean
  questionId: number
  ended: boolean
  settings: Settings
  players: Player[]
  questions: Question[]
}

// //////////////////////////////////////////////////
// create

export function newGame( id: string = newGameId(), nbQuestion: number = 10, nbPlayer: number = 5 ): Game {
  return {
    id: id,  
    code: newGameCode(),  
    date: Date.now(),
    page: 'settings',
    setUp: false,
    started: false,
    questionId: 0,
    ended: false,
    settings: newSettings( nbQuestion ),
    players: newPlayers( nbPlayer ),
    questions: [],
  }
}

// //////////////////////////////////////////////////
// update

export function updatePage( game: Game, page: PageLabel ): Game {
  return {
    ...game,
    page: page,
  }
}

export function updateSetUp( game: Game, setUp: boolean ): Game {
  return {
    ...game,
    setUp: setUp,
  }
}

export function updateStarted( game: Game, started: boolean ): Game {
  return {
    ...game,
    started: started,
  }
}

export function updateQuestionId( game: Game, questionId: number ): Game {
  return {
    ...game,
    questionId: questionId,
  }
}

export function updateEnded( game: Game, ended: boolean ): Game {
  return {
    ...game,
    ended: ended,
  }
}

export function updateSettings( game: Game, settings: Settings ): Game {
  return {
    ...game,
    settings: settings,
  }
}

export function updateSettingsNbQuestion( game: Game, nbQuestion: number ): Game {
  console.log( `[updateSettingsNbQuestion] nbQuestion = ${nbQuestion}` )
  return {
    ...game,
    settings: updateNbQuestion( game.settings, nbQuestion ),
  }
}

export function updatePlayers( game: Game, players: Player[] ): Game {
  return {
    ...game,
    players: players,
  }
}

export function updatePlayer( game: Game, player: Player ): Game {
  return updatePlayers( game, game.players.map( other => other.id == player.id ? player : other ) )
}

export function updatePlayername( game: Game, player: Player ): Game {
  return updatePlayers( game, game.players.map( other => other.id == player.id ? player : other ) )
}

export function updateQuestions( game: Game, questions: Question[] ): Game {
  return {
    ...game,
    questions: questions,
  }
}

export function updateQuestion( game: Game, question: Question ): Game {
  return updateQuestions( game, game.questions.map( other => other.id == question.id ? question : other ) )
}

// //////////////////////////////////////////////////
// store

export function storeGames( games: Game[] ) {
  console.log(`[store] ${games.length} game(s)`)
  games.forEach( g => console.log( `[store] game ${g.id} - nbQuestion ${g.settings.nbQuestion}` ) )
  localStorage.setItem( 'games', JSON.stringify( games ) )
}

export function loadGames(): Game[] {
  const games: Game[] = JSON.parse( localStorage.getItem( 'games' ) || '' ) || []
  console.log(`[load] ${games.length} game(s)`)
  games.forEach( g => console.log( `[load] game ${g.id} - nbQuestion ${g.settings.nbQuestion}` ) )
  return games
}

export function selectGame( games: Game[], gameId: string | undefined ): Game | undefined {
  const game = loadGames().find( g => g.id == gameId )
  console.log(`[select] game #${gameId}`)
  return game || newGame( gameId )
}

// //////////////////////////////////////////////////
// status

export function onSetUp( game: Game ): Game {
  const nbQuestion = game.settings.nbQuestion
  const questions = range( nbQuestion ).map( i => i+1 ).map( i => newQuestion( i, `Question ${i}`, 'media-url', [
    newAnswer(1,`Answer ${i}-1`,`Hint ${i}-1`,i % 2 == 0),
    newAnswer(2,`Answer ${i}-2`,`Hint ${i}-2`,i % 2 == 1),
  ] ) )
  return updateSetUp( updateQuestions( game, questions ), true )
}

export function onStart( game: Game ): Game {
  return updateStarted( updateQuestionId( game, 1 ), true )
}

export function onNextQuestion( game: Game ): Game {
  return updateQuestionId( game, game.questionId + 1 )
}

export function onEnd( game: Game ): Game {
  return updateEnded( game, true )
}


import { customAlphabet } from 'nanoid'

import { newSettings, Settings, SettingsUpdater } from './Settings'
import { Player, PlayerId, PlayerUpdater } from './Player'
import { addAnswer, isCorrect, Question, QuestionId, QuestionUpdater } from './Question'
import { newArtist } from './Artist'
import { newAlbum } from './Album'
import { range, toTimeString, toZeroPadString } from './Util'
import { Media, newMedia } from './Media'
import { GameStats, newGameStats } from './GameStats'
import { Card, DefaultCards } from './Card'
import { flagAnswerAsCorrect, flagAnswerAsIncorrect, flagQuestionAsMiss, newPlayerStats } from './PlayerStats'
import { ANSWER_ID_SUFFIX, DEFAULT_NB_ANSWER_PER_QUESTION, DEFAULT_NB_PLAYER, DEFAULT_NB_QUESTION, MAX_NB_GAME, PLAYER_ID_SUFFIX, QUESTION_ID_SUFFIX } from './Constants'
import { buildDummyQuestions, buildLegacyQuestions, buildTestQuestions } from './Quizz'

// //////////////////////////////////////////////////
// model

export const newGameId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 4 )
export const newGameCode = customAlphabet( '0123456789', 4 )

export enum GameStep {
  SETTINGS = 'SETTINGS',
  PLAYERS = 'PLAYERS',
  QUIZZ = 'QUIZZ',
  SCORES = 'SCORES',
}

export type GameId = string

export interface Game {
  readonly id: string
  readonly code: string
  readonly created: number
  updated: number
  step: GameStep
  settings: Settings
  players: Player[]
  questions: Question[]
  started: boolean
  questionNumber?: number
  ended: boolean
  stats?: GameStats
}

export type GameUpdater = ( game: Game ) => Game
export type OnGameUpdate = ( gameId: GameId, gameUpdater: GameUpdater ) => void
export type OnPlayerUpdate = ( gameId: GameId, playerId: PlayerId, gameUpdater: GameUpdater ) => void
// export type OnQuestionUpdate = ( gameId: GameId, playerId: PlayerId, gameUpdater: GameUpdater ) => void

// //////////////////////////////////////////////////
// create

export function newGame( nbPlayer: number = DEFAULT_NB_PLAYER, nbQuestion: number = DEFAULT_NB_QUESTION, nbAnswer: number = DEFAULT_NB_ANSWER_PER_QUESTION ): Game {
  return {
    id: newGameId(),  
    code: newGameCode(),  
    created: Date.now(),  
    updated: Date.now(),
    step: GameStep.SETTINGS,
    settings: newSettings( nbPlayer, nbQuestion, nbAnswer ),
    players: [],
    questions: [],
    started: false,
    ended: false,
  }
}

// //////////////////////////////////////////////////
// add

export function addPlayer( game: Game, card: Card ): Player {
  const number = game.players.length + 1
  const current: Player = {
    id: PLAYER_ID_SUFFIX + number, 
    number: number,
    name: `Player ${toZeroPadString( number, 2 )}`,
    status: 'active',
    card: card,
    stats: newPlayerStats(),
  }
  game.players.push( current )
  console.log( current )
  return current
}

export function addQuestion( game: Game, title: string, media: Media ): Question {
  const number = game.questions.length + 1
  const current: Question = {
    id: ( QUESTION_ID_SUFFIX + number ) * ANSWER_ID_SUFFIX,
    number: number, 
    status: 'not-played',
    title: title,
    media: media,
    answers: [],
    playerAnswers: [],
  }
  if ( game.questions.length > 0 ) {
    const previous: Question = game.questions[ game.questions.length - 1 ]
    previous.nextNumber = current.number
    current.previousNumber = previous.number
  }
  console.log( current )
  game.questions.push( current )
  return current
}

// //////////////////////////////////////////////////
// update

export function updateSettings( update: SettingsUpdater ): GameUpdater {
  return ( game: Game ) => {
    return {
      ...game,
      settings: update( game.settings ),
    }
  }
}

export function updatePlayer( playerId: PlayerId, update: PlayerUpdater ): GameUpdater {
  return ( game: Game ) => {
    if ( !game.players ) {
      return game
    }
    return {
      ...game,
      players: game.players.map( player => player.id == playerId ? update( player ) : player ),
    }
  }
}

export function updateQuestion( questionId: QuestionId, update: QuestionUpdater ): GameUpdater {
  return ( game: Game ) => {
    if ( !game.questions ) {
      return game
    }
    return {
      ...game,
      questions: game.questions.map( question => question.id == questionId ? update( question ) : question ),
    }
  }
}

// //////////////////////////////////////////////////
// store

const GAMES = 'games'

export function clearGames() {
  localStorage.removeItem( GAMES )
}

export function sortGames( games: Game[] ): Game[] {
  const sortedGames = [ ...games ].sort( ( left: Game, right: Game ): number => {
    return right.updated - left.updated
  } )
  return sortedGames
}

export function sliceGames( games: Game[] ): Game[] {
  const slicedGames = games.slice( 0, MAX_NB_GAME )
  return slicedGames
}

export function sanitizeGames( games: Game[] ): Game[] {
  return sliceGames( sortGames( games ) )
}

export function storeGames( games: Game[] ): Game[] {
  const sanitizedGames = games.slice( 0, MAX_NB_GAME )
  localStorage.setItem( GAMES, JSON.stringify( sanitizedGames ) )
  return sanitizedGames
}

export function loadGames(): Game[] {
  const games: Game[] = JSON.parse( localStorage.getItem( GAMES ) || '[]' ) || []  
  return sortGames( games )
}

// //////////////////////////////////////////////////
// select

export function selectGame( games: Game[], gameId: string | undefined ): Game | undefined {
  if ( !gameId ) {
    return undefined
  }
  const game = gameId ? loadGames().find( g => g.id == gameId ) : undefined
  console.log(`[select] game #${gameId} : ${ game !== undefined ? 'OK' : 'KO' }`)
  return game
}

export function selectQuestion( game: Game | undefined, questionParam: string | undefined ): Question | undefined {
  if ( !game || !questionParam ) {
    return undefined
  }
  const questionNumber: number = parseInt( questionParam )
  const question = game.questions && questionNumber ? game.questions.find( question => question.number == questionNumber ) : undefined
  console.log(`[select] question #${questionNumber} : ${ question !== undefined ? 'OK' : 'KO' }`)
  return question
}

// //////////////////////////////////////////////////
// state

export function hasPlayers( game: Game ): boolean {
  return ( game !== undefined && game.players !== undefined && game.players.length > 0 )
}

export function hasQuestions( game: Game ): boolean {
  return ( game !== undefined && game.questions !== undefined && game.questions.length > 0 )
}

export function isSetUp( game: Game ): boolean {
  return hasPlayers( game ) && hasQuestions( game )
}

export function isSettingsPageDisabled( game: Game | undefined ): boolean {
  return ( game === undefined ) || game.ended || isSetUp( game ) 
}

export function isPlayersPageDisabled( game: Game | undefined ): boolean {
  return ( game === undefined ) || game.ended || !isSetUp( game ) 
}

export function isQuizzPageDisabled( game: Game | undefined ): boolean {
  return ( game === undefined ) || game.ended || !isSetUp( game ) 
}

export function isScoresPageDisabled( game: Game | undefined ): boolean {
  return ( game === undefined ) || !game.started || !isSetUp( game )
}

export function OnStep( gameStep: GameStep ): GameUpdater {
  return ( game: Game ): Game => {
      console.log( `[on-step] ${game.id} - ${gameStep}` )
      
      //
      // move to new step
      //
    
      game.step = gameStep
    
      return game
  }
}

export function onSetUp( game: Game ): Game {
  console.log( `[on-set-up] ${game.id}` )

  //
  // build questions
  //

  // game = buildDummyQuestions( game )
  // game = buildTestQuestions( game )
  game = buildLegacyQuestions( game )

  //
  // create default players
  //

  const nbPlayer = game.settings.nbPlayer
  range( nbPlayer ).forEach( index => addPlayer( game, DefaultCards[ index % DefaultCards.length ] ) )  
  
  //
  // finally move to players step
  //

  game.step = GameStep.PLAYERS

  return game
}

export function onStartGame( game: Game ): Game {
  console.log( `[on-start-game] ${game.id}` )

  if ( !game.questions || game.questions.length == 0 ) {
    return game
  }

  //
  // flag game as started
  //

  game.started = true

  //
  // select first question
  //

  game.questionNumber = game.questions[0].number

  //
  // prepare game stats
  //

  game.stats = newGameStats( game.settings.nbQuestion ) 
  
  //
  // finally move to quizz step
  //

  game.step = GameStep.QUIZZ

  return game
}

export function onAnswers( game: Game, question: Question ): GameUpdater {
  return ( game: Game ): Game => {
    console.log( `[on-answers] ${game.id} - ${question.number}` )

    const nbPlayers = game.players.length
    let nbPoint = nbPlayers

    for ( const playerAnswer of question.playerAnswers ) {
      const player = game.players.find( player => player.id === playerAnswer.playerId )
      if ( player ) {
        const correct = isCorrect( question, playerAnswer )
        if ( correct ) {
          flagAnswerAsCorrect( player.stats, question.id, playerAnswer.answerId, nbPoint )
        } else {
          flagAnswerAsIncorrect( player.stats, question.id, playerAnswer.answerId, -nbPoint )
        }
      }
      if ( nbPoint > 1 ) {
        nbPoint--
      }
    }

    for ( let player of game.players ) {
      let miss = true
      for ( const playerAnswer of question.playerAnswers ) {
        if ( player.id === playerAnswer.playerId ) {
          miss = false
          break
        }
      }
      if ( miss ) {
        flagQuestionAsMiss( player.stats, question.id )
      }
    }

    return game
  }
}

export function onQuestionNumber( questionNumber: number ): GameUpdater {
  return ( game: Game ): Game => {
    console.log( `[on-question] ${game.id} - ${questionNumber}` )

    if ( !game.questions ) {
      throw Error( "missing questions!" )
    }
    const question = game.questions.find( question => question.number === questionNumber )
    if ( !question ) {
      throw Error( "unknwon question!" )
    }

    //
    // update stats
    //

    if ( game.stats ) {
      game.stats.nbCompleted++
      game.stats.progress = Math.ceil( game.stats.nbCompleted * 100 / game.stats.nbQuestion )
    }

    //
    // move to next question
    //

    game.questionNumber = question.number

    return game
  }
}

export function onEndGame( game: Game ): Game {
  console.log( `[on-end-game] ${game.id}` )

  //
  // flag game as ended
  //

  game.ended = true
  
  //
  // finally move to scores step
  //

  game.step = GameStep.SCORES

  return game
}


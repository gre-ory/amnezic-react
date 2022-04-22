import { customAlphabet } from 'nanoid'

import { newSettings, Settings, SettingsUpdater } from './Settings'
import { Player, PlayerId, PlayerUpdater } from './Player'
import { addAnswer, Question, QuestionId, QuestionUpdater } from './Question'
import { newArtist } from './Artist'
import { newAlbum } from './Album'
import { range, toZeroPadString } from './Util'
import { Media, newMedia } from './Media'
import { GameStats, newGameStats } from './GameStats'
import { Card, DefaultCards } from './Card'
import { newPlayerStats } from './PlayerStats'

// //////////////////////////////////////////////////
// model

export const newGameId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 4 )
// export const newGameId = customAlphabet( '0123456789', 3 )
export const newGameCode = customAlphabet( '0123456789', 4 )

export enum GameStep {
  SETTINGS = 'SETTINGS',
  PLAYERS = 'PLAYERS',
  QUIZZ = 'QUIZZ',
  SCORES = 'SCORES',
  END = 'END',
}

export type GameId = string

export interface Game {
  readonly id: string
  readonly code: string
  readonly created: number
  readonly updated: number
  step: GameStep
  settings: Settings
  players: Player[]
  questions: Question[]
  started: boolean
  questionId?: QuestionId
  ended: boolean
  stats?: GameStats
}

export type GameUpdater = ( game: Game ) => Game
export type OnGameUpdate = ( gameId: GameId, gameUpdater: GameUpdater ) => void
export type OnPlayerUpdate = ( gameId: GameId, playerId: PlayerId, gameUpdater: GameUpdater ) => void
// export type OnQuestionUpdate = ( gameId: GameId, playerId: PlayerId, gameUpdater: GameUpdater ) => void

// //////////////////////////////////////////////////
// create

export function newGame( nbQuestion: number = 4, nbPlayer: number = 2, nbAnswer: number = 3 ): Game {
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
  const id: string = toZeroPadString( number, 2 ) // max: 10 players,
  const current: Player = {
    id: id, 
    number: number,
    name: `Player ${id}`,
    status: 'active',
    card: card,
    stats: newPlayerStats(),
  }
  game.players.push( current )
  return current
}

export function addQuestion( game: Game, title: string, media: Media ): Question {
  const number = game.questions.length + 1
  const id: string = toZeroPadString( number, 3 ) // max: 100 answers,
  const current: Question = {
    id: id,
    number: number, 
    status: 'start',
    title: title,
    media: media,
    answers: [],
  }
  if ( game.questions.length > 0 ) {
    const previous: Question = game.questions[ game.questions.length - 1 ]
    previous.nextId = current.id
    current.previousId = previous.id
  }
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
  console.log(`[clear]`)
  localStorage.removeItem( GAMES )
}

export function storeGames( games: Game[] ) {
  console.log(`[store] ${games.length} game(s)`)
  games.forEach( g => console.log( `[store] game ${g.id} - nbQuestion ${g.settings.nbQuestion}` ) )
  localStorage.setItem( GAMES, JSON.stringify( games ) )
}

export function loadGames(): Game[] {
  const games: Game[] = JSON.parse( localStorage.getItem( GAMES ) || '[]' ) || []
  // console.log(`[load] ${games.length} game(s)`)
  games.forEach( g => console.log( `[load] game ${g.id} - nbQuestion ${g.settings.nbQuestion}` ) )
  return games
}

// //////////////////////////////////////////////////
// select

export function selectGame( games: Game[], gameId: string | undefined ): Game | undefined {
  const game = gameId ? loadGames().find( g => g.id == gameId ) : undefined
  console.log(`[select] game #${gameId}`)
  return game
}

export function selectQuestion( game: Game, questionId: string | undefined ): Question | undefined {
  const question = game.questions && questionId ? game.questions.find( question => question.id == questionId ) : undefined
  console.log(`[select] question #${questionId}`)
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

export function isSettingsPageDisabled( game: Game ): boolean {
  return ( game === undefined ) || game.ended || isSetUp( game ) 
}

export function isPlayersPageDisabled( game: Game ): boolean {
  return ( game === undefined ) || game.ended || !isSetUp( game ) 
}

export function isQuizzPageDisabled( game: Game ): boolean {
  return ( game === undefined ) || game.ended || !isSetUp( game ) 
}

export function isScoresPageDisabled( game: Game ): boolean {
  return ( game === undefined ) || !game.started || !isSetUp( game )
}

export function isEndPageDisabled( game: Game ): boolean {
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
  // load game
  //

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

  //
  // create default players
  //

  const nbPlayer = game.settings.nbPlayer
  range( nbPlayer ).forEach( index => addPlayer( game, DefaultCards[index] ) )  
  
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

  game.questionId = game.questions[0].id

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

export function onQuestion( questionId: QuestionId ): GameUpdater {
  return ( game: Game ): Game => {
    console.log( `[on-question] ${game.id} - ${questionId}` )

    if ( !game.questions ) {
      throw Error( "missing questions!" )
    }
    const question = game.questions.find( question => question.id === questionId )
    if ( !question ) {
      throw Error( "unknwon question!" )
    }

    //
    // move to next question
    //

    game.questionId = question.id

    return game
  }
}

export function onEndGame( game: Game ): Game {
  console.log( `[on-end-game] ${game.id}` )

  //
  // flag game as ended
  //

  game.ended = true

  return game
}


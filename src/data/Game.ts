import { customAlphabet } from 'nanoid'

import { newSettings, Settings, SettingsUpdater } from './Settings'
import { newPlayer, Player, PlayerId, PlayerUpdater } from './Player'
import { newQuestion, Question, QuestionId, QuestionUpdater } from './Question'
import { newAnswer } from './Answer'
import { newArtist } from './Artist'
import { newAlbum } from './Album'
import { range } from './Util'
import { newMedia } from './Media'
import { GameStats, newGameStats } from './GameStats'
import { DefaultCards } from './Card'

// //////////////////////////////////////////////////
// model

// export const newGameId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 3 )
export const newGameId = customAlphabet( '0123456789', 3 )
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
  players?: Player[]
  questions?: Question[]
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

export function newGame( nbQuestion: number = 10, nbPlayer: number = 2 ): Game {
  return {
    id: `G-${newGameId()}`,  
    code: newGameCode(),  
    created: Date.now(),  
    updated: Date.now(),
    step: GameStep.SETTINGS,
    settings: newSettings( nbQuestion, nbPlayer ),
    started: false,
    ended: false,
  }
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
// sanitize

export function sanitizePlayers( players: Player[] ): Player[] {
  if ( players.length > 0 ) {
    players.forEach( ( player, index ) => {
      player.number = ( index + 1 )
      if ( player.name === undefined ) {
        player.name = `Player ${player.number}`
      }
    } )
  }
  return players
}

export function sanitizeQuestions( questions: Question[] ): Question[] {
  if ( questions.length > 0 ) {
    let previousQuestion: Question
    questions.forEach( ( question, index ) => {
      question.number = ( index + 1 )
      if ( previousQuestion ) {
        previousQuestion.nextId = question.id
        question.previousId = question.id
      }
      previousQuestion = question
    } )
  }
  return questions
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
  console.log(`[load] ${games.length} game(s)`)
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
  // create default players
  //

  const nbPlayer = game.settings.nbPlayer
  const players = range( nbPlayer ).map( index => newPlayer( DefaultCards[index] ) )
  game.players = sanitizePlayers( players )
  
  //
  // finally move to players step
  //

  game.step = GameStep.PLAYERS

  return game
}

export function onStartGame( game: Game ): Game {
  console.log( `[on-start-game] ${game.id}` )

  //
  // create dummy questions
  //

  const nbQuestion = game.settings.nbQuestion
  const questions = range( nbQuestion ).map( i => i+1 ).map( i => {
    // "https://api.deezer.com/artist/27/image"
    const artist = newArtist( "Daft Punk", "https://e-cdns-images.dzcdn.net/images/artist/f2bc007e9133c946ac3c3907ddc5d2ea/56x56-000000-80-0-0.jpg" )
    // "https://api.deezer.com/album/302127/image"
    const album = newAlbum( "Discovery", "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg" )
    const media = newMedia( "Harder, Better, Faster, Stronger", "https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e9e880d2c6207e92260-8.mp3", artist, album )
    const goodAnswer = newAnswer( media.title, artist.name, true )
    const wrongAnswer = newAnswer( "Xxx", "Xxx", false )
    const question = newQuestion( "Style", media, ( i % 2 == 0 ) ? [goodAnswer, wrongAnswer] : [wrongAnswer, goodAnswer] )
    return question
  } )
  game.questions = sanitizeQuestions( questions )

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


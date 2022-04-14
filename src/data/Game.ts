import { customAlphabet } from 'nanoid'

import { newSettings, Settings, updateNbQuestion, updateNbPlayer } from './Settings'
import { newPlayers, Player } from './Player'
import { newQuestion, Question } from './Question'
import { newAnswer } from './Answer'
import { newArtist, Artist } from './Artist'
import { newAlbum, Album } from './Album'
import { range } from './Util'
import { newMedia } from './Media'

// //////////////////////////////////////////////////
// model

export const newGameId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 6 )
export const newGameCode = customAlphabet( '0123456789', 6 )

export enum GameStep {
  SETTINGS = 'SETTINGS',
  PLAYERS = 'PLAYERS',
  QUIZZ = 'QUIZZ',
  SCORES = 'SCORES',
  END = 'END',
}

export interface Game {
  readonly id: string
  readonly code: string
  readonly date: number
  step: GameStep
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

export function newGame(): Game {
  return {
    id: newGameId(),  
    code: newGameCode(),  
    date: Date.now(),
    step: GameStep.SETTINGS,
    setUp: false,
    started: false,
    questionId: 0,
    ended: false,
    settings: newSettings(),
    players: [],
    questions: [],
  }
}

// //////////////////////////////////////////////////
// update

export function updateStep( game: Game, step: GameStep ): Game {
  return {
    ...game,
    step: step,
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

export function updateSettingsNbPlayer( game: Game, nbPlayer: number ): Game {
  console.log( `[updateSettingsNbPlayer] nbPlayer = ${nbPlayer}` )
  return {
    ...game,
    settings: updateNbPlayer( game.settings, nbPlayer ),
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
    questions: questions.map( ( question, index ) => { return { ...question, id: ( index + 1 ) } } ),
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
  return game
}

// //////////////////////////////////////////////////
// status

export function onSetUp( game: Game ): Game {

  //
  // create default players
  //

  const nbPlayer = game.settings.nbPlayer
  game = updatePlayers( game, newPlayers( nbPlayer ) )

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

  game = updateQuestions( game, questions )
  
  game = updateSetUp( game, true )
  game = updateStep( game, GameStep.PLAYERS )

  return game
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


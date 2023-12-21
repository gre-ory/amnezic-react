// //////////////////////////////////////////////////
// import

import { DEFAULT_NB_ANSWER_PER_QUESTION, DEFAULT_NB_PLAYER, DEFAULT_NB_QUESTION } from "./Constants"
import { Source } from "./Source"
import { Playlist } from "./Playlist"

// //////////////////////////////////////////////////
// model



export interface Settings {
  source: Source
  nbPlayer: number
  nbQuestion: number
  nbAnswer: number
  themeIds?: number[]
  playlist?: Playlist
}

export type SettingsUpdater = ( settings: Settings ) => Settings

// //////////////////////////////////////////////////
// create

export function newSettings( source: Source, nbPlayer: number = DEFAULT_NB_PLAYER, nbQuestion: number = DEFAULT_NB_QUESTION, nbAnswer: number = DEFAULT_NB_ANSWER_PER_QUESTION ): Settings {
  return {
    source: source,
    nbPlayer: nbPlayer,
    nbQuestion: nbQuestion,
    nbAnswer: nbAnswer,
  }
}

export function newSettingsFromPrevious( previous: Settings ): Settings {
  return {
    source: previous.source,
    nbPlayer: previous.nbPlayer,
    nbQuestion: previous.nbQuestion,
    nbAnswer: previous.nbAnswer,
  }
}
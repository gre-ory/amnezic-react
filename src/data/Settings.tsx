// //////////////////////////////////////////////////
// model

import { DEFAULT_NB_ANSWER_PER_QUESTION, DEFAULT_NB_PLAYER, DEFAULT_NB_QUESTION } from "./Constants"

export interface Settings {
  nbPlayer: number
  nbQuestion: number
  nbAnswer: number
}

export type SettingsUpdater = ( settings: Settings ) => Settings

// //////////////////////////////////////////////////
// create

export function newSettings( nbPlayer: number = DEFAULT_NB_PLAYER, nbQuestion: number = DEFAULT_NB_QUESTION, nbAnswer: number = DEFAULT_NB_ANSWER_PER_QUESTION ): Settings {
  return {
    nbPlayer: nbPlayer,
    nbQuestion: nbQuestion,
    nbAnswer: nbAnswer,
  }
}
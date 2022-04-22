// //////////////////////////////////////////////////
// model

export interface Settings {
  nbPlayer: number
  nbQuestion: number
  nbAnswer: number
}

export type SettingsUpdater = ( settings: Settings ) => Settings

// //////////////////////////////////////////////////
// create

export function newSettings( nbPlayer: number, nbQuestion: number, nbAnswer: number ): Settings {
  return {
    nbPlayer: nbPlayer,
    nbQuestion: nbQuestion,
    nbAnswer: nbAnswer,
  }
}
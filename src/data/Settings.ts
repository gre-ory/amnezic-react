// //////////////////////////////////////////////////
// model

export interface Settings {
  nbQuestion: number
  nbPlayer: number
}

export type SettingsUpdater = ( settings: Settings ) => Settings

// //////////////////////////////////////////////////
// create

export function newSettings( nbQuestion: number = 10, nbPlayer: number = 2 ): Settings {
  return {
    nbQuestion: nbQuestion,
    nbPlayer: nbPlayer,
  }
}

// //////////////////////////////////////////////////
// update

export function updateNbQuestion( prev: Settings, nbQuestion: number ): Settings {
  return {
    ...prev,
    nbQuestion: nbQuestion,
  }
}

export function updateNbPlayer( prev: Settings, nbPlayer: number ): Settings {
  return {
    ...prev,
    nbPlayer: nbPlayer,
  }
}
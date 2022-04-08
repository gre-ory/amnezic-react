// //////////////////////////////////////////////////
// model

export interface Settings {
  nbQuestion: number
}

// //////////////////////////////////////////////////
// create

export function newSettings( nbQuestion: number ): Settings {
  return {
    nbQuestion: nbQuestion,
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
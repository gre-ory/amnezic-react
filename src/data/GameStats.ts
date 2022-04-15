
// //////////////////////////////////////////////////
// model

export interface GameStats {
  readonly nbQuestion: number
  nbCompleted: number
  progress: number
}

// //////////////////////////////////////////////////
// create

export function newGameStats( nbQuestion: number ): GameStats {
  return {
    nbQuestion: nbQuestion,
    nbCompleted: 0,  
    progress: 0,
  }
}

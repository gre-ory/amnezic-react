import { AnswerStats } from './AnswerStats'

// //////////////////////////////////////////////////
// model

export interface PlayerStats {
  score: number
  nbSuccess: number
  nbMiss: number,
  nbFailure: number
  answers: AnswerStats[]
}

// //////////////////////////////////////////////////
// create

export function newPlayerStats(): PlayerStats {
  return {
    score: 0,
    nbSuccess: 0,
    nbMiss: 0,
    nbFailure: 0,
    answers: [],
  }
}

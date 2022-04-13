
// //////////////////////////////////////////////////
// create

export interface Answer {
  id: number
  answer: string
  hint: string
  correct: boolean
}

// //////////////////////////////////////////////////
// create

export function newAnswer( answer: string, hint: string = "", correct: boolean = false ): Answer {
  return {
    id: 0,
    answer: answer,
    hint: hint,
    correct: correct,
  }
}
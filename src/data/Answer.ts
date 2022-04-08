
// //////////////////////////////////////////////////
// create

export interface Answer {
  id: number
  answer: string
  hint?: string
  correct?: boolean
}

// //////////////////////////////////////////////////
// create

export function newAnswer( id: number, answer: string, hint?: string, correct?: boolean ): Answer {
  return {
    id: id,
    answer: answer,
    hint: hint,
    correct: correct,
  }
}
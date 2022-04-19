
// //////////////////////////////////////////////////
// create

export type AnswerId = string

export interface Answer {
  id: AnswerId
  number: number
  answer: string
  hint: string
  correct: boolean
}

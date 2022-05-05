
// //////////////////////////////////////////////////
// create

export type AnswerId = number

export interface Answer {
  id: AnswerId
  number: number
  answer: string
  hint: string
  correct: boolean
}

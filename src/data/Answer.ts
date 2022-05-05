
// //////////////////////////////////////////////////
// create

export type AnswerId = number

export interface Answer {
  id: AnswerId
  cardNumber: number
  answer: string
  hint: string
  correct: boolean
}

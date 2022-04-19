import { Answer } from './Answer'
import { Media } from './Media'
import { toZeroPadString } from './Util'

// //////////////////////////////////////////////////
// status

export type QuestionStatus = 
  | 'start'
  | 'playing'
  | 'paused'
  | 'played'
  | 'answered'
  | 'end'

// //////////////////////////////////////////////////
// model

export type QuestionId = string

export interface Question {
  id: QuestionId
  number: number
  status: QuestionStatus
  title: string
  media: Media
  answers: Answer[]  
  previousId?: QuestionId
  nextId?: QuestionId
}

export type QuestionUpdater = ( question: Question ) => Question

// //////////////////////////////////////////////////
// add

export function addAnswer( question: Question, answer: string, hint: string = "", correct: boolean = false ): Answer {
  const number = question.answers.length + 1
  const id: string = toZeroPadString( number, 2 ) // max: 6 answers,
  const current: Answer = {
    id: id, 
    number: number,
    answer: answer,
    hint: hint,
    correct: correct,
  }
  question.answers.push( current )
  return current
}
import { Answer } from './Answer'
import { GameId } from './Game'
import { Media } from './Media'
import { toZeroPadString } from './Util'

// //////////////////////////////////////////////////
// status

export type QuestionStatus = 
  | 'not-ready' 
  | 'ready'
  | 'played'
  | 'completed'

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
export type OnQuestionUpdate = ( gameId: GameId, questionId: QuestionId, questionUpdater: QuestionUpdater ) => void

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

// //////////////////////////////////////////////////
// state

export function onQuestionReady( question: Question ): Question {
  console.log( `[on-question-ready] question: ${question.id}` )

  question.status = 'ready'
  
  return question
}

export function onQuestionPlayed( question: Question ): Question {
  console.log( `[on-question-played] question: ${question.id}` )

  question.status = 'played'
  
  return question
}

export function onQuestionCompleted( question: Question ): Question {
  console.log( `[on-question-completed] question: ${question.id}` )

  question.status = 'completed'
  
  return question
}
import { Answer } from './Answer'
import { GameId } from './Game'
import { Media } from './Media'
import { toZeroPadString } from './Util'

// //////////////////////////////////////////////////
// status

export type QuestionStatus = 
  | 'not-ready' 
  | 'ready'
  | 'playing'
  | 'paused'
  | 'played'
  | 'answered'

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

export function onReady( question: Question ): Question {
  console.log( `[on-ready] question: ${question.id}` )

  question.status = 'ready'
  
  return question
}

export function onPlayMusic( question: Question ): Question {
  console.log( `[on-play-music] question: ${question.id}` )

  question.status = 'playing'
  
  return question
}

export function onPauseMusic( question: Question ): Question {
  console.log( `[on-pause-music] question: ${question.id}` )

  question.status = 'paused'
  
  return question
}

export function onEndMusic( question: Question ): Question {
  console.log( `[on-end-music] question: ${question.id}` )

  question.status = 'played'
  
  return question
}

export function onAnswers( question: Question ): Question {
  console.log( `[on-answers] question: ${question.id}` )

  question.status = 'answered'
  
  return question
}
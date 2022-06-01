import { Answer, AnswerId } from './Answer'
import { GameId } from './Game'
import { Media } from './Media'
import { PlayerId } from './Player'
import { PlayerAnswer } from './PlayerAnswer'
import { toZeroPadString } from './Util'

// //////////////////////////////////////////////////
// status

export type QuestionStatus = 
  | 'not-played' 
  | 'played'
  | 'completed'
  | 'failed'

// //////////////////////////////////////////////////
// model

export type QuestionId = number

export interface Question {
  id: QuestionId
  number: number
  status: QuestionStatus
  title: string
  media: Media
  answers: Answer[] 
  playerAnswers: PlayerAnswer[] 
  previousNumber?: number
  nextNumber?: number
}

export type QuestionUpdater = ( question: Question ) => Question
export type OnQuestionUpdate = ( gameId: GameId, questionId: QuestionId, questionUpdater: QuestionUpdater ) => void

// //////////////////////////////////////////////////
// add

export function addAnswer( question: Question, answer: string, hint: string = "", correct: boolean = false ): Answer {
  const number = question.answers.length + 1
  const current: Answer = {
    id: question.id + number, 
    number: number,
    answer: answer,
    hint: hint,
    correct: correct,
  }
  question.answers.push( current )
  return current
}

export function addPlayerAnswer( question: Question, playerId: PlayerId, answerId: AnswerId ): Question {
  if ( !hasPlayerAnswer( question, playerId, answerId ) ) {
    question.playerAnswers.push( {
      playerId: playerId, 
      answerId: answerId,
    } )
  }
  return question
}

export function getPlayerAnswerIndex( question: Question, playerId: PlayerId, answerId: AnswerId ): number {
  return question.playerAnswers.findIndex( playerAnswer => ( playerAnswer.playerId === playerId ) && ( playerAnswer.answerId === answerId ) )
}

export function hasPlayerAnswer( question: Question, playerId: PlayerId, answerId: AnswerId ): boolean {
  return getPlayerAnswerIndex( question, playerId, answerId ) > -1
}

export function removePlayerAnswer( question: Question, playerId: PlayerId, answerId: AnswerId ): Question {
  let index = getPlayerAnswerIndex( question, playerId, answerId )
  while ( index > -1 ) {
    question.playerAnswers.splice( index, 1 )
    index = getPlayerAnswerIndex( question, playerId, answerId )
  }
  return question
}

export function isCorrect( question: Question, playerAnswer: PlayerAnswer ): boolean {
  return question.answers.some( answer => ( answer.id ===  playerAnswer.answerId ) && answer.correct )
}

// //////////////////////////////////////////////////
// state

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

export function onQuestionFailed( question: Question ): Question {
  console.log( `[on-question-failed] question: ${question.id}` )

  question.status = 'failed'
  
  return question
}
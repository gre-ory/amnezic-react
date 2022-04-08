import { QuestionStatus } from './QuestionStatus'
import { Answer } from './Answer'

// //////////////////////////////////////////////////
// model

export interface Question {
  id: number
  status: QuestionStatus
  title: string
  mediaUrl: string
  answers: Answer[]
}

// //////////////////////////////////////////////////
// create

export function newQuestion( id: number, title: string, mediaUrl: string, answers: Answer[] ): Question {
  return {
    id: id,
    status: 'start',
    title: title,
    mediaUrl: mediaUrl,
    answers: answers,
  }
}
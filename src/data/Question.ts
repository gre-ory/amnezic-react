import { Answer } from './Answer'
import { Media } from './Media'

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

export interface Question {
  id: number
  status: QuestionStatus
  title: string
  media: Media
  answers: Answer[]
}

// //////////////////////////////////////////////////
// create

export function newQuestion( title: string, media: Media, answers: Answer[] ): Question {
  return {
    id: 0,
    status: 'start',
    title: title,
    media: media,
    answers: answers.map( ( answer, index ) => { return { ...answer, id: ( index + 1 ) } } ),
  }
}
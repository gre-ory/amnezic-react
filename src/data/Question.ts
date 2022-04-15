import { customAlphabet } from 'nanoid'

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

// export const newQuestionId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 3 )
export const newQuestionId = customAlphabet( '0123456789', 3 )

export type QuestionId = string

export interface Question {
  id: QuestionId
  status: QuestionStatus
  title: string
  media: Media
  answers: Answer[]
  number?: number
  previousId?: QuestionId
  nextId?: QuestionId
}

export type QuestionUpdater = ( question: Question ) => Question

// //////////////////////////////////////////////////
// create

export function newQuestion( title: string, media: Media, answers: Answer[] ): Question {
  return {
    id: `Q-${newQuestionId()}`, 
    status: 'start',
    title: title,
    media: media,
    answers: answers.map( ( answer, index ) => { return { ...answer, id: ( index + 1 ) } } ),
  }
}

// //////////////////////////////////////////////////
// model

import { AnswerId } from "./Answer"
import { AnswerStats } from "./AnswerStats"
import { QuestionId } from "./Question"

export interface QuestionStats {
  id: QuestionId
  score: number
  answers: AnswerStats[]
  error: boolean
}

export function getAnswerStats( stats: QuestionStats, answerId: AnswerId ): AnswerStats | undefined {  
  return stats.answers.find( answer => answer.id === answerId )
}

export function getOrSetAnswerStats( stats: QuestionStats, answerId: AnswerId ): AnswerStats {  
  const current = getAnswerStats( stats, answerId )
  if ( current !== undefined ) {
    return current
  }
  const answerStats: AnswerStats = {
    id: answerId,
    success: false,
    score: 0
  }
  stats.answers.push( answerStats )
  return answerStats
}




// //////////////////////////////////////////////////
// model

export interface AnswerStats {
  readonly questionId: number
  readonly success: boolean
  readonly score: number
}

// //////////////////////////////////////////////////
// create

export function newAnswerStats( questionId: number, success: boolean, score: number ): AnswerStats {
  return {
    questionId: questionId,
    success: success,
    score: score,
  }
}

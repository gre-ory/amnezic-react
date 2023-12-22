import { AnswerId } from './Answer'
import { AnswerStats } from './AnswerStats'
import { QuestionId } from './Question'
import { getAnswerStats, getOrSetAnswerStats, QuestionStats } from './QuestionStats'

// //////////////////////////////////////////////////
// model

export interface PlayerStats {
  score: number
  nbAnswer: number
  nbSuccess: number
  nbFailure: number
  nbMiss: number,
  nbError: number,
  questions: QuestionStats[]
}

export interface PlayerVizualiationScoreData {
  x: string // question number
  y: number // player score
  tooltip: string
}

// //////////////////////////////////////////////////
// create

export function newPlayerStats(): PlayerStats {
  return {
    score: 0,
    nbAnswer: 0,
    nbSuccess: 0,
    nbFailure: 0,
    nbMiss: 0,
    nbError: 0,
    questions: [],
  }
}

export function getQuestionStats( stats: PlayerStats, questionId: QuestionId ): QuestionStats | undefined {  
  return stats.questions.find( question => question.id === questionId )
}

export function getQuestionAnswerStats( stats: PlayerStats, questionId: QuestionId, answerId: AnswerId ): AnswerStats | undefined {  
  const questionStats = getQuestionStats( stats, questionId )
  return questionStats ? getAnswerStats( questionStats, answerId ) : undefined
}

export function getOrSetQuestionStats( stats: PlayerStats, questionId: QuestionId ): QuestionStats {  
  const current = getQuestionStats( stats, questionId )
  if ( current !== undefined ) {
    return current
  }
  const questionStats: QuestionStats = {
    id: questionId,
    score: 0,
    answers: [],
    error: false
  }
  stats.questions.push( questionStats )
  return questionStats
}

export function flagAnswerAsCorrect( stats: PlayerStats, questionId: QuestionId, answerId: AnswerId, nbPoint: number ) {
  
  // global
  stats.nbAnswer += 1
  stats.nbSuccess++
  stats.score += nbPoint
  
  // per question
  const questionStats = getOrSetQuestionStats( stats, questionId )
  questionStats.score += nbPoint

  // per asnwer
  const answerStats = getOrSetAnswerStats( questionStats, answerId )
  answerStats.success = true
  answerStats.score = nbPoint
}

export function flagAnswerAsIncorrect( stats: PlayerStats, questionId: QuestionId, answerId: AnswerId, nbPoint: number ) {
  
  // global
  stats.nbAnswer += 1
  stats.nbFailure++
  stats.score += nbPoint // should be negative
  
  // per question
  const questionStats = getOrSetQuestionStats( stats, questionId )
  questionStats.score += nbPoint // should be negative

  // per asnwer
  const answerStats = getOrSetAnswerStats( questionStats, answerId )
  answerStats.success = false
  answerStats.score = nbPoint // should be negative
}

export function flagQuestionAsMiss( stats: PlayerStats, questionId: QuestionId ) {
  
  // global
  stats.nbMiss++
  stats.score += 0
  
  // per question
  const questionStats = getOrSetQuestionStats( stats, questionId )
  questionStats.score = 0
}

export function flagQuestionAsError( stats: PlayerStats, questionId: QuestionId ) {
  
  // global
  stats.nbError++
  stats.score += 0
  
  // per question
  const questionStats = getOrSetQuestionStats( stats, questionId )
  questionStats.score = 0
  questionStats.error = true
}

export function computeVizualiationScoreData( stats: PlayerStats ): PlayerVizualiationScoreData[] {
  const data:PlayerVizualiationScoreData[] = []
  
  let questionNumber = 0
  let intermediateScore = 0

  data.push({
    x: ` `,
    y: intermediateScore,
    tooltip : `${intermediateScore} (start)`
  })

  for ( const question of stats.questions ) {
    questionNumber++
    intermediateScore += question.score
    
    let tooltip = ''
    if ( question.error ) {
      tooltip = `${intermediateScore} ( Q${questionNumber}: error )`
    } else if ( question.answers.length == 0 ) {
      tooltip = `${intermediateScore} ( Q${questionNumber}: miss )`
    } else if ( question.score >= 0 ) {
      tooltip = `${intermediateScore} ( Q${questionNumber}: +${question.score} )`
    } else {
      tooltip = `${intermediateScore} ( Q${questionNumber}: ${question.score} )`
    }
    
    data.push({
      x: `${questionNumber}`,
      y: intermediateScore,
      tooltip : tooltip
    })
  }
  return data
}

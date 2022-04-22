import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import NextButton from '../component/NextButton'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import GamePage from '../component/GamePage'
import QuestionCard from '../component/QuestionCard'

import { Game, GameStep, OnGameUpdate, selectGame, selectQuestion, onQuestion } from '../data/Game'
import { QuestionId } from '../data/Question'
import { toHomePage, toGamePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const QuestionPage = ( props: Props ) => {
    const { games, updateGame } = props

    const navigate = useNavigate()

    const { gameId, questionId } = useParams()
    const game = selectGame( games, gameId )
    
    React.useEffect( () => { 
        if ( !game ) {
            console.log(`[effect] MISSING game! >>> NAVIGATE to home`)
            navigate( toHomePage() )    
        } else if ( game.questionId != questionId ) {
            console.log(`[effect] NEW question! >>> NAVIGATE to question ${game.questionId}`)
            navigate( toGamePage( game ) )    
        } else if ( !question ) {
            console.log(`[effect] UNKNOWN question! >>> NAVIGATE to home`)
            navigate( toHomePage() )     
        } 
    }, [ game ] )
    
    if ( !game ) {
        return null
    }

    // update helpers

    const updateQuestionId = ( questionId: QuestionId ) => {
        updateGame( game.id, onQuestion( questionId ) )
    }

    const question = selectQuestion( game, questionId )
    if ( !question ) {
        return null
    }

    console.log( question )

    const progress = 25;

    // user events

    const onPreviousQuestion = onUserEvent( () => question.previousId && updateQuestionId( question.previousId ) )
    const onNextQuestion = onUserEvent( () => question.nextId && updateQuestionId( question.nextId ) )

    const onNext = () => question.nextId && updateQuestionId( question.nextId )

    return (
        <GamePage gameStep={GameStep.QUIZZ} game={game} updateGame={updateGame} onNext={onNext}>
            <QuestionCard game={game} question={question} updateGame={updateGame}/>

            <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
    </Timeline>

        </GamePage>
    )
}

export default QuestionPage
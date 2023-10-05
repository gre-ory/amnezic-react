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

import { Game, GameStep, OnGameUpdate, selectGame, selectQuestion, onQuestionNumber, onEndGame, onAnswers } from '../data/Game'
import { QuestionId, OnQuestionUpdate, onQuestionPlayed, onQuestionCompleted } from '../data/Question'
import { toHomePage, toGamePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'
import { DEBUG } from '../data/Constants'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate
}

const QuestionPage = ( props: Props ) => {
    const { games, updateGame, updateQuestion } = props

    const navigate = useNavigate()

    const { gameId, questionNumber } = useParams()
    
    const game = selectGame( games, gameId )
    const question = selectQuestion( game, questionNumber )
    
    React.useEffect( () => { 
        if ( !game ) {
            console.log(`[effect] MISSING game! >>> NAVIGATE to home`)
            navigate( toHomePage() )    
        } else if ( !question ) {
            console.log(`[effect] UNKNOWN question! >>> NAVIGATE to home`)
            navigate( toHomePage() )     
        } else if ( game.questionNumber != question.number ) {
            console.log(`[effect] NEW question! >>> NAVIGATE to question ${game.questionNumber}`)
            navigate( toGamePage( game ) )    
        }  
    }, [ game ] )
    
    if ( !game ) {
        return null
    }

    
    if ( !question ) {
        return null
    }

    // update helpers

    const musicPlayed = () => {
        updateQuestion( game.id, question.id, onQuestionPlayed )
    }

    const musicAnswered = () => {
        updateGame( game.id, onAnswers( game, question ) )
        updateQuestion( game.id, question.id, onQuestionCompleted )
    }

    const updateQuestionNumber = ( questionNumber: number ) => {
        updateGame( game.id, onQuestionNumber( questionNumber ) )
    }

    const endGame = () => {
        updateGame( game.id, onEndGame )
    }

    // user events
    
    const onPrevious = DEBUG && question.previousNumber ? () => {
        if ( question.previousNumber ) {
            console.log( `onNext >>> updateQuestionNumber( ${question.previousNumber} )` )
            updateQuestionNumber( question.previousNumber )
        }
    } : undefined

    const onNext = () => {
        switch ( question.status ) {
            case 'not-played':
                console.log( 'onNext >>> musicPlayed()' )
                musicPlayed()
                break
            case 'played':
                console.log( 'onNext >>> musicAnswered()' )
                musicAnswered()
                break
            case 'error':
            case 'completed':
                if ( question.nextNumber ) {
                    console.log( `onNext >>> updateQuestionNumber( ${question.nextNumber} )` )
                    updateQuestionNumber( question.nextNumber )
                } else {
                    console.log( `onNext >>> endGame()` )
                    endGame()
                }
                break
        }
    }

    // title

    const title =  DEBUG ? `Q${question.number} - ${question.title} - ${question.status}` : `Q${question.number} - ${question.title}`

    return (
        <GamePage title={title} step={GameStep.QUIZZ} game={game} updateGame={updateGame} onPrevious={onPrevious} onNext={onNext}>
            <QuestionCard game={game} question={question} updateGame={updateGame} updateQuestion={updateQuestion} onNext={onNext}/>
        </GamePage>
    )
}

export default QuestionPage
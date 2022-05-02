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

import { Game, GameStep, OnGameUpdate, selectGame, selectQuestion, onQuestion, onEndGame } from '../data/Game'
import { QuestionId, OnQuestionUpdate } from '../data/Question'
import { toHomePage, toGamePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate
}

const QuestionPage = ( props: Props ) => {
    const { games, updateGame, updateQuestion } = props

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

    const endGame = () => {
        updateGame( game.id, onEndGame )
    }

    const question = selectQuestion( game, questionId )
    if ( !question ) {
        return null
    }

    // user events

    const onNext = () => question.nextId ? updateQuestionId( question.nextId ) : endGame()

    return (
        <GamePage gameStep={GameStep.QUIZZ} game={game} updateGame={updateGame} onNext={onNext}>
            <QuestionCard game={game} question={question} updateGame={updateGame} updateQuestion={updateQuestion}/>
        </GamePage>
    )
}

export default QuestionPage
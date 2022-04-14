import React from 'react'
import { useParams } from "react-router";

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import GamePage from '../component/GamePage'

import { Game, GameStep, selectGame } from '../data/Game'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const QuestionPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId, question } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    const questionNumber = question !== undefined ? parseInt(question) : 1
    const hasNext = true
    const hasPrevious = questionNumber > 1
    const progress = 25;

    return (
        <GamePage gameStep={GameStep.QUIZZ} game={game} updateGame={updateGame}>
            <h3>question ${question}</h3>

            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous" disabled={!hasPrevious} href={`/quizz/${questionNumber-1}`}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next" disabled={!hasNext} href={`/quizz/${questionNumber+1}`}>
                        <SkipNextIcon />
                    </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
            </Card>

            <LinearProgress variant="determinate" value={progress} />
        </GamePage>
    )
}

export default QuestionPage
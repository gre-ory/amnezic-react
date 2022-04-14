import React from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

import { Game } from '../data/Game'
import { toDateTimeString } from '../data/Util'

import NextButton from './NextButton'
import DoneIcon from './DoneIcon'

interface Props {
    game: Game
    startGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
}

const GameCard = ( props: Props ) => {
    const { game, startGame, deleteGame } = props

    const progress = game.started && game.questions.length > 0 ? game.questionId * 100 / game.questions.length : 0

    return (
        <Card variant="outlined" className="selectable" onClick={() => startGame( game )}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Game {game.id}</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PersonIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbPlayer} players</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbQuestion} questions</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{game.questionId} / {game.questions.length} question(s)</span>
                    </Grid>
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CalendarTodayIcon style={{ marginRight: '10px' }} color="primary"/> {toDateTimeString(game.date)}</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>set-up: <DoneIcon done={game.setUp} /></span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>started: <DoneIcon done={game.started} /></span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>progress: {progress}%</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ended: <DoneIcon done={game.ended} /></span>
                    </Grid>
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        <LinearProgress variant="determinate" value={progress} />
                    </Grid>
                </Grid>

            </CardContent>
            <CardActions>

                <Grid container spacing={2}>
                    
                    <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        <IconButton className="first-game" aria-label="Delete" onClick={() => deleteGame( game )}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                        <NextButton title={game.started ? 'Resume Game' : 'Start Game'} onClick={() => startGame( game )} />
                    </Grid>

                </Grid>

            </CardActions>
        </Card>
    )
}

export default GameCard
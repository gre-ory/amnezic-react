import React from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
import { onUserEvent, toDateTimeString } from '../data/Util'

import DoneIcon from './DoneIcon'

interface Props {
    game: Game
    resumeGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
}

const GameCard = ( props: Props ) => {
    const { game, resumeGame, deleteGame } = props

    if ( !game ) {
        return null
    }

    // user events

    const onResume = onUserEvent( () => resumeGame( game ) )
    const onDelete = onUserEvent( () => deleteGame( game ) )

    return (
        <div title="Resume Game" className="selectable" onClick={onResume}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Game {game.id}</span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PersonIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbPlayer} players</span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbQuestion} questions</span>
                            <IconButton className="first-game" aria-label="Delete" onClick={onDelete}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CalendarTodayIcon style={{ marginRight: '10px' }} color="primary"/> {toDateTimeString(game.created)}</span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>started: <DoneIcon done={game.started} /></span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>progress: {game.stats ? game.stats.progress : '-'}%</span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ended: <DoneIcon done={game.ended} /></span>
                        </Grid>
                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                            <LinearProgress variant="determinate" value={game.stats ? game.stats.progress : 0} />
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    )
}

export default GameCard
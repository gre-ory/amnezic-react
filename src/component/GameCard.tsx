import React from 'react'

import { makeStyles, Theme } from '@mui/styles';
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

const useStyles = makeStyles( (theme: Theme) => ( {
    gameCard: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '10px',
        borderRadius: '10px',
        border: '2px solid #ddd',        
        "&:hover": {
            border: '2px solid gold',        
            backgroundColor: '#ffd70029'
        }
    },
    gameLine: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    gameItem: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    icon: {
        marginRight: '10px'
    },
} ) );

interface Props {
    game: Game
    resumeGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
}

const GameCard = ( props: Props ) => {
    const { game, resumeGame, deleteGame } = props
    const classes = useStyles()

    if ( !game ) {
        return null
    }

    // user events

    const onResume = onUserEvent( () => resumeGame( game ) )
    const onDelete = onUserEvent( () => deleteGame( game ) )

    const progress = game.ended ? 100 : game.stats ? game.stats.progress : 0
    const state = game.ended ? 'ended' : game.stats ? `${Math.round(game.stats.progress)}%` : 'not started'

    return (        
        <div title="Resume Game" className={`${classes.gameCard} selectable`} onClick={onResume}>
            <div className={classes.gameLine}> 
                <div className={classes.gameItem}>Game {game.id}</div>
                <div className={classes.gameItem}><PersonIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbPlayer} players</div>
                <div className={classes.gameItem}><MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbQuestion} questions</div>
                <IconButton className={classes.icon} aria-label="Delete" onClick={onDelete}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.gameLine}> 
                <div className={classes.gameItem}><CalendarTodayIcon className={classes.icon} color="primary"/> {toDateTimeString(game.updated)}</div>                
            </div>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={progress} valueBuffer={100}/>
                </Box>
                <Box sx={{ minWidth: '70px' }}>
                    <Typography variant="body2" color="text.secondary">{state}</Typography>
                </Box>
            </Box>

        </div>
    )
}

export default GameCard
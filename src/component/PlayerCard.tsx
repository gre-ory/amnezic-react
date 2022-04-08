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
import { Player } from '../data/Player'
import { toDecimalString } from '../data/Util'

import NextButton from './NextButton'

interface Props {
    game: Game
    player: Player
}

const PlayerCard = ( props: Props ) => {
    const { game, player } = props

    return (
        <Card variant="outlined">
            <CardContent>
                <h3>Player {toDecimalString(player.id)}</h3>

                <Grid container spacing={2}>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        <PersonIcon style={{ marginRight: '10px' }} color="primary"/> {player.name} players
                    </Grid>

                </Grid>

            </CardContent>
            <CardActions>

                <Grid container spacing={2}>
                    
                    {/* <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        <IconButton className="first-game" aria-label="Delete" onClick={() => deleteGame( game )}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                        <NextButton title={game.started ? 'Resume Game' : 'Start Game'} onClick={() => startGame( game )} />
                    </Grid> */}

                </Grid>

            </CardActions>
        </Card>
    )
}

export default PlayerCard
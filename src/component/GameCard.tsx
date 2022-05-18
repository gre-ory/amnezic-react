import React from 'react'

import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import SkipNextIcon from '@mui/icons-material/SkipNext'

import { Game } from '../data/Game'
import { onUserEvent, toDateTimeString } from '../data/Util'
import { Chip, Stack } from '@mui/material';

const useStyles = makeStyles( () => ( {
    gameCard: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '10px 20px',
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
} ) );

interface Props {
    game?: Game
    startGame?: () => void
    resumeGame?: ( game: Game ) => void
    deleteGame?: ( game: Game ) => void
}

const GameCard = ( props: Props ) => {
    const { game, startGame, resumeGame, deleteGame } = props
    const classes = useStyles()

    if ( !game ) {

        const onStart = startGame ? onUserEvent( () => startGame() ) : undefined

        return (
            <div title="Start New Game" className={`${classes.gameCard} selectable`} onClick={onStart}>
                <div className={classes.gameLine}> 
                    <div className={classes.gameItem}><b>Start New Game</b></div>
                    <div> </div>
                </div>
                <div className={classes.gameLine}> 
                    <div> </div>
                    <SkipNextIcon style={{ margin: '20px' }} color="primary"/>
                    <div> </div>
                </div>
            </div>
        )
    }

    // user events

    const onResume = resumeGame ? onUserEvent( () => resumeGame( game ) ) : undefined
    const onDelete = deleteGame ? onUserEvent( () => deleteGame( game ) ) : undefined

    const progress = game.ended ? 100 : game.stats ? game.stats.progress : 0
    const state = game.ended ? 'ended' : game.stats ? `${Math.round(game.stats.progress)}%` : 'not started'

    return (        
        <div title="Resume Game" className={`${classes.gameCard} selectable`} onClick={onResume}>
            <div className={classes.gameLine}> 
                <div className={classes.gameItem}><b>Game {game.id}</b></div>

                <div>
                    <Stack direction="row" spacing={1} style={{ opacity: '0.7' }}>
                        { game.ended && <Chip label="Ended" color="success" /> }
                        { !game.ended && game.stats && <Chip label={`${Math.round(game.stats.progress)}%`} color="primary" /> }
                        { !game.ended && !game.stats && <Chip label="Not started" color="warning" /> }
                    </Stack>
                </div>

                <IconButton title="Delete Game" onClick={onDelete}>
                    <CloseIcon />
                </IconButton>

            </div>
            <div style={{ marginLeft: '5%', width: '95%' }}>
                <div className={classes.gameLine}> 
                    <div className={classes.gameItem}><PersonIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbPlayer} players</div>
                    <div className={classes.gameItem}><MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {game.settings.nbQuestion} questions</div>
                    <div className={classes.gameItem}><CalendarTodayIcon style={{ marginRight: '10px' }} color="primary"/> {toDateTimeString(game.updated)}</div>                
                </div>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                    <Box sx={{ height: '10px', width: '100%', display: 'flex', alignItems: 'center' }}>
                        <LinearProgress variant="determinate" value={progress} valueBuffer={100}/>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default GameCard
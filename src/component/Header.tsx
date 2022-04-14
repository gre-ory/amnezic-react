import React from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FlagIcon from '@mui/icons-material/Flag';
import Grid from '@mui/material/Grid';

import { Game, GameStep, updateStep } from '../data/Game'
import { toHomePage } from '../data/Navigate'

interface Props {
    gameStep?: GameStep
    game?: Game
    updateGame?: ( game: Game ) => void
}

const Header = ( props: Props ) => {
    const { gameStep, game, updateGame } = props

    const navigate = useNavigate()

    const isHomePageDisabled = false
    const isSettingsPageDisabled = !game || game.setUp
    const isPlayersPageDisabled = !game || game.ended || !game.setUp
    const isQuizzPageDisabled = !game || game.ended || !game.setUp
    const isScoresPageDisabled = !game || !game.started
    const isEndPageDisabled = !game || !game.started

    const setStep = ( gameStep: GameStep ) => {
        console.log(`[header] gameStep = ${gameStep}`);
        game && updateGame && updateGame( updateStep( game, gameStep ) )
    }

    return (
        <Box className="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Grid container spacing={2}>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="home" 
                                color={gameStep === undefined ? 'secondary' : 'default'} 
                                disabled={isHomePageDisabled} 
                                onClick={() => navigate( toHomePage() )}
                            >
                                <HomeIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton
                                aria-label="Settings" 
                                color={ gameStep == GameStep.SETTINGS ? 'secondary' : 'default' } 
                                disabled={isSettingsPageDisabled} 
                                onClick={() => setStep( GameStep.SETTINGS )}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Players" 
                                color={ gameStep == GameStep.PLAYERS ? 'secondary' : 'default' } 
                                disabled={isPlayersPageDisabled} 
                                onClick={() => setStep( GameStep.PLAYERS )}
                            >
                                <GroupIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Quizz" 
                                color={ gameStep == GameStep.QUIZZ ? 'secondary' : 'default' } 
                                disabled={isQuizzPageDisabled} 
                                onClick={() => setStep( GameStep.QUIZZ )}
                            >
                                <MusicNoteIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Scores" 
                                color={ gameStep == GameStep.SCORES ? 'secondary' : 'default' } 
                                disabled={isScoresPageDisabled} 
                                onClick={() => setStep( GameStep.SCORES )}
                            >
                                <MilitaryTechIcon />
                            </IconButton>
                        </Grid>                            

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="End" 
                                color={ gameStep == GameStep.END ? 'secondary' : 'default' } 
                                disabled={isEndPageDisabled} 
                                onClick={() => setStep( GameStep.END )}
                            >
                                <FlagIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

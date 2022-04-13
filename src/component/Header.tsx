import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Link, NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';

import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FlagIcon from '@mui/icons-material/Flag';
import Grid from '@mui/material/Grid';

import { PageLabel } from '../data/Page'

import { Game, updatePage } from '../data/Game'
import { toHomePage, toSettingsPage, toPlayersPage, toQuizzPage, toScoresPage, toEndPage } from '../data/Util'

interface Props {
    label: PageLabel
    game?: Game
    updateGame?: ( game: Game ) => void
}

const Header = ( props: Props ) => {
    const { label, game, updateGame } = props

    const navigate = useNavigate()

    const isHomePageDisabled = false
    const isSettingsPageDisabled = !game || game.setUp
    const isPlayersPageDisabled = !game || game.ended || !game.setUp
    const isQuizzPageDisabled = !game || game.ended || !game.setUp
    const isScoresPageDisabled = !game || !game.started
    const isEndPageDisabled = !game || !game.started

    const setPage = ( page: PageLabel ) => {
        console.log(`[header] page = ${page}`);
        game && updateGame && updateGame( updatePage( game, page ) )
    }

    return (
        <Box className="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Grid container spacing={2}>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="home" 
                                color={label == 'home' ? 'secondary' : 'default'} 
                                disabled={isHomePageDisabled} 
                                onClick={() => navigate( toHomePage() )}
                            >
                                <HomeIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton
                                aria-label="Settings" 
                                color={label == 'settings' ? 'secondary' : 'default'} 
                                disabled={isSettingsPageDisabled} 
                                onClick={() => setPage( 'settings' )}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Players" 
                                color={label == 'players' ? 'secondary' : 'default'} 
                                disabled={isPlayersPageDisabled} 
                                onClick={() => setPage( 'players' )}
                            >
                                <GroupIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Quizz" 
                                color={label == 'quizz' ? 'secondary' : 'default'} 
                                disabled={isQuizzPageDisabled} 
                                onClick={() => setPage( 'quizz' )}
                            >
                                <MusicNoteIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="Scores" 
                                color={label == 'scores' ? 'secondary' : 'default'} 
                                disabled={isScoresPageDisabled} 
                                onClick={() => setPage( 'scores' )}
                            >
                                <MilitaryTechIcon />
                            </IconButton>
                        </Grid>                            

                        <Grid item xs={2} textAlign="center">
                            <IconButton 
                                aria-label="End" 
                                color={label == 'end' ? 'secondary' : 'default'} 
                                disabled={isEndPageDisabled} 
                                onClick={() => setPage( 'end' )}
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

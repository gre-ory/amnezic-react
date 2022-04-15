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
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { Game, GameStep, OnGameUpdate, OnStep } from '../data/Game'
import { toHomePage } from '../data/Navigate'

interface Props {
    gameStep?: GameStep
    game?: Game
    updateGame?: OnGameUpdate
    onNext?: () => void
}

const Header = ( props: Props ) => {
    const { gameStep, game, updateGame, onNext } = props

    const navigate = useNavigate()

    const isHomePageDisabled = false
    const isSettingsPageDisabled = ( game === undefined ) || ( game.players !== undefined )
    const isPlayersPageDisabled = ( game === undefined ) || game.ended || ( game.players === undefined )
    const isQuizzPageDisabled = ( game === undefined ) || game.ended || ( game.questions === undefined )
    const isScoresPageDisabled = ( game === undefined ) || !game.started
    const isEndPageDisabled = ( game === undefined ) || !game.started
    const isNextDisabled = ( onNext === undefined )

    // update helpers

    const updateGameStep = ( gameStep: GameStep ) => {
        if ( game && updateGame ) {
            updateGame( game.id, OnStep( gameStep ) )
        }
    }

    // user events

    const onHomePage = ( event: any ) => {
        navigate( toHomePage() )
        event.stopPropagation()
    }

    const onSettingsPage = ( event: any ) => {
        updateGameStep( GameStep.SETTINGS )
        event.stopPropagation()
    }

    const onPlayersPage = ( event: any ) => {
        updateGameStep( GameStep.PLAYERS )
        event.stopPropagation()
    }

    const onQuizzPage = ( event: any ) => {
        updateGameStep( GameStep.QUIZZ )
        event.stopPropagation()
    }

    const onScoresPage = ( event: any ) => {
        updateGameStep( GameStep.SCORES )
        event.stopPropagation()
    }

    const onEndPage = ( event: any ) => {
        updateGameStep( GameStep.END )
        event.stopPropagation()
    }

    const onNextPage = ( event: any ) => {
        if ( onNext ) {
            onNext()
        }
        event.stopPropagation()
    }

    return (
        <Box className="header" sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* Home */}

                        <IconButton 
                            aria-label="home" 
                            size="large"
                            color={gameStep === undefined ? 'secondary' : 'default'} 
                            disabled={isHomePageDisabled} 
                            onClick={onHomePage}
                        >
                            <HomeIcon />
                        </IconButton>

                        {/* Settings */}

                        <IconButton
                            aria-label="Settings" 
                            size="large" 
                            color={ gameStep == GameStep.SETTINGS ? 'secondary' : 'default' } 
                            disabled={isSettingsPageDisabled} 
                            onClick={onSettingsPage}
                        >
                            <SettingsIcon />
                        </IconButton>

                        {/* Players */}

                        <IconButton 
                            aria-label="Players" 
                            size="large" 
                            color={ gameStep == GameStep.PLAYERS ? 'secondary' : 'default' } 
                            disabled={isPlayersPageDisabled} 
                            onClick={onPlayersPage}
                        >
                            <GroupIcon />
                        </IconButton>

                        {/* Quizz */}

                        <IconButton 
                            aria-label="Quizz" 
                            size="large" 
                            color={ gameStep == GameStep.QUIZZ ? 'secondary' : 'default' } 
                            disabled={isQuizzPageDisabled} 
                            onClick={onQuizzPage}
                        >
                            <MusicNoteIcon />
                        </IconButton>

                        {/* Scores */}
                    
                        <IconButton 
                            aria-label="Scores" 
                            size="large" 
                            color={ gameStep == GameStep.SCORES ? 'secondary' : 'default' } 
                            disabled={isScoresPageDisabled} 
                            onClick={onScoresPage}
                        >
                            <MilitaryTechIcon />
                        </IconButton>

                        {/* End */}

                        <IconButton 
                            aria-label="End" 
                            size="large"
                            color={ gameStep == GameStep.END ? 'secondary' : 'default' } 
                            disabled={isEndPageDisabled} 
                            onClick={onEndPage}
                        >
                            <FlagIcon />
                        </IconButton>

                        {/* Next */}

                        <IconButton 
                            aria-label="Next" 
                            color="info" 
                            disabled={isNextDisabled} 
                            onClick={onNext}
                        >
                            <SkipNextIcon />
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

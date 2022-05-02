import React from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import SkipNextIcon from '@mui/icons-material/SkipNext'

import { Game, GameStep, OnGameUpdate, OnStep } from '../data/Game'
import { isSettingsPageDisabled, isPlayersPageDisabled, isQuizzPageDisabled, isScoresPageDisabled } from '../data/Game'
import { toHomePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'

interface Props {
    gameStep?: GameStep
    game?: Game
    updateGame?: OnGameUpdate
    onNext?: () => void
}

const Header = ( props: Props ) => {
    const { gameStep, game, updateGame, onNext } = props

    const navigate = useNavigate()

    const isHomeDisabled = false
    const isSettingsDisabled = isSettingsPageDisabled( game )
    const isPlayersDisabled = isPlayersPageDisabled( game )
    const isQuizzDisabled = isQuizzPageDisabled( game )
    const isScoresDisabled = isScoresPageDisabled( game )
    const isNextDisabled = ( onNext === undefined )

    // update helpers

    const updateGameStep = ( gameStep: GameStep ) => {
        if ( game && updateGame ) {
            updateGame( game.id, OnStep( gameStep ) )
        }
    }

    // user events

    const onHomePage = onUserEvent( () => navigate( toHomePage() ) )
    const onSettingsPage = onUserEvent( () => updateGameStep( GameStep.SETTINGS ) )
    const onPlayersPage = onUserEvent( () => updateGameStep( GameStep.PLAYERS ) )
    const onQuizzPage = onUserEvent( () => updateGameStep( GameStep.QUIZZ ) )
    const onScoresPage = onUserEvent( () => updateGameStep( GameStep.SCORES ) )
    const onNextPage = onUserEvent( () => onNext && onNext() )

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
                            disabled={isHomeDisabled} 
                            onClick={onHomePage}
                        >
                            <HomeIcon />
                        </IconButton>

                        {/* Settings */}

                        <IconButton
                            aria-label="Settings" 
                            size="large" 
                            color={ gameStep == GameStep.SETTINGS ? 'secondary' : 'default' } 
                            disabled={isSettingsDisabled} 
                            onClick={onSettingsPage}
                        >
                            <SettingsIcon />
                        </IconButton>

                        {/* Players */}

                        <IconButton 
                            aria-label="Players" 
                            size="large" 
                            color={ gameStep == GameStep.PLAYERS ? 'secondary' : 'default' } 
                            disabled={isPlayersDisabled} 
                            onClick={onPlayersPage}
                        >
                            <GroupIcon />
                        </IconButton>

                        {/* Quizz */}

                        <IconButton 
                            aria-label="Quizz" 
                            size="large" 
                            color={ gameStep == GameStep.QUIZZ ? 'secondary' : 'default' } 
                            disabled={isQuizzDisabled} 
                            onClick={onQuizzPage}
                        >
                            <MusicNoteIcon />
                        </IconButton>

                        {/* Scores */}
                    
                        <IconButton 
                            aria-label="Scores" 
                            size="large" 
                            color={ gameStep == GameStep.SCORES ? 'secondary' : 'default' } 
                            disabled={isScoresDisabled} 
                            onClick={onScoresPage}
                        >
                            <MilitaryTechIcon />
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

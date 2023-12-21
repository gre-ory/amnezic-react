import React from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import MenuIcon from '@mui/icons-material/Menu'

import { Game, GameStep, OnGameUpdate, OnStep } from '../data/Game'
import { isSettingsPageDisabled, isPlayersPageDisabled, isQuizzPageDisabled, isScoresPageDisabled } from '../data/Game'
import { toHomePage } from '../data/Navigate'
import { onKeyEvent, onUserEvent } from '../data/Util'
import {  Group, Home, MilitaryTech, MusicNote, Settings } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { HEADER_KEYBOARD_SHORTCUTS } from '../data/Constants'

interface Props {
    title?: string
    step?: GameStep
    game?: Game
    updateGame?: OnGameUpdate
    canPrevious?: () => boolean
    onPrevious?: () => void
    canNext?: () => boolean
    onNext?: () => void
}

const Header = ( props: Props ) => {
    const { title, step, game, updateGame, canPrevious, onPrevious, canNext, onNext } = props

    const navigate = useNavigate()

    // title helpers

    const homeTitle = 'Home'
    const settingsTitle = 'Settings'
    const playersTitle = 'Players'
    const quizzTitle = 'Quizz'
    const scoresTitle = 'Scores'

    // selected helpers

    const isHomeSelected = step === undefined
    const isSettingsSelected = step == GameStep.SETTINGS
    const isPlayersSelected = step == GameStep.PLAYERS
    const isQuizzSelected = step == GameStep.QUIZZ
    const isScoresSelected = step == GameStep.SCORES

    // disabled helpers

    if ( game ) {
        console.log(`game.${game.id}: disabled=${isSettingsPageDisabled( game )} : loaded=${game.loaded} : ended=${game.ended}`)
    }

    const isHomeDisabled = false
    const isSettingsDisabled = isSettingsPageDisabled( game )
    const isPlayersDisabled = isPlayersPageDisabled( game )
    const isQuizzDisabled = isQuizzPageDisabled( game )
    const isScoresDisabled = isScoresPageDisabled( game )

    // disable previous & next buttons

    const previousVisible = onPrevious !== undefined
    const previousDisabled = canPrevious !== undefined && !canPrevious()
    const nextVisible = onNext !== undefined
    const nextDisabled = canNext !== undefined && !canNext()

    // update helpers

    const updateGameStep = ( gameStep: GameStep ) => {
        if ( game && updateGame ) {
            updateGame( game.id, OnStep( gameStep ) )
        }
    }

    // user events

    const onHomePage = !isHomeSelected ? onUserEvent( () => navigate( toHomePage() ) ) : undefined
    const onSettingsPage = !isSettingsSelected ? onUserEvent( () => updateGameStep( GameStep.SETTINGS ) ) : undefined
    const onPlayersPage = !isPlayersSelected ? onUserEvent( () => updateGameStep( GameStep.PLAYERS ) ) : undefined
    const onQuizzPage = !isQuizzSelected ? onUserEvent( () => updateGameStep( GameStep.QUIZZ ) ) : undefined
    const onScoresPage = !isScoresSelected ? onUserEvent( () => updateGameStep( GameStep.SCORES ) ) : undefined

    // keyboard shortcuts

    if ( HEADER_KEYBOARD_SHORTCUTS ) {

        const handleKeyPress = React.useCallback( onKeyEvent( ( key: string ): boolean => {
            switch ( key ) {
                case 'ArrowLeft':
                    if ( previousVisible && !previousDisabled ) {
                        console.log( `header >>> key "${key}" >>> onPrevious()`);
                        onPrevious();
                        return true;
                    }
                    break;
                case 'ArrowRight':
                    if ( nextVisible && !nextDisabled ) {
                        console.log( `header >>> key "${key}" >>> onNext()`);
                        onNext();
                        return true;
                    }
                    break;
            } 
            return false;
        } ), [ onPrevious, onNext ] );
        
        React.useEffect( () => {
            document.addEventListener( 'keydown', handleKeyPress );
            return () => {
                document.removeEventListener( 'keydown', handleKeyPress );
            };
        }, [ handleKeyPress ] );
    }

    // menu 

    const [ menuElement, setMenuElement ] = React.useState( null );
    const open = Boolean( menuElement );
    const onMenuOpen = ( event: any ) => {
        setMenuElement( event.currentTarget );
    };
    const onMenuClose = () => {
        setMenuElement( null );
    };

    // title 

    const finalTitle = title ? title : 
                        isHomeSelected ? homeTitle : 
                        isSettingsSelected ? settingsTitle : 
                        isPlayersSelected ? playersTitle : 
                        isQuizzSelected ? quizzTitle : 
                        isScoresSelected ? scoresTitle : ''



    return (
        <Box className="header" sx={{ flexGrow: 1 }} style={{ marginBottom: '20px' }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* menu */}

                        <div>

                            { game && (
                                <>

                                    {/* icon */}
        
                                    <IconButton
                                        id="menu-button"
                                        aria-label="menu"
                                        aria-controls={ open ? 'basic-menu' : undefined }
                                        aria-expanded={ open ? 'true' : undefined }
                                        aria-haspopup="true"
                                        onClick={onMenuOpen}
                                    >
                                        <MenuIcon />
                                    </IconButton>
        
                                    {/* menu items */}
        
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={menuElement}
                                        open={open}
                                        onClose={onMenuClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
        
                                        {/* home */}
        
                                        <MenuItem selected={isHomeSelected} disabled={isHomeDisabled} onClick={onHomePage}>
                                            <ListItemIcon>
                                                <Home fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{homeTitle}</ListItemText>
                                        </MenuItem>
        
                                        {/* settings */}
        
                                        <MenuItem selected={isSettingsSelected} disabled={isSettingsDisabled} onClick={onSettingsPage}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{settingsTitle}</ListItemText>
                                        </MenuItem>
        
                                        {/* players */}
        
                                        <MenuItem selected={isPlayersSelected} disabled={isPlayersDisabled} onClick={onPlayersPage}>
                                            <ListItemIcon>
                                                <Group fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{playersTitle}</ListItemText>
                                        </MenuItem>
        
                                        {/* quizz */}
        
                                        <MenuItem selected={isQuizzSelected} disabled={isQuizzDisabled} onClick={onQuizzPage}>
                                            <ListItemIcon>
                                                <MusicNote fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{quizzTitle}</ListItemText>
                                        </MenuItem>
        
                                        {/* scores */}
        
                                        <MenuItem selected={isScoresSelected} disabled={isScoresDisabled} onClick={onScoresPage}>
                                            <ListItemIcon>
                                                <MilitaryTech fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{scoresTitle}</ListItemText>
                                        </MenuItem>
        
                                    </Menu>
                                
                                </>
                            ) }

                        </div>

                        {/* title */}

                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{finalTitle}</div>

                        {/* Previous & Next */}
                        
                        <div>

                            { previousVisible && (
                                <IconButton 
                                    aria-label="Previous" 
                                    color="info"
                                    disabled={previousDisabled}
                                    onClick={onPrevious}
                                >
                                    <SkipPreviousIcon />
                                </IconButton>
                            ) }
                            
                            { nextVisible && (
                                <IconButton 
                                    aria-label="Next" 
                                    color="info"
                                    disabled={nextDisabled}
                                    onClick={onNext}
                                >
                                    <SkipNextIcon />
                                </IconButton>
                            ) }

                        </div>

                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

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
import { onUserEvent } from '../data/Util'
import {  Group, Home, MilitaryTech, MusicNote, Settings } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'

interface Props {
    title?: string
    gameStep?: GameStep
    game?: Game
    updateGame?: OnGameUpdate
    onPrevious?: () => void
    onNext?: () => void
}

const Header = ( props: Props ) => {
    const { title, gameStep, game, updateGame, onPrevious, onNext } = props

    const navigate = useNavigate()

    // title helpers

    const homeTitle = 'Home'
    const settingsTitle = 'Settings'
    const playersTitle = 'Players'
    const quizzTitle = 'Quizz'
    const scoresTitle = 'Scores'

    // selected helpers

    const isHomeSelected = gameStep === undefined
    const isSettingsSelected = gameStep == GameStep.SETTINGS
    const isPlayersSelected = gameStep == GameStep.PLAYERS
    const isQuizzSelected = gameStep == GameStep.QUIZZ
    const isScoresSelected = gameStep == GameStep.SCORES

    // disabled helpers

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

    const onHomePage = !isHomeSelected ? onUserEvent( () => navigate( toHomePage() ) ) : undefined
    const onSettingsPage = !isSettingsSelected ? onUserEvent( () => updateGameStep( GameStep.SETTINGS ) ) : undefined
    const onPlayersPage = !isPlayersSelected ? onUserEvent( () => updateGameStep( GameStep.PLAYERS ) ) : undefined
    const onQuizzPage = !isQuizzSelected ? onUserEvent( () => updateGameStep( GameStep.QUIZZ ) ) : undefined
    const onScoresPage = !isScoresSelected ? onUserEvent( () => updateGameStep( GameStep.SCORES ) ) : undefined
    const onPreviousPage = onUserEvent( () => onPrevious && onPrevious() )
    const onNextPage = onUserEvent( () => onNext && onNext() )

    // keyboard shortcuts

    const handleKeyPress = React.useCallback( ( event ) => {    
        console.log( `header >>> key-down >>> [${event.key}]` )    
        switch ( event.key ) {
            case 'p':
            case 'ArrowLeft':
                if ( onPrevious ) {
                    console.log( `header >>> key "${event.key}" >>> onPrevious()`);
                    onPrevious();
                }
                break;
            case 'n':
            case 'Enter':
            case 'ArrowRight':
                if ( onNext ) {
                    console.log( `header >>> key "${event.key}" >>> onNext()`);
                    onNext();
                }
                break;
        }
    }, [] );
    
    React.useEffect( () => {
        document.addEventListener( 'keydown', handleKeyPress );
        return () => {
            document.removeEventListener( 'keydown', handleKeyPress );
        };
    }, [ handleKeyPress ] );

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

                            { onPrevious && (
                                <IconButton 
                                    aria-label="Previous" 
                                    color="info"
                                    onClick={onPrevious}
                                >
                                    <SkipPreviousIcon />
                                </IconButton>
                            ) }
                            
                            { onNext && (
                                <IconButton 
                                    aria-label="Next" 
                                    color="info"
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

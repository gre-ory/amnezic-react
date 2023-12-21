import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PersonIcon from '@mui/icons-material/Person'
import QuizIcon from '@mui/icons-material/Quiz'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import GamePage from '../component/GamePage'
import PlaylistCard from '../component/PlaylistCard'

import { Settings } from '../data/Settings'
import { Game, GameStep, OnGameUpdate, selectGame, updateSettings, onSetUp, isLegacyGame, isStoreGame, isDeezerGame } from '../data/Game'
import { Playlist } from '../data/Playlist'
import { ThemeInfo } from '../data/ThemeInfo'
import { toHomePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'
import { INCREMENT_NB_ANSWER_PER_QUESTION, INCREMENT_NB_PLAYER, INCREMENT_NB_QUESTION, MAX_NB_ANSWER_PER_QUESTION, MAX_NB_PLAYER, MAX_NB_QUESTION, MIN_NB_ANSWER_PER_QUESTION, MIN_NB_PLAYER, MIN_NB_QUESTION } from '../data/Constants'
import { FetchThemes } from '../client/FetchThemes'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props
    
    const [ themes, SetThemes ] = React.useState<ThemeInfo[]>()
    const [ loading, SetLoading ] = React.useState<boolean>(false)

    const navigate = useNavigate()

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    
    React.useEffect( () => { 
        if ( !game ) {
            console.log(`[effect] MISSING game! >>> NAVIGATE home`)
            navigate( toHomePage() )    
        }
    }, [ game ] )

    if ( !game ) {
        return null
    }

    const isLegacy = isLegacyGame( game )
    const isStore = isStoreGame( game )
    const isDeezer = isDeezerGame( game )


    // current state

    const settings = game.settings

    const nbPlayer = settings.nbPlayer
    const nbPlayerIncrement = INCREMENT_NB_PLAYER
    const lessPlayerDisabled = nbPlayer <= MIN_NB_PLAYER
    const morePlayerDisabled = nbPlayer >= MAX_NB_PLAYER

    const nbQuestion = settings.nbQuestion
    const nbQuestionIncrement = INCREMENT_NB_QUESTION
    const lessQuestionDisabled = nbQuestion <= MIN_NB_QUESTION
    const moreQuestionDisabled = nbQuestion >= MAX_NB_QUESTION

    const nbAnswer = settings.nbAnswer
    const nbAnswerIncrement = INCREMENT_NB_ANSWER_PER_QUESTION
    const lessAnswerDisabled = nbAnswer <= MIN_NB_ANSWER_PER_QUESTION
    const moreAnswerDisabled = nbAnswer >= MAX_NB_ANSWER_PER_QUESTION

    // update helpers

    const updateNbPlayer = ( nbPlayer: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbPlayer = nbPlayer
            return settings 
        } ) )
    }

    const updateNbQuestion = ( nbQuestion: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbQuestion = nbQuestion
            return settings 
        } ) )
    }

    const updateNbAnswer = ( nbAnswer: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbAnswer = nbAnswer
            return settings 
        } ) )
    }

    const addThemeId = ( themeId: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            if ( !settings.themeIds ) {
                settings.themeIds = [ themeId ]
            } else {
                settings.themeIds.push( themeId )
            }
            return settings 
        } ) )
    }

    const removeThemeId = ( themeId: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            if ( settings.themeIds ) {
                settings.themeIds = settings.themeIds.filter( id => id !== themeId )
                if ( settings.themeIds.length === 0 ) {
                    delete settings.themeIds
                }
            }
            return settings 
        } ) )
    }

    const onPlaylist = ( playlist?: Playlist ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.playlist = playlist
            return settings 
        } ) )
    }

    const canNext = (): boolean => {
        // validate settings
        if ( !game ) {
            return false
        }
        if ( !game.settings ) {
            return false
        }
        if ( isDeezer ) {
            if ( !game.settings.playlist ) {
                return false
            }
            if ( !game.settings.playlist.deezerId ) {
                return false
            }
        }
        return true
    }

    const onNext = () => {
        updateGame( game.id, onSetUp )
    }

    React.useEffect( () => { 
        if ( isStore ) {
            SetLoading(true)
            FetchThemes()
                .then( themes => SetThemes( themes ) )
                .catch( err => console.log( err ) )
                .finally( () => SetLoading(false) )
        }
    }, [ isStore ] )

    // user events )

    const lessPlayer = lessPlayerDisabled ? undefined : onUserEvent( () => updateNbPlayer( game.settings.nbPlayer - nbPlayerIncrement ) )
    const morePlayer = morePlayerDisabled ? undefined : onUserEvent( () => updateNbPlayer( game.settings.nbPlayer + nbPlayerIncrement ) )

    const lessQuestion = lessQuestionDisabled ? undefined : onUserEvent( () => updateNbQuestion( game.settings.nbQuestion - nbQuestionIncrement ) )
    const moreQuestion = moreQuestionDisabled ? undefined : onUserEvent( () => updateNbQuestion( game.settings.nbQuestion + nbQuestionIncrement ) )

    const lessAnswer = lessAnswerDisabled ? undefined : onUserEvent( () => updateNbAnswer( game.settings.nbAnswer - nbAnswerIncrement ) )
    const moreAnswer = moreAnswerDisabled ? undefined : onUserEvent( () => updateNbAnswer( game.settings.nbAnswer + nbAnswerIncrement ) )

    const playlist = game.settings.playlist

    return (
        <GamePage step={GameStep.SETTINGS} game={game} updateGame={updateGame} canNext={canNext} onNext={onNext}>
            
            <Grid container spacing={2}>

                {/* nb players */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                > 
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessPlayerDisabled} 
                        onClick={lessPlayer}
                    >
                        - {nbPlayerIncrement}
                    </Button>
                </Grid>

                <Grid 
                    item xs={4} 
                    textAlign="center" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <PersonIcon style={{ marginRight: '10px' }} color="primary"/> 
                    {nbPlayer} {nbPlayer > 1 ? 'players' : 'player'}
                </Grid>

                <Grid 
                    item xs={4} 
                    textAlign="center" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={morePlayerDisabled} 
                        onClick={morePlayer}
                    >
                        + {nbPlayerIncrement}
                    </Button>
                </Grid>

                {/* nb questions */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                >
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessQuestionDisabled} 
                        onClick={lessQuestion}
                    >
                        - {nbQuestionIncrement}
                    </Button>
                </Grid>
                
                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <MusicNoteIcon 
                        style={{ marginRight: '10px' }} 
                        color="primary"
                    /> 
                    {nbQuestion} questions
                </Grid>
                
                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={moreQuestionDisabled} 
                        onClick={moreQuestion}
                    >
                        + {nbQuestionIncrement}
                    </Button>
                </Grid>

                {/* nb answer per question */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                >
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessAnswerDisabled} 
                        onClick={lessAnswer}
                    >
                        - {nbAnswerIncrement}
                    </Button>
                </Grid>

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <QuizIcon 
                        style={{ marginRight: '10px' }} 
                        color="primary"
                    /> 
                    {nbAnswer} answers / question
                </Grid>

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={moreAnswerDisabled} 
                        onClick={moreAnswer}
                    >
                        + {nbAnswerIncrement}
                    </Button>
                </Grid>

                {/* legacy settings */}

                {isLegacy && <>
                    Legacy settings
                </>}

                {/* store settings */}

                {isStore && <>
                    Store settings
                </>}

                {/* deezer playlist */}

                {isDeezer && 
                <Grid 
                    item xs={12} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
                >
                    <PlaylistCard playlist={playlist} onPlaylist={onPlaylist}/>
                </Grid>}

            </Grid>

        </GamePage>
    )
}

export default SettingsPage
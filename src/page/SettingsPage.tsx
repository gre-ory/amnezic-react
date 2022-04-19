import React from 'react'
import { useParams } from "react-router"

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import GamePage from '../component/GamePage'

import { Settings } from '../data/Settings'
import { Game, GameStep, OnGameUpdate, selectGame, updateSettings, onSetUp } from '../data/Game'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    // current state

    const settings = game.settings
    const nbQuestion = settings.nbQuestion
    const nbQuestionIncrement = 1 // 10
    const lessQuestionDisabled = nbQuestion <= 2 // 10
    const moreQuestionDisabled = nbQuestion >= 3 // 200

    const nbPlayer = settings.nbPlayer
    const nbPlayerIncrement = 1
    const lessPlayerDisabled = nbPlayer <= 2
    const morePlayerDisabled = nbPlayer >= 3 // 10

    // update helpers

    const updateNbQuestion = ( nbQuestion: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbQuestion = nbQuestion
            return settings 
        } ) )
    }

    const updateNbPlayer = ( nbPlayer: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbPlayer = nbPlayer
            return settings 
        } ) )
    }

    const onNext = () => {
        updateGame( game.id, onSetUp )
    }

    // user events

    const lessQuestions = ( event: any ) => {
        updateNbQuestion( game.settings.nbQuestion - nbQuestionIncrement )
        event.preventDefault()
    }

    const moreQuestions = ( event: any ) => {
        updateNbQuestion( game.settings.nbQuestion + nbQuestionIncrement )
        event.preventDefault()
    }

    const lessPlayers = ( event: any ) => {
        updateNbPlayer( game.settings.nbPlayer - nbPlayerIncrement )
        event.preventDefault()
    }

    const morePlayers = ( event: any ) => {
        updateNbPlayer( game.settings.nbPlayer + nbPlayerIncrement )
        event.preventDefault()
    }

    return (
        <GamePage gameStep={GameStep.SETTINGS} game={game} updateGame={updateGame} onNext={onNext}>
            
            <h3>Settings</h3>

            <Grid container spacing={2}>

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
                        onClick={lessQuestions}
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
                        onClick={moreQuestions}
                    >
                        + {nbQuestionIncrement}
                    </Button>
                </Grid>

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
                        onClick={lessPlayers}
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
                        onClick={morePlayers}
                    >
                        + {nbPlayerIncrement}
                    </Button>
                </Grid>

            </Grid>

        </GamePage>
    )
}

export default SettingsPage
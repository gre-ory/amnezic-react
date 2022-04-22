import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PersonIcon from '@mui/icons-material/Person'
import QuizIcon from '@mui/icons-material/Quiz'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import GamePage from '../component/GamePage'

import { Settings } from '../data/Settings'
import { Game, GameStep, OnGameUpdate, selectGame, updateSettings, onSetUp } from '../data/Game'
import { toHomePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props

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

    // current state

    const settings = game.settings

    const nbPlayer = settings.nbPlayer
    const nbPlayerIncrement = 1
    const lessPlayerDisabled = nbPlayer <= 2
    const morePlayerDisabled = nbPlayer >= 4 // 10

    const nbQuestion = settings.nbQuestion
    const nbQuestionIncrement = 1 // 10
    const lessQuestionDisabled = nbQuestion <= 2 // 10
    const moreQuestionDisabled = nbQuestion >= 4 // 200

    const nbAnswer = settings.nbAnswer
    const nbAnswerIncrement = 1 // 10
    const lessAnswerDisabled = nbAnswer <= 2
    const moreAnswerDisabled = nbAnswer >= 6

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

    const onNext = () => {
        updateGame( game.id, onSetUp )
    }

    // user events )

    const lessPlayer = onUserEvent( () => updateNbPlayer( game.settings.nbPlayer - nbPlayerIncrement ) )
    const morePlayer = onUserEvent( () => updateNbPlayer( game.settings.nbPlayer + nbPlayerIncrement ) )

    const lessQuestion = onUserEvent( () => updateNbQuestion( game.settings.nbQuestion - nbQuestionIncrement ) )
    const moreQuestion = onUserEvent( () => updateNbQuestion( game.settings.nbQuestion + nbQuestionIncrement ) )

    const lessAnswer = onUserEvent( () => updateNbAnswer( game.settings.nbAnswer - nbAnswerIncrement ) )
    const moreAnswer = onUserEvent( () => updateNbAnswer( game.settings.nbAnswer + nbAnswerIncrement ) )

    return (
        <GamePage gameStep={GameStep.SETTINGS} game={game} updateGame={updateGame} onNext={onNext}>
            
            <h3>Settings</h3>

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

            </Grid>

        </GamePage>
    )
}

export default SettingsPage
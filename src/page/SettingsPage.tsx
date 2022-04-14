import React from 'react'
import { useParams } from "react-router"

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import GamePage from '../component/GamePage'
import NextButton from '../component/NextButton'

import { Game, GameStep, selectGame, updateSettingsNbQuestion, updateSettingsNbPlayer, onSetUp } from '../data/Game'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    const settings = game.settings
    const nbQuestion = settings.nbQuestion
    const nbQuestionIncrement = 10
    const lessQuestionDisabled = nbQuestion <= 10
    const moreQuestionDisabled = nbQuestion >= 200

    const lessQuestions = () => {
        const nbQuestion = game.settings.nbQuestion - nbQuestionIncrement
        console.log( `[lessQuestions] nbQuestion = ${nbQuestion}` )
        updateGame( updateSettingsNbQuestion( game, nbQuestion ) )
    }

    const moreQuestions = () => {
        const nbQuestion = game.settings.nbQuestion + nbQuestionIncrement
        console.log( `[moreQuestions] nbQuestion = ${nbQuestion}` )
        updateGame( updateSettingsNbQuestion( game, nbQuestion ) )
    }

    const nbPlayer = settings.nbPlayer
    const nbPlayerIncrement = 1
    const lessPlayerDisabled = nbPlayer <= 2
    const morePlayerDisabled = nbPlayer >= 10

    const lessPlayers = () => {
        const nbPlayer = game.settings.nbPlayer - nbPlayerIncrement
        console.log( `[lessPlayers] nbPlayer = ${nbPlayer}` )
        updateGame( updateSettingsNbPlayer( game, nbPlayer ) )
    }

    const morePlayers = () => {
        const nbPlayer = game.settings.nbPlayer + nbPlayerIncrement
        console.log( `[morePlayers] nbPlayer = ${nbPlayer}` )
        updateGame( updateSettingsNbPlayer( game, nbPlayer ) )
    }

    const onNextStep = () => {
        updateGame( onSetUp( game ) )
    }

    console.log( `[render] settings - ${game.settings.nbQuestion}` )

    return (
        <GamePage gameStep={GameStep.SETTINGS} game={game} updateGame={updateGame}>
            
            <h3>Settings</h3>

            <Grid container spacing={2}>

                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}> 
                    <Button style={{ marginRight: '40px' }} size="small" variant="contained" disabled={lessQuestionDisabled} onClick={lessQuestions} >- {nbQuestionIncrement}</Button>
                </Grid>
                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    <MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {nbQuestion} questions
                </Grid>
                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Button style={{ marginLeft: '40px' }} size="small" variant="contained" disabled={moreQuestionDisabled} onClick={moreQuestions} >+ {nbQuestionIncrement}</Button>
                </Grid>

                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}> 
                    <Button style={{ marginRight: '40px' }} size="small" variant="contained" disabled={lessPlayerDisabled} onClick={lessPlayers} >- {nbPlayerIncrement}</Button>
                </Grid>
                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                    <PersonIcon style={{ marginRight: '10px' }} color="primary"/> {nbPlayer} {nbPlayer > 1 ? 'players' : 'player'}
                </Grid>
                <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Button style={{ marginLeft: '40px' }} size="small" variant="contained" disabled={morePlayerDisabled} onClick={morePlayers} >+ {nbPlayerIncrement}</Button>
                </Grid>

                <Grid item xs={12} textAlign="right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <NextButton title="Set-up Players"  onClick={onNextStep} />
                </Grid>

            </Grid>

        </GamePage>
    )
}

export default SettingsPage
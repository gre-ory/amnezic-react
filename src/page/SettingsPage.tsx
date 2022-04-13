import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import Page from '../component/Page'
import NextButton from '../component/NextButton'

import { Game, selectGame, updateSettingsNbQuestion, updateSettingsNbPlayer, onSetUp } from '../data/Game'
import { toGamePage } from '../data/Util'
import { PageLabel } from '../data/Page'
import { newPlayers } from '../data/Player';

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const current: PageLabel = 'settings'

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props

    const navigate = useNavigate()

    const { gameId } = useParams()
    const game = selectGame( games, gameId )

    React.useEffect( () => { 
        if ( !game || game.page != current ) {
            console.log('[effect] page=`${game.page}`')
            navigate( toGamePage( game ), { replace: true } )
        }
    }, [ game ] )
    
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
        <Page label="settings" game={game} updateGame={updateGame}>
            
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

        </Page>
    )
}

export default SettingsPage
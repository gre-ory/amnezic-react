import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid';

import Page from '../component/Page'
import Header from '../component/Header'
import Footer from '../component/Footer'
import PlayerCard from '../component/PlayerCard'
import NextButton from '../component/NextButton'

import { Game, selectGame } from '../data/Game'
import { PageLabel } from '../data/PageLabel'
import { toGamePage } from '../data/Util'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const current: PageLabel = 'players'

const PlayersPage = ( props: Props ) => {
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
    
    const goToNextStep = () => {
        game.started = true
        game.page = 'quizz'
        updateGame( game )
    }

    return (
        <Page label="players" game={game} updateGame={updateGame}>
            
            <h3>Players</h3>

            <Grid container spacing={2}>

                {
                    (
                        <>
                            {game.players.map( player => {
                                return (
                                    <Grid key={player.id} item xs={4} textAlign="left">
                                        <PlayerCard
                                            key={player.id}
                                            game={game}
                                            player={player}
                                        />
                                    </Grid>
                                )
                            })}                        
                        </>
                    )
                }

                <Grid item xs={12} textAlign="right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <NextButton title="Set-up Players"  onClick={goToNextStep} />
                </Grid>

            </Grid>

        </Page>
    )
}

export default PlayersPage
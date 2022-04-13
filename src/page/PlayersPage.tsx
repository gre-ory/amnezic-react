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
import { PageLabel } from '../data/Page'
import { toGamePage } from '../data/Util'
import PlayerAvatar, { AvatarSize } from '../component/PlayerAvatar';

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
    
    const onNextStep = () => {
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
                                    <Grid key={player.id} item xs={6} textAlign="left">
                                        <PlayerCard
                                            game={game}
                                            player={player}
                                            updateGame={updateGame}
                                        />
                                    </Grid>
                                )
                            })}                        
                        </>
                    )
                }

                <Grid item xs={12} textAlign="right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <NextButton title="Set-up Players"  onClick={onNextStep} />
                </Grid>

            </Grid>

        </Page>
    )
}

export default PlayersPage
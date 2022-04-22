import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'

import GamePage from '../component/GamePage'
import PlayerCard from '../component/PlayerCard'

import { Game, GameStep, OnGameUpdate, selectGame, OnStep } from '../data/Game'
import { toHomePage } from '../data/Navigate'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const PlayersPage = ( props: Props ) => {
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
    
    if ( !game || !game.players ) {
        return null
    }
    
    // update helpers

    const onNext = () => {    
        updateGame( game.id, OnStep( GameStep.QUIZZ ) )
    }

    return (
        <GamePage gameStep={GameStep.PLAYERS} game={game} updateGame={updateGame} onNext={onNext}>
            
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

            </Grid>

        </GamePage>
    )
}

export default PlayersPage
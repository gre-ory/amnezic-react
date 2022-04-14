import React from 'react'
import { useParams } from "react-router"

import Grid from '@mui/material/Grid';

import GamePage from '../component/GamePage'
import PlayerCard from '../component/PlayerCard'
import NextButton from '../component/NextButton'

import { Game, GameStep, selectGame } from '../data/Game'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const PlayersPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }
    
    const onNextStep = () => {
        game.started = true        
        game.step = GameStep.QUIZZ
        updateGame( game )
    }

    return (
        <GamePage gameStep={GameStep.PLAYERS} game={game} updateGame={updateGame}>
            
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

        </GamePage>
    )
}

export default PlayersPage
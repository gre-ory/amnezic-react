import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'

import { Game, newGame } from '../data/Game'
import { toGamePage } from '../data/Navigate'

import Page from '../component/Page'
import GameCard from '../component/GameCard'
import NextButton from '../component/NextButton'

interface Props {
    games: Game[]
    addGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
    deleteGames: () => void
}

const HomePage = ( props: Props ) => {
    const { games, addGame, deleteGame, deleteGames } = props

    const navigate = useNavigate()

    // update helpers

    const startGame = () => {
        console.log( `[start-game]` )
        const game = newGame()
        addGame( game )
        navigate( toGamePage( game ) )
    }

    const resumeGame = ( game: Game ) => {
        console.log( `[resume-game] ${game.id}` )
        navigate( toGamePage( game ) )
    }

    return (
        <Page onNext={startGame}>
            <Grid container spacing={2}>
                
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                    <NextButton title="Start Game" onNext={startGame} />
                </Grid>

                <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                    <h3>Previous games</h3>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    
                    {/* clear previous games */}

                    <IconButton 
                        aria-label="home" 
                        color="default" 
                        disabled={games.length == 0} 
                        onClick={deleteGames}
                    >
                        <DeleteIcon />
                    </IconButton>

                </Grid>

                {
                    (
                        <>
                            {games.map( game => {
                                return (
                                    <Grid key={game.id} item xs={12} textAlign="left">
                                        <GameCard
                                            game={game}
                                            resumeGame={resumeGame}
                                            deleteGame={deleteGame}
                                        />
                                    </Grid>
                                )
                            })}                        
                        </>
                    )
                } 
            </Grid>
        </Page>
    )
}

export default HomePage
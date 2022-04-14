import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { Game, newGame } from '../data/Game'
import { toGamePage } from '../data/Navigate'

import Page from '../component/Page'
import GameCard from '../component/GameCard'
import NextButton from '../component/NextButton'

interface Props {
    games: Game[]
    addGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
}

const HomePage = ( props: Props ) => {
    const { games, addGame, deleteGame } = props

    const navigate = useNavigate()

    const onStartGame = () => {
        const game = newGame()
        addGame( game )
        navigate( toGamePage( game ) )
    }

    return (
        <Page>
            <Grid container spacing={2}>
                
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                    <NextButton title="Start Game" onClick={onStartGame} />
                </Grid>

                {games.length > 0 && <h3>Previous games</h3>}
                {
                    (
                        <>
                            {games.map( game => {
                                return (
                                    <Grid key={game.id} item xs={12} textAlign="left">
                                        <GameCard
                                            game={game}
                                            startGame={( game: Game ) => navigate( toGamePage( game ) )}
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
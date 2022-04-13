import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';

import { Game, newGame } from '../data/Game'
import { toGamePage } from '../data/Util'
import { PageLabel } from '../data/Page'

import Page from '../component/Page'
import GameCard from '../component/GameCard'

interface Props {
    games: Game[]
    addGame: ( game: Game ) => void
    deleteGame: ( game: Game ) => void
}

const current: PageLabel = 'home'

const HomePage = ( props: Props ) => {
    const { games, addGame, deleteGame } = props

    const navigate = useNavigate()

    return (
        <Page label="home">
            <Grid container spacing={2}>
                { games.length == 0 && (
                    <Grid item xs={12} textAlign="center" style={{ padding: 20 }}> 
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            You have no game
                        </Typography>
                    </Grid>
                ) }
                <Grid item xs={4} textAlign="center">
                    <Card variant="outlined">
                        <CardContent>
                            <IconButton className="first-game" aria-label="Add" onClick={() => addGame( newGame() )}>
                                <AddIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
                {
                    (
                        <>
                            {games.map( game => {
                                return (
                                    <Grid key={game.id} item xs={4} textAlign="left">
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
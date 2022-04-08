import React from 'react'

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
import LinearProgress from '@mui/material/LinearProgress';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Game, updatePlayer } from '../data/Game'
import { Card as DataCard, CardShape, CardSymbol, CardColor } from '../data/Card'
import { Player, updateCard } from '../data/Player'
import { toDecimalString } from '../data/Util'

import NextButton from './NextButton'
import PlayingCard from './PlayingCard';

interface Props {
    game: Game
    player: Player    
    updateGame?: ( game: Game ) => void
}

const PlayerCard = ( props: Props ) => {
    const { game, player, updateGame } = props

    const [ name, setName ] = React.useState( player.name )

    const onNameChange = (e: any) => {
        setName(e.target.value)
    }

    const onNameBlur = () => {
        game && updateGame && updateGame( updatePlayer( game, {
            ...player,
            name: name
        } ) )
    }

    const onCardChange = (card: DataCard) => {
        game && updateGame && updateGame( updatePlayer( game, {
            ...player,
            card: card
        } ) )
    }

    const onSymbolChange = (symbol: CardSymbol) => {
        console.log(`[onSymbolChange] symbol = ${symbol}`)
        onCardChange({
            ...player.card,
            symbol: symbol
        })
    }

    const onShapeChange = (shape: CardShape) => {
        console.log(`[onShapeChange] shape = ${shape}`)
        onCardChange({
            ...player.card,
            shape: shape
        })
    }

    const onColorChange = (color: CardColor) => {
        console.log(`[onColorChange] color = ${color}`)
        onCardChange({
            ...player.card,
            color: color
        })
    }

    const cardShapes: CardShape[] = [ 'square', 'normal', 'tarot' ]
    const xsShape = 4
    const cardColors: CardColor[] = [ 'black', 'red', 'yellow', 'green', 'blue', 'purple' ]
    const xsColor = 2
    const cardSymbols: CardSymbol[] = [ 'heart', 'diamond', 'club', 'spade', 'star', 'dot' ]
    const xsSymbol = 2

    return (
        <Card variant="outlined">
            <CardContent>

            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <PersonIcon style={{ marginRight: '10px' }} color="primary"/>
                    Player {toDecimalString(player.id)}
                </Grid>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={onNameChange} onBlur={onNameBlur} />
                    </Box>                    
                </Grid>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Grid container spacing={2}>

                        {/* shape */}

                        {
                            cardShapes.map( newShape => { 
                                return (
                                    <Grid item xs={xsShape} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                        <PlayingCard 
                                            card={{...player.card, shape: newShape, color: 'gray', size: 'small' }} 
                                            onClick={() => onShapeChange(newShape)} 
                                            selected={player.card.shape == newShape}
                                        />
                                    </Grid>
                                )
                            } )
                        }

                        {/* colors */}

                        {
                            cardColors.map( newColor => { 
                                return (
                                    <Grid item xs={xsColor} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                        <PlayingCard 
                                            card={{...player.card, color: newColor, size: 'small' }} 
                                            onClick={() => onColorChange(newColor)} 
                                            selected={player.card.color == newColor}
                                        />
                                    </Grid>
                                )
                            } )
                        }

                        {/* symbols */}

                        {
                            cardSymbols.map( newSymbol => { 
                                return (
                                    <Grid item xs={xsSymbol} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                        <PlayingCard 
                                            card={{...player.card, symbol: newSymbol, color: 'gray', size: 'small' }} 
                                            onClick={() => onSymbolChange(newSymbol)} 
                                            selected={player.card.symbol == newSymbol}
                                        />
                                    </Grid>
                                )
                            } )
                        }

                        {/* final card */}

                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                            <PlayingCard card={{
                                ...player.card,
                                value: '#',
                                size: 'large'
                            }} />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            </CardContent>
            <CardActions>

                <Grid container spacing={2}>
                    
                    {/* <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        <IconButton className="first-game" aria-label="Delete" onClick={() => deleteGame( game )}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                        <NextButton title={game.started ? 'Resume Game' : 'Start Game'} onClick={() => startGame( game )} />
                    </Grid> */}

                </Grid>

            </CardActions>
        </Card>
    )
}

export default PlayerCard
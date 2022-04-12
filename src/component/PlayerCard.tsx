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
import { Card as DataCard, CardSymbol, CardColor } from '../data/Card'
import { Player, updateCard } from '../data/Player'
import { toDecimalString } from '../data/Util'

import NextButton from './NextButton'
import PlayingCard from './PlayingCard'
import PlayingCardIcon from './PlayingCardIcon'
import SpadeIcon from './icon/SpadeIcon'

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

    const onColorChange = (color: CardColor) => {
        console.log(`[onColorChange] color = ${color}`)
        onCardChange({
            ...player.card,
            color: color
        })
    }

    const cardColors: CardColor[] = [ 'black', 'red', 'yellow', 'green', 'blue', 'purple', 'orange', 'pink', 'brown' ]
    const cardSymbols: CardSymbol[] = [ 'heart', 'diamond', 'club', 'spade', 'star', 'dot' ]

    console.log(player)
    console.log(player.card)

    return (
        <Card variant="outlined">
            <CardContent>

            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'secondary', mr: 1, my: 0.5 }} />
                        <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={onNameChange} onBlur={onNameBlur} />
                    </Box>                    
                </Grid>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Grid container spacing={2}>

                        {/* colors */}

                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        
                            {
                                cardColors.map( newColor => { 
                                    return (
                                        <div style={{ width: '100%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={player.card.color == newColor ? 'selected' : 'selectable'} onClick={() => onColorChange(newColor)}>
                                            <PlayingCardIcon 
                                                symbol="square"
                                                color={newColor}
                                            />
                                        </div> 
                                    )
                                } )
                            }

                        </Grid>

                        {/* symbols */}

                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                        
                            {
                                cardSymbols.map( newSymbol => { 
                                    return (
                                        <div style={{ width: '100%', margin: '5px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={player.card.symbol == newSymbol ? 'selected' : 'selectable'} onClick={() => onSymbolChange(newSymbol)}>
                                            <PlayingCardIcon 
                                                symbol={newSymbol}
                                                color="gray"
                                            />
                                        </div>
                                    )
                                } )
                            }

                        </Grid>

                        {/* final card */}

                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                            
                            <PlayingCard card={{
                                    ...player.card,
                                    value: '2',
                                    size: 'XS'
                                }} 
                                onClick={() => {}}
                            />

                            <PlayingCard card={{
                                    ...player.card,
                                    value: '2',
                                    size: 'S'
                                }} 
                                onClick={() => {}} 
                            />

                            <PlayingCard card={{
                                    ...player.card,
                                    value: '2',
                                    size: 'M'
                                }} 
                                onClick={() => {}}  
                            />

                            <PlayingCard card={{
                                    ...player.card,
                                    value: '2',
                                    size: 'L'
                                }} 
                                onClick={() => {}} 
                            />

                            <PlayingCard card={{
                                    ...player.card,
                                    value: '2',
                                    size: 'XL'
                                }}  
                                onClick={() => {}} 
                            />

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
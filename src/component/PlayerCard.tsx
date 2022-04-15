import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { Game, OnGameUpdate, updatePlayer } from '../data/Game'
import { Card as DataCard, CardSymbol, CardColor, CardSize } from '../data/Card'
import { Player } from '../data/Player'

import PlayingCard from './PlayingCard'
import PlayingCardIcon from './PlayingCardIcon'
import PlayerAvatar from './PlayerAvatar';

interface Props {
    game: Game
    player: Player    
    updateGame: OnGameUpdate
}

const PlayerCard = ( props: Props ) => {
    const { game, player, updateGame } = props

    const [ name, setName ] = React.useState( player.name )

    if ( !player.number ) {
        return null
    }

    //
    // update helpers
    //

    const updatePlayerName = ( name?: string ) => {
        updateGame( game.id, updatePlayer( player.id, ( player: Player ): Player => {
            player.name = name
            return player
        } ) )
    }
    
    const updatePlayerCard = ( card: DataCard ) => {
        updateGame( game.id, updatePlayer( player.id, ( player: Player ): Player => {
            player.card = card
            return player
        } ) )
    }

    //
    // user events
    //

    const onNameChange = ( e: any ) => {
        setName( e.target.value )
    }

    const onNameBlur = () => {
        updatePlayerName( name )
    }

    const onSymbolChange = (symbol: CardSymbol) => {
        updatePlayerCard( {
            ...player.card,
            symbol: symbol
        } )
    }

    const onColorChange = (color: CardColor) => {
        updatePlayerCard( {
            ...player.card,
            color: color
        } )
    }

    return (
        <Card variant="outlined">
            <CardContent>

            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PlayerAvatar number={player.number} size="L"/>
                        <TextField id="standard-basic" style={{ marginLeft: '10px' }} label="Name" variant="standard" value={name} onChange={onNameChange} onBlur={onNameBlur} />
                    </Box>                    
                </Grid>

                <Grid item xs={3} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <PlayingCard card={{
                            ...player.card,
                            value: `${player.number % 10}`,
                            size: CardSize.L,
                        }} 
                        onClick={() => {}} 
                    />
                </Grid>

                <Grid item xs={9} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                    <Grid container spacing={2}>

                        {/* colors */}

                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        
                            {
                                Object.keys(CardColor).map( key => { 
                                    const newColor = key as CardColor
                                    return (
                                        <div 
                                            key={newColor} 
                                            style={{ width: '100%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                            className={player.card.color == newColor ? 'selected' : 'selectable'} 
                                            onClick={() => onColorChange(newColor)}
                                        >
                                            <PlayingCardIcon 
                                                symbol={CardSymbol.CIRCLE}
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
                                Object.keys(CardSymbol).map( key => { 
                                    const newSymbol = key as CardSymbol
                                    return (
                                        <div 
                                            key={newSymbol} 
                                            style={{ width: '100%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            className={player.card.symbol == newSymbol ? 'selected' : 'selectable'} 
                                            onClick={() => onSymbolChange(newSymbol)}
                                        >
                                            <PlayingCardIcon 
                                                symbol={newSymbol}
                                                color={CardColor.GRAY}
                                            />
                                        </div>
                                    )
                                } )
                            }

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

            </CardContent>
        </Card>
    )
}

export default PlayerCard
import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { Game, OnGameUpdate, updatePlayer } from '../data/Game'
import { Card as DataCard, CardSymbol, CardColor, CardSize, DefaultCards } from '../data/Card'
import { Player } from '../data/Player'

import PlayingCard from './PlayingCard'
import PlayingCardIcon from './PlayingCardIcon'
import PlayerAvatar from './PlayerAvatar';
import { Typography } from '@mui/material'

interface Props {
    game: Game
    player: Player    
    updateGame: OnGameUpdate
}

const PlayerCard = ( props: Props ) => {
    const { game, player, updateGame } = props

    const [ name, setName ] = React.useState( player.name )
    const [ open, setOpen ] = React.useState( false )
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    if ( !player.number ) {
        return null
    }

    //
    // update helpers
    //

    const updatePlayerName = ( name: string ) => {
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

    const onCardChange = (card: Card) => {
        updatePlayerCard( {
            ...player.card,
            color: card.color,
            symbol: card.symbol
        } )
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Card variant="outlined">
            <CardContent>

            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PlayerAvatar number={player.number} size="L"/>
                        <TextField id="standard-basic" style={{ marginLeft: '10px' }} label="Name" variant="standard" value={name} onChange={onNameChange} onBlur={onNameBlur} />
                    </Box> 
                    <PlayingCard card={{
                            ...player.card,
                            value: `${player.number % 10}`,
                            size: CardSize.M,
                        }} 
                        onClick={openModal} 
                    />                   
                </Grid>

                <Modal
                    open={open}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                > 
                    <Box sx={style}>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            
                                <IconButton aria-label="Close" onClick={closeModal}>
                                    <CloseIcon />
                                </IconButton>

                            </Grid>

                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', marginBottom: '30px' }}>
                            
                                <PlayingCard card={{
                                        ...player.card,
                                        value: `${player.number % 10}`,
                                        size: CardSize.XL,
                                    }} 
                                />

                            </Grid>

                            {/* colors */}

                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant='h6'>
                                    Colors
                                </Typography>                                
                            </Grid>

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
                            
                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant='h6'>
                                    Symbol
                                </Typography>                                
                            </Grid>

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

                            {/* symbols */}

                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant='h6'>
                                    Pre-defined
                                </Typography>                                
                            </Grid>

                            <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                                {
                                    DefaultCards.map( defaultCard => {
                                        return (
                                            <PlayingCard card={{
                                                    ...defaultCard,
                                                    value: `${player.number % 10}`,
                                                    size: CardSize.S,
                                                }}
                                                onClick={() => onCardChange(defaultCard)} 
                                            />
                                        )
                                    } )
                                }

                            </Grid>

                        </Grid>
                    </Box>

                </Modal>

            </Grid>

            </CardContent>
        </Card>
    )
}

export default PlayerCard
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
import PlayerAvatar, { AvatarSize } from './PlayerAvatar';
import { Typography } from '@mui/material'
import PlayingCardModal from './PlayingCardModal'
import AvatarModal from './AvatarModal'
import { AvatarId } from '../data/Avatar'

interface Props {
    player: Player 
    avatarSize?: AvatarSize   
    cardSize?: CardSize
    game?: Game
    updateGame?: OnGameUpdate
}

const PlayerCard = ( props: Props ) => {
    const { player, avatarSize, cardSize, game, updateGame } = props

    const [ name, setName ] = React.useState( player.name )
    const editMode = game !== undefined && updateGame !== undefined
    
    const [ playingCardModal, setPlayingCardModal ] = React.useState( false )
    const openPlayingCardModal = () => setPlayingCardModal(true)
    const closePlayingCardModal = () => setPlayingCardModal(false)
    
    const [ avatarModal, setAvatarModal ] = React.useState( false )
    const openAvatarModal = () => setAvatarModal(true)
    const closeAvatarModal = () => setAvatarModal(false)

    if ( !player.number ) {
        return null
    }

    //
    // update helpers
    //

    const updatePlayerName = ( name: string ) => {
        if ( editMode ) {
            updateGame( game.id, updatePlayer( player.id, ( player: Player ): Player => {
                player.name = name
                return player
            } ) )
        }
    }

    const updatePlayerAvatar = ( avatarId: AvatarId ) => {
        if ( editMode ) {
            updateGame( game.id, updatePlayer( player.id, ( player: Player ): Player => {
                player.avatarId = avatarId
                return player
            } ) )
        }
    }
    
    const updatePlayerCard = ( card: DataCard ) => {
        if ( editMode ) {
            updateGame( game.id, updatePlayer( player.id, ( player: Player ): Player => {
                player.card = card
                return player
            } ) )
        }
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

    const onCardChange = (card: DataCard) => {
        updatePlayerCard( {
            ...player.card,
            color: card.color,
            symbol: card.symbol
        } )
    }

    const onAvatarChange = (avatarId: AvatarId) => {
        updatePlayerAvatar( avatarId )
    }

    return (
        <Card variant="outlined">
            <CardContent>

            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PlayerAvatar 
                            id={player.avatarId} 
                            size={avatarSize || AvatarSize.L}
                            onClick={editMode ? openAvatarModal : undefined}
                        />
                        { editMode && <TextField id="standard-basic" style={{ marginLeft: '10px' }} label="Name" variant="standard" value={name} onChange={onNameChange} onBlur={onNameBlur} /> }
                        { !editMode && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px', marginRight: '10px' }}>
                                <Typography><b>Name:</b> {name}</Typography> 
                                <Typography><b>Score:</b> {player.stats.score}</Typography> 
                            </div>                            
                        ) }
                    </Box> 
                    <PlayingCard card={{
                            ...player.card,
                            number: player.number,
                            size: cardSize || CardSize.S,
                        }} 
                        onClick={editMode ? openPlayingCardModal : undefined} 
                    />                   
                </Grid>

                { editMode && (
                    <PlayingCardModal
                        key={}
                        open={playingCardModal}
                        closeModal={closePlayingCardModal}
                        card={{
                            ...player.card,
                            value: `${player.number % 10}`,
                        }}
                        onSymbolChange={onSymbolChange}
                        onColorChange={onColorChange}
                        onCardChange={onCardChange}
                    />
                ) }

                { editMode && (
                    <AvatarModal
                        open={avatarModal}
                        closeModal={closeAvatarModal}
                        avatarId={player.avatarId}
                        onAvatarChange={onAvatarChange}
                    />
                ) }

            </Grid>

            </CardContent>
        </Card>
    )
}

export default PlayerCard
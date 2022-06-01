import React from 'react'

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Card as DataCard, CardColor, CardSize, CardSymbol, DefaultCards } from '../data/Card'
import PlayingCardIcon from './PlayingCardIcon';
import { Box, Grid, Modal, Typography } from '@mui/material';
import PlayingCard from './PlayingCard';

interface Props {
    open: boolean
    closeModal: () => void
    card: DataCard
    onSymbolChange: (symbol: CardSymbol) => void
    onColorChange: (color: CardColor) => void
    onCardChange: (card: DataCard) => void
}

const PlayingCardModal = ( props: Props ) => {
    const { open, closeModal, card, onSymbolChange, onColorChange, onCardChange } = props
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        > 
            <Box sx={style}>
                <Grid container spacing={2} style={{ alignItems: 'flex-end' }}>
                    
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                    <Grid item xs={4} container spacing={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Grid item xs={12} textAlign="left">
                            <Typography>
                                <b>Colors</b>
                            </Typography> 
                        </Grid>

                        {
                            Object.keys(CardColor).filter( key => key as CardColor != CardColor.GRAY ).map( key => { 
                                const newColor = key as CardColor
                                return (
                                    <Grid item xs={4}>
                                        <div 
                                            key={newColor} 
                                            style={{ width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                            className={card.color == newColor ? 'selected' : 'selectable'} 
                                            onClick={() => onColorChange(newColor)}
                                        >
                                            <PlayingCardIcon 
                                                symbol={CardSymbol.CIRCLE}
                                                color={newColor}
                                            />
                                        </div> 
                                    </Grid>
                                )
                            } )
                        }

                    </Grid>

                    <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    
                        <PlayingCard card={{
                                ...card,
                                size: CardSize.XL,
                            }} 
                        />

                    </Grid>

                    {/* symbols */}
                    
                    <Grid item xs={4} container spacing={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                        <Grid item xs={12} textAlign="left">
                            <Typography>
                                <b>Symbols</b>
                            </Typography> 
                        </Grid>

                        {
                            Object.keys(CardSymbol).map( key => { 
                                const newSymbol = key as CardSymbol
                                return (
                                    <Grid item xs={4}>
                                    <div 
                                        key={newSymbol} 
                                        style={{ width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        className={card.symbol == newSymbol ? 'selected' : 'selectable'} 
                                        onClick={() => onSymbolChange(newSymbol)}
                                    >
                                        <PlayingCardIcon 
                                            symbol={newSymbol}
                                            color={CardColor.GRAY}
                                        />
                                    </div>                                                
                                    </Grid>
                                )
                            } )
                        }

                    </Grid>

                    {/* symbols */}

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Typography>
                            <b>Pre-defined</b>
                        </Typography>                                
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                        {
                            DefaultCards.map( defaultCard => {
                                return (
                                    <PlayingCard card={{
                                            ...defaultCard,
                                            number: card.number,
                                            size: CardSize.XS,
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
    )
}

export default PlayingCardModal
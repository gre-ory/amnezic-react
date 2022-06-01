import React from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Card, CardSize } from '../data/Card'
import PlayingCardIcon from './PlayingCardIcon';

interface Props {
    card?: Card
    cardSize?: CardSize
    selected?: boolean
    disabled?: boolean
    onClick?: () => void    
}

const PlayingCard = ( props: Props ) => {
    const { card, cardSize, selected, disabled, onClick } = props

    if ( card == undefined ) {
        return (
            <div className={`card size-${cardSize} card--empty`} onClick={onClick}>
                <div className="card--header">
                    <div className="card--symbol"> </div>                
                </div>
                <div className="card--content">
                    <div className="card--value"> </div>
                    <div className="card--symbol"> </div>
                </div>
                <div className="card--footer">
                    <div className="card--symbol"> </div>
                </div>
            </div>
        )
    }

    let cardClassNames = `card`
    if ( card.size ) {
        cardClassNames = `${cardClassNames} size-${card.size}`
    }
    if ( disabled ) {
        cardClassNames = `${cardClassNames} disabled`
    }
    if ( selected ) {
        cardClassNames = `${cardClassNames} selected`
    }
    if ( onClick ) {
        cardClassNames = `${cardClassNames} selectable`
    }

    return (
        <div className={cardClassNames} onClick={onClick}>
            <div className="card--header">
                <div className="card--symbol">
                    <PlayingCardIcon symbol={card.symbol} color={card.color}/>
                </div>                
            </div>
            <div className="card--content">
                <div className="card--value">
                    {card.number ? `${card.number % 10}` : card.value}
                </div>
                <div className="card--symbol">
                    <PlayingCardIcon symbol={card.symbol} color={card.color}/>
                </div>
            </div>
            <div className="card--footer">
                <div className="card--symbol">
                    <PlayingCardIcon symbol={card.symbol} color={card.color}/>
                </div>
            </div>
        </div>
    )
}

export default PlayingCard
import React from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Card } from '../data/Card'
import PlayingCardIcon from './PlayingCardIcon';

interface Props {
    card: Card
    selected?: boolean
    onClick?: () => void    
}

const PlayingCard = ( props: Props ) => {
    const { card, selected, onClick } = props

    if ( card == undefined ) {
        return null
    }

    let cardClassNames = `card`
    if ( card.size ) {
        cardClassNames = `${cardClassNames} size-${card.size}`
    }
    let selectClassNames = `card--inside`
    if ( selected ) {
        selectClassNames = `${selectClassNames} selected`
    }
    if ( onClick ) {
        selectClassNames = `${selectClassNames} selectable`
    }

    return (
        <div className={cardClassNames} onClick={onClick}>
            <div className={selectClassNames}>
                <div className="card--header">
                    <div className="card--symbol">
                        <PlayingCardIcon symbol={card.symbol} color={card.color}/>
                    </div>                
                </div>
                <div className="card--content">
                    <div className="card--value">
                        {card.value}
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
        </div>
    )
}

export default PlayingCard
import React from 'react'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Card } from '../data/Card'

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

    let classNames = `card`
    classNames = `${classNames} card--${card.symbol}`
    classNames = `${classNames} card--${card.shape}`
    classNames = `${classNames} card--${card.color}`
    if ( card.size ) {
        classNames = `${classNames} card--${card.size}`
    }
    if ( selected ) {
        classNames = `${classNames} card--selected`
    }

    // const [ symbol, setSymbol ] = React.useState( card.symbol )
    // const [ color, setColor ] = React.useState( card.color )
    // const [ size, setSize ] = React.useState( card.size )

    return (
        <div className={classNames} onClick={onClick}>
            {card.value && <div>{card.value}</div>}
        </div>
    )
}

export default PlayingCard
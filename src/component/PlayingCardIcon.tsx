import React from 'react'
import Typography from '@mui/material/Typography';

import { Card, CardColor, CardSymbol } from '../data/Card'
import ClubIcon from './icon/ClubIcon';
import DiamondIcon from './icon/DiamondIcon';
import CircleIcon from './icon/CircleIcon';
import HeartIcon from './icon/HeartIcon';
import SpadeIcon from './icon/SpadeIcon';
import SquareIcon from './icon/SquareIcon';
import StarIcon from './icon/StarIcon';
import TriangleIcon from './icon/TriangleIcon';
import CrossIcon from './icon/CrossIcon';

interface Props {
    symbol: CardSymbol
    color: CardColor
    onClick?: () => void
}

const PlayingCardIcon = ( props: Props ) => {

    const { symbol, color, onClick } = props

    switch ( symbol ) {
        case CardSymbol.CLUB:
            return <ClubIcon color={color} onClick={onClick} />
        case CardSymbol.CROSS:
            return <CrossIcon color={color} onClick={onClick} />
        case CardSymbol.DIAMOND:
            return <DiamondIcon color={color} onClick={onClick} />
        case CardSymbol.CIRCLE:
            return <CircleIcon color={color} onClick={onClick} />
        case CardSymbol.HEART:
            return <HeartIcon color={color} onClick={onClick} />
        case CardSymbol.SPADE:
            return <SpadeIcon color={color} onClick={onClick} />
        case CardSymbol.SQUARE:
            return <SquareIcon color={color} onClick={onClick} />
        case CardSymbol.STAR:
            return <StarIcon color={color} onClick={onClick} />
        case CardSymbol.TRIANGLE:
            return <TriangleIcon color={color} onClick={onClick} />
        default:
            return null
    }
}

export default PlayingCardIcon
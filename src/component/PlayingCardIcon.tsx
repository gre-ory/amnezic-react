import React from 'react'
import Typography from '@mui/material/Typography';

import { Card, CardColor, CardSymbol } from '../data/Card'
import ClubIcon from './icon/ClubIcon';
import DiamondIcon from './icon/DiamondIcon';
import DotIcon from './icon/DotIcon';
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
        case 'club':
            return <ClubIcon color={color} onClick={onClick} />
        case 'cross':
            return <CrossIcon color={color} onClick={onClick} />
        case 'diamond':
            return <DiamondIcon color={color} onClick={onClick} />
        case 'dot':
            return <DotIcon color={color} onClick={onClick} />
        case 'heart':
            return <HeartIcon color={color} onClick={onClick} />
        case 'spade':
            return <SpadeIcon color={color} onClick={onClick} />
        case 'square':
            return <SquareIcon color={color} onClick={onClick} />
        case 'star':
            return <StarIcon color={color} onClick={onClick} />
        case 'triangle':
            return <TriangleIcon color={color} onClick={onClick} />
        default:
            return null
    }
}

export default PlayingCardIcon
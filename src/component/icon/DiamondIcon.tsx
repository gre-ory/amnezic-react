import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor  
    onClick?: () => void 
}

const DiamondIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M10 20C13 15 15 13 19 10 15 7 13 5 10 0 7 5 5 7 1 10 5 13 7 15 10 20z"/>
        </svg>
    )
}

export default DiamondIcon

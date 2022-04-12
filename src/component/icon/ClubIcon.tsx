import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const ClubIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M2 12C2 16 6 17 9 14 8 18 8 18 5 20H15C12 18 12 18 11 14 15 17 18 15 18 12 18 7 14 7 12 9 14 7 15 2 10 2 5 2 6 7 8 9 6 7 2 7 2 12z"/>
        </svg>
    )
}

export default ClubIcon

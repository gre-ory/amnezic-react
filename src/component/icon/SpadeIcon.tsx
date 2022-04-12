import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const SpadeIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M2 11C2 15 6 17 9 14 8 18 8 18 5 20H15C12 18 12 18 11 14 14 17 18 15 18 11 18 7 12 7 10.023.039 8 7 2 7 2 11z"/>
        </svg>
    )
}

export default SpadeIcon

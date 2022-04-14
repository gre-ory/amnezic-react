import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const SquareIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color.toLowerCase()}`} onClick={onClick}>
            <path d="M10 19 19 19 19 1 1 1 1 19z"/>
        </svg>
    )
}

export default SquareIcon

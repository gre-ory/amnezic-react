import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const SquareIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M10 20C20 20 20 20 20 10 20 0 20 0 10 0 0 0 0 0 0 10 0 20 0 20 10 20z"/>
        </svg>
    )
}

export default SquareIcon

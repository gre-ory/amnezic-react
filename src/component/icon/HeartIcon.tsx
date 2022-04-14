import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const HeartIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color.toLowerCase()}`} onClick={onClick}>
            <path d="M10 20C13 15 19 12 19 8 19 2 12 0 10 6 8 0 1 2 1 8 1 12 7 15 10 20z"/>
        </svg>
    )
}

export default HeartIcon

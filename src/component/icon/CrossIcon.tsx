import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const CrossIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color.toLowerCase()}`} onClick={onClick}>
            <path d="M1 16 4 19 10 13 16 19 19 16 13 10 19 4 16 1 10 7 4 1 1 4 7 10z"/>
        </svg>
    )
}

export default CrossIcon

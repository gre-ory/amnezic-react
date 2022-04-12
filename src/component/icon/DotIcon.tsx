import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor  
    onClick?: () => void 
}

const DotIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M10 19C15 19 19 15 19 10 19 5 15 1 10 1 5 1 1 5 .991 9.99 1 15 5 19 10 19z"/>
        </svg>
    )
}

export default DotIcon

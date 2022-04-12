import React from 'react'
import { CardColor } from '../../data/Card'

interface Props {
    color: CardColor 
    onClick?: () => void 
}

const StarIcon = ( props: Props ) => {
    const { color, onClick } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`icon color-${color}`} onClick={onClick}>
            <path d="M9.99.991 12.751 7.04 17.992 7.003 13.953 11.399 15.588 18.03 10.027 14.705 4.316 18.011 5.97 11.493 1.931 7.003 7.472 7.022 10.008.991z"/>
        </svg>
    )
}

export default StarIcon

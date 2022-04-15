import React from 'react'

import { PlayerId } from '../data/Player'

interface Props {
    number: number
    size: AvatarSize
}

export type AvatarSize = 
  | 'XS' 
  | 'S' 
  | 'M' 
  | 'L' 
  | 'XL'

const PlayerAvatar = ( props: Props ) => {
    const { number, size } = props

    return (
        <span className={`avatar avatar-${size} avatar-${number}`}></span>
    )
}

export default PlayerAvatar

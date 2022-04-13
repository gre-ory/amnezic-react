import React from 'react'

interface Props {
    id: number
    size: AvatarSize
}

export type AvatarSize = 
  | 'XS' 
  | 'S' 
  | 'M' 
  | 'L' 
  | 'XL'

const PlayerAvatar = ( props: Props ) => {
    const { id, size } = props

    return (
        <span className={`avatar avatar-${size} avatar-${id}`}></span>
    )
}

export default PlayerAvatar

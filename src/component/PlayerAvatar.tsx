import React from 'react'
import { AvatarId } from '../data/Avatar'

import { PlayerId } from '../data/Player'

interface Props {
    id: AvatarId
    size: AvatarSize
    disabled?: boolean
    selected?: boolean
    onClick?: () => void
}

export enum AvatarSize {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

const PlayerAvatar = ( props: Props ) => {
    const { id, size, disabled, selected, onClick } = props

    let avatarClassNames = `avatar`
    avatarClassNames = `${avatarClassNames} avatar-${id}`
    avatarClassNames = `${avatarClassNames} avatar-${size}`    
    if ( disabled ) {
        avatarClassNames = `${avatarClassNames} disabled`
    }
    if ( selected ) {
        avatarClassNames = `${avatarClassNames} selected`
    }
    if ( onClick ) {
        avatarClassNames = `${avatarClassNames} selectable`
    }

    return (
        <div className={avatarClassNames} onClick={onClick}></div>
    )
}

export default PlayerAvatar

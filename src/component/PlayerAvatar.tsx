import React from 'react'

import { PlayerId } from '../data/Player'

interface Props {
    number: number
    size: AvatarSize
}

export enum AvatarSize {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

const PlayerAvatar = ( props: Props ) => {
    const { number, size } = props

    return (
        <div className={`avatar avatar-${size} avatar-${number}`}></div>
    )
}

export default PlayerAvatar

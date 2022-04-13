import React from 'react'

import { Game } from '../data/Game'
import { PageLabel } from '../data/Page'

import Header from './Header'
import Footer from './Footer'

interface Props {
    label: PageLabel
    game?: Game
    updateGame?: ( game: Game ) => void
    children: any
}

const Page = ( props: Props ) => {
    const { label, game, updateGame, children } = props

    return (
        <div className={`page page-${label}`}>
            <Header label={label} game={game} updateGame={updateGame} />
            {children}
            <Footer />
        </div>
    )
}

export default Page
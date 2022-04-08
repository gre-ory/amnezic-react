import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import Header from '../component/Header'
import Footer from '../component/Footer'

import { Game, selectGame } from '../data/Game'
import { toGamePage } from '../data/Util'
import { PageLabel } from '../data/PageLabel'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const current: PageLabel = 'end'

const EndPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()

    const navigate = useNavigate()

    const game = selectGame( games, gameId || '' )

    React.useEffect( () => { 
        if ( !game || game.page != current ) {
            console.log('[effect] page=`${game.page}`')
            navigate( toGamePage( game ), { replace: true } )
        }
    }, [ game ] )
    
    if ( !game ) {
        return null
    }

    return (
        <>
            <Header label="end" game={game} updateGame={updateGame} />
            <div className="page page-end">
                end
            </div>
            <Footer />
        </>
    )
}

export default EndPage
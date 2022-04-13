import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import Page from '../component/Page'

import { Game, selectGame } from '../data/Game'
import { toGamePage } from '../data/Util'
import { PageLabel } from '../data/Page'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const current: PageLabel = 'scores'

const ScoresPage = ( props: Props ) => {
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
        <Page label="scores" game={game} updateGame={updateGame}>
            scores
        </Page>
    )
}

export default ScoresPage
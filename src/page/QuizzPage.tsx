import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import Header from '../component/Header'
import Footer from '../component/Footer'

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Game, selectGame } from '../data/Game'
import { toGamePage } from '../data/Util'
import { PageLabel } from '../data/PageLabel'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const current: PageLabel = 'quizz'

const QuizzPage = ( props: Props ) => {
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
            <Header label="quizz" game={game} updateGame={updateGame} />
            <div className="page page-quizz">
                <IconButton aria-label="Start" href="/quizz/1">
                    <PlayArrowIcon />
                </IconButton>
            </div>
            <Footer />
        </>                
    )
}

export default QuizzPage
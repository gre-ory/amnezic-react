import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStep } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'

import Header from './Header'
import Footer from './Footer'

interface Props {
    gameStep: GameStep
    game: Game
    updateGame: ( gameId: string, update: ( game: Game ) => Game ) => void
    onNext?: () => void
    children: any
}

const GamePage = ( props: Props ) => {
    const { gameStep, game, updateGame, onNext, children } = props

    const navigate = useNavigate()
    
    React.useEffect( () => { 
        if ( game.step !== gameStep ) {
            console.log(`[effect] INVALID game step! ( current step: ${gameStep}, game step: ${game.step} )>>> NAVIGATE`)
            navigate( toGamePage( game ), { replace: true } )    
        }
    }, [ game ] )
    
    return (
        <>
            <div className={`page step-${gameStep.toLowerCase()}`}>
                <Header gameStep={gameStep} game={game} updateGame={updateGame} onNext={onNext}/>
                {children}
                <Footer />
            </div>
            <pre style={{ border: '1px solid #999', background: '#eee', padding: '20px' }}>{JSON.stringify(game,undefined,4)}</pre>
        </>
    )
}

export default GamePage
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStep } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'

import GameHeader from './GameHeader'
import GameFooter from './GameFooter'
import { DEBUG } from '../data/Constants'

interface Props {
    title?: string
    step: GameStep
    game: Game
    updateGame: ( gameId: string, update: ( game: Game ) => Game ) => void
    onPrevious?: () => void
    onNext?: () => void
    children: any
}

const GamePage = ( props: Props ) => {
    const { title, step, game, updateGame, onPrevious, onNext, children } = props

    const navigate = useNavigate()
    
    React.useEffect( () => { 
        if ( game.step !== step ) {
            console.log(`[effect] INVALID game step! ( current step: ${step}, game step: ${game.step} )>>> NAVIGATE`)
            navigate( toGamePage( game ), { replace: true } )    
        }
    }, [ game ] )
    
    return (
        <>
            <div className={`game-page step-${step.toLowerCase()}`}>
                <GameHeader title={title} step={step} game={game} updateGame={updateGame} onPrevious={onPrevious} onNext={onNext}/>
                {children}
                <GameFooter />
            </div>
            {DEBUG && <pre style={{ border: '1px solid #999', background: '#eee', padding: '20px' }}>{JSON.stringify(game,undefined,4)}</pre>}
        </>
    )
}

export default GamePage
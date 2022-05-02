import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import ReplayButton from '../component/ReplayButton'

import GamePage from '../component/GamePage'

import { Game, GameStep, OnGameUpdate, OnStep, selectGame, newGame } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
    addGame: ( game: Game ) => void
}

const ScoresPage = ( props: Props ) => {
    const { games, updateGame, addGame } = props

    const navigate = useNavigate()

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    
    React.useEffect( () => { 
        if ( !game ) {
            console.log(`[effect] MISSING game! >>> NAVIGATE home`)
            navigate( toHomePage() )    
        }
    }, [ game ] )
    
    if ( !game ) {
        return null
    }

    const restartNewGame = () => {
        const game = newGame()
        addGame( game )
        navigate( toGamePage( game ) )
    }

    const onNext = () => {   
        if ( game.ended ) {
            restartNewGame()
        } else {
            updateGame( game.id, OnStep( GameStep.QUIZZ ) )
        }        
    }

    return (
        <GamePage gameStep={GameStep.SCORES} game={game} updateGame={updateGame} onNext={onNext}>
            <div>
                scores
            </div>            
            {game.ended && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                    <ReplayButton title="Start Game" onClick={restartNewGame}/>
                </div>
            )}
        </GamePage>
    )
}

export default ScoresPage
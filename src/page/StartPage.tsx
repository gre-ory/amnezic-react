import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import GamePage from '../component/GamePage'

import { Game, GameStep, OnGameUpdate, onStartGame, selectGame } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'
import NextButton from '../component/NextButton'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const StartPage = ( props: Props ) => {
    const { games, updateGame } = props

    const navigate = useNavigate() 
    
    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    
    React.useEffect( () => { 
        if ( !game ) {
            console.log(`[effect] MISSING game! >>> NAVIGATE home`)
            navigate( toHomePage() )    
        } else if ( game.questionNumber ) {
            console.log(`[effect] NAVIGATE to question #${game.questionNumber}`)
            navigate( toGamePage( game ) )    
        }
    }, [ game ] ) 
    
    if ( !game ) {
        return null
    }   

    const onNext = () => {
        updateGame( game.id, onStartGame )
    }

    return (
        <GamePage gameStep={GameStep.QUIZZ} game={game} updateGame={updateGame} onNext={onNext}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                <NextButton title="Start Game" onNext={onNext}/>
            </div>
        </GamePage>                
    )
}

export default StartPage
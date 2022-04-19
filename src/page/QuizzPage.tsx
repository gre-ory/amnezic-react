import React from 'react'
import { useParams } from "react-router"

import GamePage from '../component/GamePage'

import { Game, GameStep, OnGameUpdate, onStartGame, selectGame } from '../data/Game'
import NextButton from '../component/NextButton'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const QuizzPage = ( props: Props ) => {
    const { games, updateGame } = props 
    
    const { gameId } = useParams()
    const game = selectGame( games, gameId )
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

export default QuizzPage
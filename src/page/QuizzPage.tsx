import React from 'react'
import { useParams } from "react-router"

import GamePage from '../component/GamePage'

import { Game, GameStep, selectGame } from '../data/Game'
import NextButton from '../component/NextButton'

interface Props {
    games: Game[]
    updateGame: ( game: Game ) => void
}

const QuizzPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    const onNextStep = () => {
        game.questionId = game.questions[0].id
        updateGame( game )
    }

    return (
        <GamePage gameStep={GameStep.QUIZZ} game={game} updateGame={updateGame}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                <NextButton title="Start Game" onClick={onNextStep}/>
            </div>
        </GamePage>                
    )
}

export default QuizzPage
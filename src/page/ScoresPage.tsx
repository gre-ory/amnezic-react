import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import GamePage from '../component/GamePage'

import { Game, GameStep, OnGameUpdate, selectGame } from '../data/Game'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const ScoresPage = ( props: Props ) => {
    const { games, updateGame } = props

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    return (
        <GamePage gameStep={GameStep.SCORES} game={game} updateGame={updateGame}>
            scores
        </GamePage>
    )
}

export default ScoresPage
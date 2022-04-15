import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import GamePage from '../component/GamePage'
import ReplayButton from '../component/ReplayButton'

import { Game, GameStep, OnGameUpdate, selectGame, newGame } from '../data/Game'
import { toGamePage } from '../data/Navigate'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
    addGame: ( game: Game ) => void
}

const EndPage = ( props: Props ) => {
    const { games, updateGame, addGame } = props

    const navigate = useNavigate()

    const { gameId } = useParams()
    const game = selectGame( games, gameId )
    if ( !game ) {
        return null
    }

    const onStartGame = () => {
        const game = newGame()
        addGame( game )
        navigate( toGamePage( game ) )
    }

    return (
        <GamePage gameStep={GameStep.END} game={game} updateGame={updateGame}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                <ReplayButton title="Start Game" onClick={onStartGame}/>
            </div>
        </GamePage>
    )
}

export default EndPage
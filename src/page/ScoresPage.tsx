import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import ReplayButton from '../component/ReplayButton'

import GamePage from '../component/GamePage'

import { Game, GameStep, OnGameUpdate, OnStep, selectGame, newGame } from '../data/Game'
import { toHomePage, toGamePage } from '../data/Navigate'
import { Grid } from '@mui/material'
import PlayerScoreCard from '../component/PlayerScoreCard'
import { Player } from '../data/Player'

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
            navigate( toHomePage() )
        } else {
            updateGame( game.id, OnStep( GameStep.QUIZZ ) )
        }        
    }

    //
    // sort players by score
    //
     
    const sortedPlayers = [ ...game.players ].sort( ( left: Player, right: Player ): number => {
        return right.stats.score - left.stats.score
    } )

    let previousPosition: number | undefined = undefined
    let previousScore: number | undefined = undefined

    return (
        <GamePage gameStep={GameStep.SCORES} game={game} updateGame={updateGame} onNext={onNext}>

            <Grid container spacing={2}>

                {
                    (
                        <>
                            {sortedPlayers.map( ( player, index ) => {
                                
                                let position = 1                                
                                if ( previousPosition !== undefined && previousScore !== undefined ) {
                                    if ( previousScore > player.stats.score ) {
                                        position = previousPosition + 1
                                    } else {
                                        position = previousPosition
                                    }
                                }
                                previousScore = player.stats.score
                                previousPosition = position

                                return (
                                    <Grid key={player.id} item xs={6} textAlign="left">
                                        <PlayerScoreCard
                                            game={game}
                                            player={player}
                                            position={position}
                                        />
                                    </Grid>
                                )
                            })}                        
                        </>
                    )
                }

            </Grid>            
            {game.ended && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px' }}>
                    <ReplayButton title="Start Game" onClick={restartNewGame}/>
                </div>
            )}
        </GamePage>
    )
}

export default ScoresPage
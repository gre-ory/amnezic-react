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
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTooltip, VictoryGroup, VictoryVoronoiContainer, VictoryLegend } from 'victory'
import { computeVizualiationScoreData } from '../data/PlayerStats'
import PlayerAvatar, { AvatarSize } from '../component/PlayerAvatar'

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

    const colorScale: string[] = [ 
        "#f29e4c",
        "#f1c453",
        "#efea5a",
        "#b9e769", 
        "#83e377", 
        "#16db93", 
        "#0db39e", 
        "#048ba8", 
        "#2c699a", 
        "#54478c" 
    ]
    const medalColorScale: string[] = [ 
        "gold",
        "grey",
        "brown" 
    ]

    return (
        <GamePage gameStep={GameStep.SCORES} game={game} updateGame={updateGame} onNext={onNext}>

            <Grid container spacing={2}>

                {/* players */}

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
                                    <Grid key={player.id} item xs={12} textAlign="left">
                                        <PlayerScoreCard
                                            game={game}
                                            player={player}
                                            position={position}
                                            color={colorScale[index % colorScale.length]}
                                            medalColor={position-1 < medalColorScale.length ? medalColorScale[position-1] : undefined}
                                        />
                                    </Grid>
                                )
                            })}                        
                        </>
                    )
                }

                {/* graph */}

                <VictoryChart height={390}> 

                    {sortedPlayers.map( ( player, index ) => {
                        const data = computeVizualiationScoreData( player.stats )
                        const color = colorScale[index % colorScale.length]
                        return (

                            <VictoryGroup
                                key={`player-graph-${player.id}`}
                                color={color}
                                labels={({ datum }) => `#${index+1} - ${player.name}: ${datum.tooltip}`}
                                labelComponent={
                                    <VictoryTooltip
                                        style={{ fontSize: 10 }}
                                    />
                                }
                                data={data}
                            >
                                <VictoryLine/>
                                <VictoryScatter
                                    size={3}
                                    style={{ data: { fill: color } }}
                                />
                            </VictoryGroup>
                        )
                    })}

                </VictoryChart>

            </Grid> 
            
        </GamePage>
    )
}

export default ScoresPage
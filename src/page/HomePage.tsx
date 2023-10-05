import React from 'react'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Game, GameId, GameStep, newGame, OnGameUpdate } from '../data/Game'
import { toGamePage, toAdminThemesPage } from '../data/Navigate'

import Page from '../component/Page'
import GameCard from '../component/GameCard'
import NextButton from '../component/NextButton'
import AdminButton from '../component/AdminButton'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

interface Props {
    games: Game[]
    addGame: ( game: Game ) => void
    updateGame: OnGameUpdate
    deleteGames: ( gameIds: GameId[] ) => void
}

const HomePage = ( props: Props ) => {
    const { games, addGame, updateGame, deleteGames } = props

    const navigate = useNavigate()

    // update helpers

    const toThemes = () => {
        console.log( `[to-themes]` )
        navigate( toAdminThemesPage() )
    }

    const startGame = () => {
        console.log( `[start-game]` )
        const game = newGame()
        addGame( game )
        navigate( toGamePage( game ) )
    }

    const resumeGame = ( game: Game ) => {
        console.log( `[resume-game] ${game.id}` )
        updateGame( game.id, ( game: Game ) => {
            game.updated = Date.now()
            if ( game.ended ) {
                game.step = GameStep.SCORES    
            } else if ( game.started ) {                
                game.step = GameStep.QUIZZ
            }            
            return game
        } )
        navigate( toGamePage( game ) )
    }

    const deleteGame = ( game: Game ) => {
        deleteGames( [ game.id ] )
    }

    const deleteAllGames = () => {
        var allGameIds: GameId[] = []
        for ( const game of games ) {
            allGameIds.push( game.id )
        }
        deleteGames( allGameIds )
    }

    //
    // clean old games
    //

    React.useEffect( () => {
        var oldGameIds: GameId[] = []
        for ( const game of games ) {
            if ( game.ended ) {
                const delta = Date.now() - game.updated
                if ( delta > /* 30 days */ 30 * 24 * 60 * 60 * 1000 ) {
                    oldGameIds.push( game.id )
                }
            }
        }
        if ( oldGameIds.length > 0 ) {
            deleteGames( oldGameIds )
        }
    }, [] )

    //
    // sort games
    //

    const sortedGames = [ ...games ].sort( ( left: Game, right: Game ): number => {
        return right.updated - left.updated
    } )

    return (
        <Page title="Amnezic" onNext={startGame}>
            

            {/* new game */}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '200px' }}>
                <NextButton title="New Game" onNext={startGame}/>
            </div>

            {/* prevous game */}

            <Accordion>
                
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    Previous games
                </AccordionSummary>
                
                <AccordionDetails>
                    
                    <Grid container spacing={2}>

                        {
                            (
                                <>
                                    {sortedGames.map( game => {
                                        return (
                                            <Grid key={game.id} item xs={12} textAlign="left">
                                                <GameCard
                                                    game={game}
                                                    resumeGame={resumeGame}
                                                    deleteGame={deleteGame}
                                                />
                                            </Grid>
                                        )
                                    })}                        
                                </>
                            )
                        }

                        <Grid item xs={12} textAlign="right">

                            {/* clear previous games */}

                            <IconButton
                                title="Delete all games" 
                                color="default" 
                                disabled={games.length == 0} 
                                onClick={deleteAllGames}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Grid>

                    </Grid>

                </AccordionDetails>
                
            </Accordion>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AdminButton title="Themes" onNext={toThemes}/>
            </div>

        </Page>
    )
}

export default HomePage
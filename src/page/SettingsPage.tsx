import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PersonIcon from '@mui/icons-material/Person'
import QuizIcon from '@mui/icons-material/Quiz'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'

import GamePage from '../component/GamePage'
import PlaylistCard from '../component/PlaylistCard'
import LanguageChip from '../component/LanguageChip'

import { Settings } from '../data/Settings'
import { Game, GameStep, OnGameUpdate, selectGame, updateSettings, onSetUp, isLegacyGame, isStoreGame, isDeezerGame } from '../data/Game'
import { Playlist } from '../data/Playlist'
import { ThemeInfo } from '../data/ThemeInfo'
import { Language, Category, categoryToLabel, languageToLabel } from '../data/ThemeLabels'
import { toHomePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'
import { INCREMENT_NB_ANSWER_PER_QUESTION, INCREMENT_NB_PLAYER, INCREMENT_NB_QUESTION, MAX_NB_ANSWER_PER_QUESTION, MAX_NB_PLAYER, MAX_NB_QUESTION, MIN_NB_ANSWER_PER_QUESTION, MIN_NB_PLAYER, MIN_NB_QUESTION } from '../data/Constants'
import { FetchThemes } from '../client/FetchThemes'
import { NoiseControlOff } from '@mui/icons-material'

interface Props {
    games: Game[]
    updateGame: OnGameUpdate
}

const SettingsPage = ( props: Props ) => {
    const { games, updateGame } = props
    
    const [ themes, SetThemes ] = React.useState<ThemeInfo[]>()
    const [ loading, SetLoading ] = React.useState<boolean>(false)

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

    const isLegacy = isLegacyGame( game )
    const isStore = isStoreGame( game )
    const isDeezer = isDeezerGame( game )


    // current state

    const settings = game.settings

    const nbPlayer = settings.nbPlayer
    const nbPlayerIncrement = INCREMENT_NB_PLAYER
    const lessPlayerDisabled = nbPlayer <= MIN_NB_PLAYER
    const morePlayerDisabled = nbPlayer >= MAX_NB_PLAYER

    const nbQuestion = settings.nbQuestion
    const nbQuestionIncrement = INCREMENT_NB_QUESTION
    const lessQuestionDisabled = nbQuestion <= MIN_NB_QUESTION
    const moreQuestionDisabled = nbQuestion >= MAX_NB_QUESTION

    const nbAnswer = settings.nbAnswer
    const nbAnswerIncrement = INCREMENT_NB_ANSWER_PER_QUESTION
    const lessAnswerDisabled = nbAnswer <= MIN_NB_ANSWER_PER_QUESTION
    const moreAnswerDisabled = nbAnswer >= MAX_NB_ANSWER_PER_QUESTION

    // update helpers

    const updateNbPlayer = ( nbPlayer: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbPlayer = nbPlayer
            return settings 
        } ) )
    }

    const updateNbQuestion = ( nbQuestion: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbQuestion = nbQuestion
            return settings 
        } ) )
    }

    const updateNbAnswer = ( nbAnswer: number ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.nbAnswer = nbAnswer
            return settings 
        } ) )
    }

    type ThemeIdsUpdater = ( themeIds: Set<number> ) => Set<number>

    const updateThemeIds = ( updater: ThemeIdsUpdater ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            let themeIds = new Set<number>()
            const allIds = selectIds(matchAll)
            if ( settings.themeIds === undefined ) {
                for ( const id of allIds ) {
                    themeIds.add( id )                
                }
            } else {
                for ( const id of settings.themeIds ) {
                    themeIds.add( id )
                }
            }
            themeIds = updater(themeIds)
            if ( themeIds.size === allIds.length ) {
                return { ...settings, themeIds: undefined }
            }
            return { ...settings, themeIds: Array.from(themeIds.values()) }
        } ) )
    }

    const addThemeIds = (ids:number[]) => {
        updateThemeIds(( themeIds: Set<number> ):Set<number> => {
            for ( const id of ids ) {
                themeIds.add( id )
            }
            return themeIds
        })
    }

    const removeThemeIds = (ids:number[]) => {
        updateThemeIds(( themeIds: Set<number> ):Set<number> => {
            for ( const id of ids ) {
                themeIds.delete( id )
            }
            return themeIds
        })
    }

    const onPlaylist = ( playlist?: Playlist ) => {
        updateGame( game.id, updateSettings( ( settings: Settings ) => {
            settings.playlist = playlist
            return settings 
        } ) )
    }

    const canNext = (): boolean => {
        // validate settings
        if ( !game ) {
            return false
        }
        if ( !game.settings ) {
            return false
        }
        if ( isDeezer ) {
            if ( !game.settings.playlist ) {
                return false
            }
            if ( !game.settings.playlist.deezerId ) {
                return false
            }
        }
        if ( isStore ) {
            if ( game.settings.themeIds !== undefined && game.settings.themeIds.length === 0 ) {
                return false
            }
        }
        return true
    }

    const onNext = () => {
        updateGame( game.id, onSetUp )
    }

    // themes

    React.useEffect( () => { 
        if ( isStore ) {
            SetLoading(true)
            FetchThemes()
                .then( themes => SetThemes( themes ) )
                .catch( err => console.log( err ) )
                .finally( () => SetLoading(false) )
        }
    }, [ isStore ] )

    const categories = new Set<Category | undefined>();
    const languages = new Set<Language>();

    for ( const theme of themes || [] ) {
        const category = theme.labels.category
        if ( category !== undefined ) {
            categories.add( category )
        }
        const language = theme.labels.language
        if ( language !== undefined ) {
            languages.add( language )
        }
    }
    categories.add( undefined )

    type ThemeFilter = ( theme: ThemeInfo ) => boolean

    const matchAll: ThemeFilter = ( theme: ThemeInfo ): boolean => {
        return true
    }

    const matchCategory = ( category?: Category ): ThemeFilter => {
        return ( theme: ThemeInfo ) => {
            if ( category === undefined ) {
                return theme.labels.category === undefined
            }
            return theme.labels.category === category
        }
    }

    const matchLanguage = ( language?: Language ): ThemeFilter => {
        return ( theme: ThemeInfo ) => {
            if ( language === undefined ) {
                return theme.labels.language === undefined
            }
            return theme.labels.language === language
        }
    }

    type ThemePredicate = ( theme: ThemeInfo ) => boolean

    const isSelected: ThemePredicate = ( theme: ThemeInfo ):boolean => {
        return game.settings.themeIds === undefined || game.settings.themeIds.includes( theme.id )
    }

    const allOf = (filter: ThemeFilter, predicate:ThemePredicate):boolean => {
        for ( const theme of themes || [] ) {
            if ( !filter( theme ) ) {
                continue
            }
            if ( !predicate( theme ) ) {
                return false
            }
        }
        return true
    }
    
    const bothOf = (filter: ThemeFilter, predicate:ThemePredicate):boolean => {
        let value: boolean | undefined
        for ( const theme of themes || [] ) {
            if ( !filter( theme ) ) {
                continue
            }
            if ( value === undefined ) {
                value = predicate( theme )
                continue
            }
            if ( value !== predicate( theme ) ) {
                return true
            }
        }
        return false
    }
    
    // const noneOf = (filter: ThemeFilter, predicate:ThemePredicate):boolean => {
    //     for ( const theme of themes || [] ) {
    //         if ( !filter( theme ) ) {
    //             continue
    //         }
    //         if ( predicate( theme ) ) {
    //             return false
    //         }
    //     }
    //     return true
    // }

    const selectIds = (filter:ThemeFilter): number[] => {
        const ids: number[] = []
        for ( const theme of themes || [] ) {
            if ( filter( theme ) ) {
                ids.push( theme.id )
            }
        }
        return ids
    }

    const toggleAll = () => {
        toggleFilter(matchAll)
    }

    const toggleCategory = ( category?: Category ) => {
        toggleFilter(matchCategory( category ))
    }

    const toggleLanguage = ( language?: Language ) => {
        toggleFilter(matchLanguage( language ))
    }
    
    const toggleFilter = ( filter: ThemeFilter ) => {
        const ids = selectIds( filter )
        if ( allOf( filter, isSelected ) ) {
            removeThemeIds( ids )
        } else {
            addThemeIds( ids )
        }
    }

    const toggleTheme = ( theme: ThemeInfo ) => {
        if ( isSelected( theme ) ) {
            removeThemeIds( [ theme.id ] )
        } else {
            addThemeIds( [ theme.id ] )
        }
    }

    // user events

    const lessPlayer = lessPlayerDisabled ? undefined : onUserEvent( () => updateNbPlayer( game.settings.nbPlayer - nbPlayerIncrement ) )
    const morePlayer = morePlayerDisabled ? undefined : onUserEvent( () => updateNbPlayer( game.settings.nbPlayer + nbPlayerIncrement ) )

    const lessQuestion = lessQuestionDisabled ? undefined : onUserEvent( () => updateNbQuestion( game.settings.nbQuestion - nbQuestionIncrement ) )
    const moreQuestion = moreQuestionDisabled ? undefined : onUserEvent( () => updateNbQuestion( game.settings.nbQuestion + nbQuestionIncrement ) )

    const lessAnswer = lessAnswerDisabled ? undefined : onUserEvent( () => updateNbAnswer( game.settings.nbAnswer - nbAnswerIncrement ) )
    const moreAnswer = moreAnswerDisabled ? undefined : onUserEvent( () => updateNbAnswer( game.settings.nbAnswer + nbAnswerIncrement ) )

    const playlist = game.settings.playlist

    return (
        <GamePage step={GameStep.SETTINGS} game={game} updateGame={updateGame} canNext={canNext} onNext={onNext}>
            
            <Grid container spacing={2}>

                {/* nb players */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                > 
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessPlayerDisabled} 
                        onClick={lessPlayer}
                    >
                        - {nbPlayerIncrement}
                    </Button>
                </Grid>

                <Grid 
                    item xs={4} 
                    textAlign="center" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <PersonIcon style={{ marginRight: '10px' }} color="primary"/> 
                    {nbPlayer} {nbPlayer > 1 ? 'players' : 'player'}
                </Grid>

                <Grid 
                    item xs={4} 
                    textAlign="center" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={morePlayerDisabled} 
                        onClick={morePlayer}
                    >
                        + {nbPlayerIncrement}
                    </Button>
                </Grid>

                {/* nb questions */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                >
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessQuestionDisabled} 
                        onClick={lessQuestion}
                    >
                        - {nbQuestionIncrement}
                    </Button>
                </Grid>
                
                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <MusicNoteIcon 
                        style={{ marginRight: '10px' }} 
                        color="primary"
                    /> 
                    {nbQuestion} questions
                </Grid>
                
                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={moreQuestionDisabled} 
                        onClick={moreQuestion}
                    >
                        + {nbQuestionIncrement}
                    </Button>
                </Grid>

                {/* nb answer per question */}

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}
                >
                    <Button 
                        style={{ marginRight: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={lessAnswerDisabled} 
                        onClick={lessAnswer}
                    >
                        - {nbAnswerIncrement}
                    </Button>
                </Grid>

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                > 
                    <QuizIcon 
                        style={{ marginRight: '10px' }} 
                        color="primary"
                    /> 
                    {nbAnswer} answers / question
                </Grid>

                <Grid 
                    item xs={4} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                > 
                    <Button 
                        style={{ marginLeft: '40px' }} 
                        size="small" 
                        variant="contained" 
                        disabled={moreAnswerDisabled} 
                        onClick={moreAnswer}
                    >
                        + {nbAnswerIncrement}
                    </Button>
                </Grid>

            </Grid>

            {/* store themes */}

            {isStore && themes &&
                <Grid container spacing={0} style={{ marginTop: '20px' }}>
                    <Grid item xs={4} />
                    <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                        
                        <FormControlLabel
                            label="All themes"
                            control={
                                <Checkbox
                                    size="small"
                                    checked={allOf(matchAll, isSelected)}
                                    indeterminate={bothOf(matchAll, isSelected)}
                                    onChange={toggleAll}
                                    style={{ padding: '0 9px' }}
                                />
                            }
                        />

                        {
                            Array.from( languages.values() ).map( language => {   
                                return <FormControlLabel
                                    key={language}
                                    label={languageToLabel(language)}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={allOf(matchLanguage(language), isSelected)}
                                            indeterminate={bothOf(matchLanguage(language), isSelected)}
                                            onChange={() => toggleLanguage(language)}
                                            style={{ padding: '0 9px' }}
                                        />
                                    }
                                /> 
                            })
                        }

                    </Grid>

                    {
                        Array.from( categories.values() ).map( category => {
                            return (
                                <>
                                    <Grid item xs={5} />
                                    <Grid item xs={7} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 

                                        <FormControlLabel
                                            key={category}
                                            label={categoryToLabel(category)}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={allOf(matchCategory(category), isSelected)}
                                                    indeterminate={bothOf(matchCategory(category), isSelected)}
                                                    onChange={() => toggleCategory(category)}
                                                    style={{ padding: '0 9px' }}
                                                />
                                            }
                                        />
                                    
                                    </Grid>

                                    {
                                        themes.filter(matchCategory(category)).map( theme => {
                                            return (
                                                <>
                                                    <Grid item xs={6} />
                                                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 

                                                        <FormControlLabel
                                                            key={theme.id}
                                                            label={theme.title}
                                                            control={
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={isSelected(theme)}
                                                                    onChange={() => toggleTheme(theme)}
                                                                    style={{ padding: '0 9px' }}
                                                                />
                                                            }
                                                        />

                                                        <LanguageChip language={theme.labels.language} />

                                                    </Grid>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    }

                </Grid> 
            }


            {/* deezer playlist */}

            {isDeezer && 
            <Grid container spacing={2}>
                <Grid 
                    item xs={12} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
                >
                    <PlaylistCard playlist={playlist} onPlaylist={onPlaylist}/>
                </Grid>
            </Grid>}

        </GamePage>
    )
}

export default SettingsPage
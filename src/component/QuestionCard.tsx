import React from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import Slide from '@mui/material/Slide';

import { Game, onAnswers, OnGameUpdate, onQuestionNumber } from '../data/Game'
import { Player, PlayerId } from '../data/Player'
import { Question, OnQuestionUpdate, onQuestionPlayed, onQuestionCompleted, addPlayerAnswer, removePlayerAnswer, hasPlayerAnswer } from '../data/Question'
import { range, onUserEvent } from '../data/Util'
import { Avatar, Badge, Fade, Grow, Tooltip } from '@mui/material'
import PlayingCard from './PlayingCard'
import { CardSize } from '../data/Card'
import { Answer, AnswerId } from '../data/Answer'
import PlayerAvatar, { AvatarSize } from './PlayerAvatar'
import { getQuestionAnswerStats, getQuestionStats } from '../data/PlayerStats'
import PlayerCard from './PlayerCard'
import { withStyles } from '@mui/styles'
import MediaCard from './MediaCard'
import MusicPlayer from './MusicPlayer'
import { DEBUG, MAX_NB_SECONDS, ONE_SECOND } from '../data/Constants'

interface Props {
    game: Game
    question: Question
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate    
    onNext: () => void
}

const QuestionCard = ( props: Props ) => {
    const { game, question, updateGame, updateQuestion, onNext } = props

    const [ questionId, setQuestionId ] = React.useState( question.id )
    const [ musicLoading, setMusicLoading ] = React.useState( true )
    const [ nbSecondsTotal, setNbSecondsTotal ] = React.useState( 0 )
    const [ nbShownAnswers, setNbShownAnswers ] = React.useState( 0 )
    const [ musicReady, setMusicReady ] = React.useState( false )
    const [ countDown, setCountDown ] = React.useState( 3 )
    const [ musicStarted, setMusicStarted ] = React.useState( false )
    const [ musicPlaying, setMusicPlaying ] = React.useState( false )
    const [ nbSecondsPlayed, setNbSecondsPlayed ] = React.useState( 0 )
    const [ musicEnded, setMusicEnded ] = React.useState( false )

    if ( !game || !question ) {
        return null
    }

    React.useEffect( () => {
        if ( questionId != question.id ) {
            console.log( `new question >>> setQuestionId( ${question.id} ) + reset()` ) 
            setQuestionId( question.id )
            reset()
        }
    }, [ questionId, question.id ] );
        
    const musicPlayed = musicEnded || question.status == 'played' || question.status == 'completed'

    //
    // answers helpers
    //

    const hasAnswer = ( playerId: PlayerId, answerId: AnswerId ): boolean => {
        return hasPlayerAnswer( question, playerId, answerId )
    }

    const addAnswer = ( playerId: PlayerId, answerId: AnswerId ) => {
        updateQuestion( game.id, question.id, ( question: Question ) => addPlayerAnswer( question, playerId, answerId ) )    
    }

    const removeAnswer = ( playerId: PlayerId, answerId: AnswerId ) => {
        updateQuestion( game.id, question.id, ( question: Question ) => removePlayerAnswer( question, playerId, answerId ) )        
    }

    //
    // sort players by score
    //
     
    const sortedPlayers = [ ...game.players ].sort( ( left: Player, right: Player ): number => {
        return right.stats.score - left.stats.score
    } )

    //
    // badge
    //

    const badgeValue = ( value: number | undefined ): string | undefined => {
        if ( value ) {
            if ( value === 0 ) {
                return `-`
            } else if ( value > 0 ) {
                return `+${value}`
            } else {
                return `${value}`
            }
        }
        return undefined
    }

    const badgeColor = ( value: number | undefined ): 'info' | 'success' | 'warning' | undefined => {
        if ( value ) {
            if ( value === 0 ) {
                return `info`
            } else if ( value > 0 ) {
                return `success`
            } else {
                return `warning`
            }
        }
        return undefined
    }

    const LightTooltip = withStyles( theme => ( {
        tooltip: {
            backgroundColor: 'transparent', // theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            // boxShadow: theme.shadows[1],
            fontSize: 11
        },
        arrow: {
            color: "white"
        }
    } ) ) ( Tooltip );

    //
    // events
    //

    const reset = () => {
        setMusicLoading( true )
        setNbSecondsTotal( 0 )
        setNbShownAnswers( 0 )
        setMusicReady( false )
        setCountDown( 3 )
        setMusicStarted( false )
        setMusicPlaying( false )
        setNbSecondsPlayed( 0 )
        setMusicEnded( false )
    }

    const resetOnPlayed = () => {
        setNbShownAnswers( question.answers.length )
    }

    const showMusicLoading = () => {
        console.log( 'showMusicLoading >>> ...' ) 
    }

    const onMusicLoaded = ( nbSeconds: number ) => {
        console.log( `onMusicLoaded >>> setMusicLoading( false ) + setNbSeconds( Math.min( ${nbSeconds}, ${MAX_NB_SECONDS} ) )` ) 
        setMusicLoading( false )
        setNbSecondsTotal( Math.min( Math.ceil( nbSeconds ), MAX_NB_SECONDS ) )
        setMusicStarted( false )
        setMusicPlaying( false )
        setNbSecondsPlayed( 0 )
        setMusicEnded( false )
    }

    const onMusicPlaying = () => {
        if ( musicStarted && !musicPlayed ) {
            console.log( 'onMusicPlaying >>> setMusicPlaying( true )' ) 
            setMusicPlaying( true )
        } else {
            console.log( `onMusicPlaying >>> WRONG state! ( musicStarted: ${musicStarted}, musicPlayed: ${musicPlayed} )` ) 
        }
    }

    const onMusicPaused = () => {
        if ( musicStarted && !musicPlayed ) {
            console.log( 'onMusicPaused >>> setMusicPlaying( false )' ) 
            setMusicPlaying( false )
        } else {
            console.log( `onMusicPaused >>> WRONG state! ( musicStarted: ${musicStarted}, musicPlayed: ${musicPlayed} )` ) 
        }
    }

    const onMusicEnded = () => {
        console.log( 'onMusicEnded >>> onNext() + reset()' )
        onNext()        
        reset() 
    }

    const showNextAnswer = () => {        
        if ( nbShownAnswers == question.answers.length ) {
            console.log( 'showNextAnswer >>> setMusicReady( true )' ) 
            setMusicReady( true )
        } else {            
            // console.log( `showNextAnswer >>> ${nbShownAnswers} + 1` ) 
            setNbShownAnswers( nbShownAnswers + 1 )
        }
    }

    const showCountDown = () => {
        if ( countDown > 0 ) {
            // console.log( `showCountDown >>> ${countDown} - 1` ) 
            setCountDown( countDown - 1 )
        } else {
            console.log( 'showCountDown >>> setMusicStarted( true ) + setMusicPlaying( true )' ) 
            setMusicStarted( true )
            setMusicPlaying( true )
        }
    }

    const showNbSecondsPlayed = () => {
        if ( nbSecondsPlayed < nbSecondsTotal ) {
            // console.log( `showNbSecondsPlayed >>> ${nbSecondsPlayed} + 1` ) 
            setNbSecondsPlayed( nbSecondsPlayed + 1 )
        } else {
            console.log( 'showCountDown >>> pauseMusic()' ) 
            setMusicPlaying( false )
            setMusicEnded( true )
            onMusicEnded()
        }
    }

    React.useEffect( () => {
        let timerId: any = undefined;
        if ( musicPlayed ) {
            resetOnPlayed()
            // console.log( 'timer >>> musicPlayed >>> STOP' ) 
            clearInterval( timerId );
            timerId = undefined;
        } else if ( musicLoading ) {
            // console.log( 'timer >>> musicLoading >>> showMusicLoading' ) 
            timerId = setInterval( showMusicLoading, ONE_SECOND );
        } else if ( !musicReady ) {
            // console.log( 'timer >>> !musicReady >>> showNextAnswer' ) 
            timerId = setInterval( showNextAnswer, ONE_SECOND );
        } else if ( !musicStarted ) {
            // console.log( 'timer >>> !musicStarted >>> showCountDown' ) 
            timerId = setInterval( showCountDown, ONE_SECOND );
        } else if ( musicPlaying ) {
            // console.log( 'timer >>> musicPlaying >>> showNbSecondsPlayed' ) 
            timerId = setInterval( showNbSecondsPlayed, ONE_SECOND );
        } else {
            resetOnPlayed()
            console.log( 'timer >>> ??? >>> STOP' ) 
            clearInterval( timerId );
            timerId = undefined;
        }                
        return () => {
            timerId && clearInterval( timerId );
        }
    }, [ musicLoading, countDown, nbShownAnswers, musicReady, musicStarted, musicPlaying, nbSecondsPlayed, musicPlayed ] );

    const progress = musicPlayed ? 100 : !musicStarted ? 0 : Math.ceil( Math.min( nbSecondsPlayed, nbSecondsTotal ) * 100 / nbSecondsTotal )
    const musicPaused = !musicPlayed && musicStarted && !musicPlaying
    const showHints = progress > 50
    const countingDown = musicReady && !musicStarted

    return (
        <>  
            {/* counting down */}

            {countingDown && (
                <div className='countDown'>
                    <span>{countDown}</span>
                </div>
            )}

            {/* answers */}

            {
                question.answers.map( ( answer, index ) => {

                    const shown = index < nbShownAnswers
                    const hidden = !shown
                    const last = index == ( nbShownAnswers - 1 )
                    const timeout = last && !musicPlayed ? 1000 : 0
                    const answerNumber = answer.id % 100 
                    const color = musicPlayed ? answer.correct ? '#00c508' : 'grey' : 'grey'
                    const backgroundColor = musicPlayed ? answer.correct ? '#00ff131f' : 'white' : 'white'
                    
                    const answerElement = (
                        <Paper key={answer.id} className="answer" elevation={3} style={{ margin: '2px', opacity: hidden ? '0' : '1', filter: musicPaused ? 'blur(6px)' : 'none', backgroundColor: backgroundColor }}>
                            <div 
                                style={{
                                    position: 'relative', 
                                    display: 'inline-flex',
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}
                            >                                    
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                    <Avatar sx={{ bgcolor: color }} style={{ margin: '10px', padding: '5px' }}>{answer.number}</Avatar>
                                    <div style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start', justifyContent: 'left' }}> 
                                        <Typography variant='h5'>{answer.answer}</Typography>
                                        <Typography variant='subtitle2' style={{ marginLeft: '20px', color: 'gray', opacity: showHints ? '1' : '0' }}>{answer.hint}</Typography>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 5,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    { ( question.status == 'played' ) && (
                                        game.players.map( ( player: Player ) => {
                                            const disabled = hasAnswer( player.id, answer.id )
                                            const onClick = question.status == 'played' && !disabled ? () => addAnswer( player.id, answer.id ) : undefined
                                            return (
                                                <div key={`answer-${answer.id}-${player.id}`} style={{ marginLeft: '5px' }}>
                                                    <PlayingCard
                                                        key={`${player.id}-${answer.id}`} 
                                                        card={{
                                                            ...player.card,
                                                            number: answer.number,
                                                            size: CardSize.XS,
                                                        }}
                                                        disabled={disabled} 
                                                        onClick={onClick} 
                                                    />
                                                </div>
                                            )
                                        } )
                                    ) }
                                </div>
                            </div>                                
                        </Paper>
                    )
                    
                    if ( last ) {
                        <Fade key={answer.id} in={true} timeout={timeout}>
                            {answerElement}                            
                        </Fade>
                    }

                    return answerElement
                })
            } 

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start', marginTop: '15px' }}>

                    {/* music player */}

                    <MusicPlayer 
                        questionId={question.id} 
                        media={question.media}
                        loading={musicLoading}
                        started={musicStarted}
                        playing={musicPlaying} 
                        progress={progress}
                        played={musicPlayed} 
                        onMusicLoaded={onMusicLoaded}
                        onMusicPlaying={onMusicPlaying}
                        onMusicPaused={onMusicPaused}
                        onMusicEnded={onMusicEnded}
                    />
    
                    {/* selected players answers */}
                
                    { 
                        question.playerAnswers.map( playerAnswer => {
                            const player = game.players.find( player => player.id === playerAnswer.playerId )
                            if ( !player ) {
                                return null
                            }
                            const answer = question.answers.find( answer => answer.id === playerAnswer.answerId )
                            if ( !answer ) {
                                return null
                            }
                            const correct = question.status == 'completed' ? answer.correct : undefined
                            const answerStats = getQuestionAnswerStats( player.stats, question.id, playerAnswer.answerId )
                            const score = question.status == 'completed' && answerStats ? answerStats.score : undefined
                            const onClick = question.status == 'played' ? () => removeAnswer( player.id, answer.id ) : undefined                            
                            return ( 
                                <div key={`selected-${answer.id}-${player.id}`} style={{ transition: 'transform 1000ms cubic-bezier(0, 0, 0.2, 1) 1000ms' }}>                               
                                    <Badge className='card--badge' badgeContent={badgeValue(score)} color={badgeColor(score)}>                                    
                                        <PlayingCard
                                            key={`${player.id}-${answer.id}`} 
                                            card={{
                                                ...player.card,
                                                number: answer.number,
                                                size: CardSize.XS,
                                            }} 
                                            onClick={onClick} 
                                        />
                                    </Badge>
                                </div>
                            )
                        } )
                    }
                    {
                        range( Math.max( 0, game.settings.nbPlayer - question.playerAnswers.length ) ).map( i => {
                            return (
                                <div key={`selected-${i}`} className='card--badge'>     
                                    <PlayingCard cardSize={CardSize.XS}/>
                                </div>        
                            )
                        } )
                    }

                </div>

            </div>

            {/* players */}

            <div className='playerChips'>
            {
                sortedPlayers.map( player => {
                    const tooltipId = `player-tooltip-${player.id}`
                    const questionStats = getQuestionStats( player.stats, question.id )
                    const score = question.status == 'completed' && questionStats ? questionStats.score : undefined
                    return (
                        <LightTooltip key={`player-${player.id}`} title={<PlayerCard player={player} avatarSize={AvatarSize.M} cardSize={CardSize.XS}/>} >
                            <Badge className='playerChip--badge' badgeContent={badgeValue(score)} color={badgeColor(score)}>  
                                <div className='playerChip' style={{ cursor: 'help' }}>
                                    <span className='playerChip--avatar'><PlayerAvatar key={player.id} number={player.number} size={AvatarSize.S}/></span>
                                    <span className='playerChip--score'>{player.stats.score}</span>
                                </div>
                            </Badge>                            
                        </LightTooltip>
                    )
                } )
            }
            </div>

            {/* debug */}

            {DEBUG && <pre style={{ border: '1px solid #999', background: '#fff6f2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{musicLoading?'loading':'--'}</span>
                <span>answers: {nbShownAnswers}/{question.answers.length}</span>
                <span>{musicReady?'ready':'--'}</span>
                <span>{countDown}s</span>
                <span>{musicStarted?'started':'--'}</span>
                <span>music: {nbSecondsPlayed}s / {nbSecondsTotal}s</span>
                <span>{progress}%</span>
                <span>{musicPlaying?'playing':'paused'}</span>
                <span>{showHints?'hints':'--'}</span>
                <span>{musicEnded?'ended':'--'}</span>
                <span>{musicPlayed?'played':'--'}</span>
            </pre>}

            {DEBUG && <pre style={{ border: '1px solid #999', background: '#f2fff6', padding: '20px' }}>{JSON.stringify(question,undefined,4)}</pre>}

        </>
    )
}

export default QuestionCard
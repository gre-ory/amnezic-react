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
import { Question, OnQuestionUpdate, onQuestionReady, onQuestionPlayed, onQuestionCompleted, addPlayerAnswer, removePlayerAnswer, hasPlayerAnswer } from '../data/Question'
import { range, onUserEvent } from '../data/Util'
import { Avatar, Badge, Tooltip } from '@mui/material'
import PlayingCard from './PlayingCard'
import { CardSize } from '../data/Card'
import { AnswerId } from '../data/Answer'
import PlayerAvatar, { AvatarSize } from './PlayerAvatar'
import { getQuestionAnswerStats, getQuestionStats } from '../data/PlayerStats'
import PlayerCard from './PlayerCard'
import { withStyles } from '@mui/styles'

interface Props {
    game: Game
    question: Question
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate
}

const QuestionCard = ( props: Props ) => {
    const { game, question, updateGame, updateQuestion } = props

    const [ questionNumber, setQuestionNumber ] = React.useState( game.questionNumber )

    if ( !game || !question ) {
        return null
    }
        
    const audioRef = React.useRef( new Audio( question.media.music ) )
    const isReady = React.useRef( false );

    // const [ isPlaying, setIsPlaying ] = React.useState( false )
    // const [ isPlaying, setIsPlaying ] = React.useState( false )
    const [ isPlaying, setIsPlaying ] = React.useState( false )
    const [ duration, setDuration ] = React.useState( 0 )
    const [ currentTime, setCurrentTime ] = React.useState( 0 )

    const musicPlayed = question.status == 'played' || question.status == 'completed'

    let currentPercentage = 0
    if ( musicPlayed ) {
        currentPercentage = 100
    } else if ( question.status == 'ready' && duration ) {
        currentPercentage = Math.ceil( ( currentTime / duration ) * 100 )
    }
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}%, #fff), color-stop(${currentPercentage}%, #777))`

    // update helpers

    const previousQuestion = () => {
        if ( question.previousNumber ) {
            updateGame( game.id, onQuestionNumber( question.previousNumber ) )
            setQuestionNumber( question.previousNumber )
        }
    }

    const nextQuestion = () => {
        if ( question.nextNumber ) {
            updateGame( game.id, onQuestionNumber( question.nextNumber ) )
            setQuestionNumber( question.nextNumber )
        }
    }

    const musicReady = () => {
        // if ( question.status == 'not-ready' ) {
            updateQuestion( game.id, question.id, onQuestionReady )
        // }
    }

    const musicEnded = () => {
        // if ( question.status == 'ready' ) {
            updateQuestion( game.id, question.id, onQuestionPlayed )
        // }
    }

    const musicAnswered = () => {
        // if ( question.status == 'played' ) {
            updateGame( game.id, onAnswers( game, question ) )
            updateQuestion( game.id, question.id, onQuestionCompleted )
        // }
    }

    const playMusic = () => {        
        audioRef.current.play()
        setIsPlaying( true )
    }

    const pauseMusic = () => {        
        audioRef.current.pause()
        setIsPlaying( false )
    }

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
    // audio events
    //

    React.useEffect( () => {

        console.log("pause...")
        audioRef.current.pause();
    
        console.log("new...")
        audioRef.current = new Audio( question.media.music )
        setDuration( 0 )
        setCurrentTime( 0 )

        const audio = audioRef.current;
    
        const onAudioLoad = () => {
            console.log( `onAudioLoad >>> setCurrentTime( ${audio.currentTime} ) + setDuration( ${audio.duration} )` )
            setCurrentTime( audio.currentTime )
            setDuration( audio.duration )
        }
        const onAudioReady = () => {            
            console.log( 'onAudioReady >>> musicReady' )
            musicReady()
        }
        const onAudioUpdate = () => {  
            console.log( `onAudioUpdate >>> setCurrentTime( ${audio.currentTime} )` )
            setCurrentTime( audio.currentTime )
        }
        const onAudioEnd = () => {
            console.log( 'onAudioEnd >>> musicEnded()' )
            musicEnded()
        }
    
        // listeners

        console.log("add listener...")
        audio.addEventListener( 'loadeddata', onAudioLoad )    
        audio.addEventListener( 'canplaythrough', onAudioReady )
        audio.addEventListener( 'timeupdate', onAudioUpdate )
        audio.addEventListener( 'ended', onAudioEnd )

        // React state listeners: update DOM on React state changes
        // TODO playing ? audio.play() : audio.pause();
    
        // effect cleanup
        return () => {
            console.log("remove listener...")
            audio.removeEventListener( 'loadeddata', onAudioLoad )    
            audio.removeEventListener( 'canplaythrough', onAudioReady )
            audio.removeEventListener( 'timeupdate', onAudioUpdate )
            audio.removeEventListener( 'ended', onAudioEnd )
        }
    }, [ questionNumber ] );

    console.log("render...")

    const onPreviousQuestion = onUserEvent( previousQuestion )
    const onNextQuestion = onUserEvent( nextQuestion )

    const pauseShown = isPlaying
    const pauseDisabled = question.status != 'ready'
    const onPause = onUserEvent( () => pauseMusic() )

    const playShown = !pauseShown
    const playDisabled = question.status != 'ready'
    const onPlay = onUserEvent( () => playMusic() )

    const previousDisabled = question.previousNumber === undefined
    const onPrevious = onUserEvent( () => {
      previousQuestion()  
    } )

    const nextDisabled = question.status == 'not-ready'
    const onNext = onUserEvent( () => {
        switch ( question.status ) {
            case 'not-ready':
                break
            case 'ready':
                pauseMusic()
                musicEnded()
                break
            case 'played':
                musicAnswered()
                break
            case 'completed':
                nextQuestion()
                break
        }
    } )

    const showAnswer = question.status === 'completed'

    //
    // keyboard shortcuts
    // 

    const handleKeyPress = React.useCallback( ( event ) => {        
        switch ( event.key ) {
            case 'Space':
                if ( question.status == 'ready' ) {
                    if ( isPlaying ) {
                        console.log( `key "${event.key}" >>> pauseMusic()`);
                        pauseMusic();
                    } else {
                        console.log( `key "${event.key}" >>> playMusic()`);
                        playMusic();
                    }
                }
                break;
        }
    }, [] );
    React.useEffect( () => {
        document.addEventListener( 'keydown', handleKeyPress );
        return () => {
            document.removeEventListener( 'keydown', handleKeyPress );
        };
    }, [ handleKeyPress ] );

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

    return (
        <>

            {/* answers */}

            {
                question.answers.map( answer => {
                    const timeout = musicPlayed ? 0 : 1000
                    const answerNumber = answer.id % 100 
                    const delay = musicPlayed ? 0 : answerNumber * 1000
                    const color = question.status == 'completed' ? answer.correct ? 'green' : 'orange' : 'grey'
                    return (
                        <Slide key={answer.id} direction="left" in={true} mountOnEnter unmountOnExit timeout={timeout} style={{ transitionDelay: `${delay}ms` }}>
                            <Paper key={answer.id} className="answer" elevation={3} style={{ margin: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                        <Avatar sx={{ bgcolor: color }} style={{ margin: '10px', padding: '5px' }}>{answer.number}</Avatar>
                                        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start', justifyContent: 'left' }}> 
                                            <Typography variant='h5'>{answer.answer}</Typography>
                                            <Typography variant='subtitle1'>{answer.hint}</Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                        { ( question.status == 'played' || question.status == 'completed' ) && (
                                            game.players.map( ( player: Player ) => {
                                                const disabled = hasAnswer( player.id, answer.id )
                                                const onClick = disabled ? undefined : () => addAnswer( player.id, answer.id )
                                                return (
                                                    <div style={{ margin: '0 10px' }}>
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
                        </Slide>
                    )
                })
            }   
            
            {/* players answers */}

            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start' }}>
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
                            <div style={{ transition: 'transform 1000ms cubic-bezier(0, 0, 0.2, 1) 1000ms' }}>                               
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
                            <div className='card--badge'>     
                                <PlayingCard cardSize={CardSize.XS}/>
                            </div>        
                        )
                    } )
                }
            </div>

            {/* music player */}

            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    
                    <Typography variant="h5" color="text.primary" component="div" style={{ margin: '5px 10px', opacity: showAnswer ? '1' : '0' }}>
                        {question.media.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        {/* previous */}

                        <IconButton aria-label="previous" disabled={previousDisabled} onClick={onPrevious}>
                            <SkipPreviousIcon />
                        </IconButton>

                        {/* pause */}

                        {
                            pauseShown && (
                                <IconButton aria-label="pause" disabled={pauseDisabled} onClick={onPause}>
                                    <PauseIcon sx={{ height: 38, width: 38 }}/>
                                </IconButton>
                            )
                        }

                        {/* play */}

                        {
                            playShown && (
                                <IconButton aria-label="play" disabled={playDisabled} onClick={onPlay}>
                                    <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
                                </IconButton>
                            )
                        }       

                        {/* next */}

                        <IconButton aria-label="next" disabled={nextDisabled} onClick={onNext}>
                            <SkipNextIcon />
                        </IconButton>

                        <CardMedia
                            component="img"
                            sx={{ width: 56, height: 56, margin: '5px 10px', opacity: showAnswer ? '1' : '0' }}
                            image={question.media.album.picture}
                            alt={question.media.album.title}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', opacity: showAnswer ? '1' : '0' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Album
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" component="div">
                                {question.media.album.title}
                            </Typography>
                        </div>

                        <CardMedia
                            component="img"
                            sx={{ width: 56, height: 56, margin: '5px 10px', opacity: showAnswer ? '1' : '0' }}
                            image={question.media.artist.picture}
                            alt={question.media.artist.name}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', opacity: showAnswer ? '1' : '0' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Artist
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary" component="div">
                                {question.media.artist.name}
                            </Typography>
                        </div>

                    </Box>
                </Box>

            </Card>
                
            <div style={{ marginTop: '5px', width: '100%' }}>
                <LinearProgress variant="determinate" value={currentPercentage} />
            </div>

            {/* players */}

            <div className='playerChips'>
            {
                sortedPlayers.map( player => {
                    const tooltipId = `player-tooltip-${player.id}`
                    const questionStats = getQuestionStats( player.stats, question.id )
                    const score = question.status == 'completed' && questionStats ? questionStats.score : undefined
                    return (
                        <LightTooltip title={<PlayerCard player={player} avatarSize={AvatarSize.M} cardSize={CardSize.XS}/>} >
                            <Badge className='playerChip--badge' badgeContent={badgeValue(score)} color={badgeColor(score)}>  
                                <div className='playerChip'>
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

            <pre style={{ border: '1px solid #999', background: '#f2fff6', padding: '20px' }}>{JSON.stringify(question,undefined,4)}</pre>

        </>
    )
}

export default QuestionCard
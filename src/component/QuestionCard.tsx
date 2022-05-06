import React from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import NextButton from '../component/NextButton'
import Slide from '@mui/material/Slide';

import { Game, onAnswers, OnGameUpdate, onQuestionNumber, validateAnswers } from '../data/Game'
import { Player, PlayerId } from '../data/Player'
import { Question, QuestionId, OnQuestionUpdate, onQuestionReady, onQuestionPlayed, onQuestionCompleted, addPlayerAnswer, removePlayerAnswer, hasPlayerAnswer } from '../data/Question'
import { onUserEvent } from '../data/Util'
import { Avatar } from '@mui/material'
import { ConstructionOutlined, ControlPointDuplicateSharp } from '@mui/icons-material'
import { isConstructorDeclaration } from 'typescript'
import PlayingCard from './PlayingCard'
import { CardSize } from '../data/Card'
import { AnswerId } from '../data/Answer'
import PlayerAvatar from './PlayerAvatar'

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
        if ( question.status == 'not-ready' ) {
            updateQuestion( game.id, question.id, onQuestionReady )
        }
    }

    const musicEnded = () => {
        if ( question.status == 'ready' ) {
            updateQuestion( game.id, question.id, onQuestionPlayed )
        }
    }

    const musicAnswered = () => {
        if ( question.status == 'played' ) {
            updateGame( game.id, onAnswers( game, question ) )
            updateQuestion( game.id, question.id, onQuestionCompleted )
        }
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
    // switch audio track
    //

    React.useEffect( () => {
    
        if ( isReady.current ) {
          // TODO audioRef.current.play();
          // TODO setIsPlaying(true);
          // TODO startTimer();
        } else {
          // Set the isReady ref as true for the next pass
          // TODO isReady.current = true;
        }

    }, [ questionNumber ] );

    //
    // audio events
    //

    React.useEffect( () => {

        audioRef.current.pause();
    
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

        audio.addEventListener( 'loadeddata', onAudioLoad )    
        audio.addEventListener( 'canplaythrough', onAudioReady )
        audio.addEventListener( 'timeupdate', onAudioUpdate )
        audio.addEventListener( 'ended', onAudioEnd )

        console.log( audio )
    
        // React state listeners: update DOM on React state changes
        // TODO playing ? audio.play() : audio.pause();
    
        // effect cleanup
        return () => {
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

    game.players.sort( ( left: Player, right: Player ): number => {
        return left.stats.score - right.stats.score
    } )

    return (
        <>
            <Paper className="title" elevation={3}>
                <h1>#{question.number} - {question.title} - {question.status}</h1>
            </Paper>

            {
                question.answers.map( answer => {
                    const timeout = musicPlayed ? 0 : 1000
                    const answerNumber = answer.id % 100 
                    const delay = musicPlayed ? 0 : answerNumber * 1000
                    return (
                        <Slide key={answer.id} direction="left" in={true} mountOnEnter unmountOnExit timeout={timeout} style={{ transitionDelay: `${delay}ms` }}>
                            <Paper key={answer.id} className="answer" elevation={3} style={{ margin: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                    <Avatar style={{ margin: '10px', padding: '5px' }}>{answer.number}</Avatar>
                                    <div style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start', justifyContent: 'left' }}> 
                                        <Typography variant='h5'>{answer.answer}</Typography>
                                        <Typography variant='subtitle1'>{answer.hint}</Typography>
                                    </div>
                                    { ( question.status == 'played' ) && (
                                        game.players.map( ( player: Player ) => {
                                            const disabled = hasAnswer( player.id, answer.id )
                                            const onClick = disabled ? undefined : () => addAnswer( player.id, answer.id )
                                            return (
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
                                            )
                                        } )
                                    ) }
                                </div>                                
                            </Paper>
                        </Slide>
                    )
                })
            }   

            {
                question.playerAnswers.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start' }}>
                        { question.playerAnswers.map( playerAnswer => {
                            const player = game.players.find( player => player.id === playerAnswer.playerId )
                            if ( !player ) {
                                return null
                            }
                            const answer = question.answers.find( answer => answer.id === playerAnswer.answerId )
                            if ( !answer ) {
                                return null
                            }
                            const correct = question.status == 'completed' ? answer.correct : undefined
                            const onClick = question.status == 'played' ? () => removeAnswer( player.id, answer.id ) : undefined
                            return (
                                <PlayingCard
                                    key={`${player.id}-${answer.id}`} 
                                    card={{
                                        ...player.card,
                                        number: answer.number,
                                        size: CardSize.XS,
                                    }} 
                                    onClick={onClick} 
                                />
                            )
                        } ) }   
                    </div>
                )
            }

            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start' }}>
            {
                game.players.map( player => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start', marginRight: '10px' }}>
                            <PlayerAvatar key={player.id} number={player.number} size="L"/>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyItems: 'flex-start' }}>
                                <span>{player.name}</span>
                                <span>{player.stats.score} / {player.stats.nbSuccess} / {player.stats.nbFailure} / {player.stats.nbMiss}</span>
                            </div>
                        </div>
                    )
                } )
            }     
            </div>
            

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

            <LinearProgress variant="determinate" value={currentPercentage} />
            </>
    )
}

export default QuestionCard
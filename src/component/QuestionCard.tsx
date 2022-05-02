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

import { Game, OnGameUpdate, onQuestion } from '../data/Game'
import { Question, QuestionId, OnQuestionUpdate, onPauseMusic, onPlayMusic, onEndMusic, onAnswers, onReady } from '../data/Question'
import { onUserEvent } from '../data/Util'
import { Avatar } from '@mui/material'
import { ControlPointDuplicateSharp } from '@mui/icons-material'
import { isConstructorDeclaration } from 'typescript'

interface Props {
    game: Game
    question: Question
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate
}

const QuestionCard = ( props: Props ) => {
    const { game, question, updateGame, updateQuestion } = props

    const [ questionId, setQuestionId ] = React.useState( game.questionId )
    const [ audio, setAudio ] = React.useState( question ? new Audio( question.media.music ) : null )

    if ( !game || !question || !audio ) {
        return null
    }

    // update helpers

    const previousQuestion = () => {
        if ( question.previousId ) {
            updateGame( game.id, onQuestion( question.previousId ) )
            setQuestionId( question.previousId )
        }
    }

    const nextQuestion = () => {
        if ( question.nextId ) {
            updateGame( game.id, onQuestion( question.nextId ) )
            setQuestionId( question.nextId )
        }
    }

    const musicReady = () => {
        if ( question.status == 'not-ready' ) {
            updateQuestion( game.id, question.id, onReady )
        }
    }

    const playMusic = () => {        
        if ( question.status != 'playing' ) {
            updateQuestion( game.id, question.id, onPlayMusic )
        }
    }

    const pauseMusic = () => {      
        if ( question.status != 'paused' ) {
            updateQuestion( game.id, question.id, onPauseMusic )
        }
    }

    const endMusic = () => {
        if ( question.status != 'played' && question.status != 'answered' ) {
            updateQuestion( game.id, question.id, onEndMusic )
        }
    }

    const validateAnswers = () => {
        if ( question.status != 'answered' ) {
            updateQuestion( game.id, question.id, onAnswers )
        }
    }

    // audio helpers

    React.useEffect( () => {
        if ( question.status == 'not-ready' ) {
            audio.addEventListener( 'loadeddata', musicReady )
            audio.load();
            return () => {
                audio.removeEventListener( 'loadeddata', musicReady )
            }
        }
    } )    
    React.useEffect( () => {
        if ( question.status == 'playing' ) {
            audio.addEventListener( 'ended', endMusic )
            return () => {
                audio.removeEventListener( 'ended', endMusic )
            }
        }
    } )

    console.log("render...")

    const progress = 25;

    const onPreviousQuestion = onUserEvent( previousQuestion )
    const onNextQuestion = onUserEvent( nextQuestion )

    const pauseShown = question.status == 'playing'
    const pauseDisabled = false
    const onPause = onUserEvent( () => pauseMusic() )

    const playShown = !pauseShown
    const playDisabled = question.status == 'ready' || question.status == 'paused'
    const onPlay = onUserEvent( () => playMusic() )

    const previousDisabled = question.previousId === undefined
    const onPrevious = onUserEvent( () => {
      previousQuestion()  
    } )

    const nextDisabled = question.status == 'answered' && question.nextId === undefined
    const onNext = onUserEvent( () => {
        switch ( question.status ) {
            case 'not-ready':
                break
            case 'ready':
                playMusic()
                break
            case 'playing':
                endMusic()
                break
            case 'paused':
                playMusic()
                break
            case 'played':
                validateAnswers()
                break
            case 'answered':
                nextQuestion()
                break
        }
    } )

    const showAnswer = question.status === 'answered'

    return (
        <>
            <Paper className="title" elevation={3}>
                <h1>#{question.id} - {question.title} - {question.status}</h1>
            </Paper>

            {
                question.answers.map( answer => {
                    return (
                        <Slide key={answer.number} direction="left" in={true} mountOnEnter unmountOnExit timeout={2000} style={{ transitionDelay: `${answer.number*1000}ms` }}>
                            <Paper key={answer.number} className="answer" elevation={3} style={{ margin: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                    <Avatar style={{ margin: '10px', padding: '5px' }}>{answer.number}</Avatar>
                                    <div style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-start', justifyContent: 'left' }}> 
                                        <Typography variant='h5'>{answer.answer}</Typography>
                                        <Typography variant='subtitle1'>{answer.hint}</Typography>
                                    </div>
                                </div>                                
                            </Paper>
                        </Slide>
                    )
                })
            }        
            

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

            <LinearProgress variant="determinate" value={progress} />
            </>
    )
}

export default QuestionCard
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
import SkipNextIcon from '@mui/icons-material/SkipNext'
import NextButton from '../component/NextButton'
import Slide from '@mui/material/Slide';

import { Game, OnGameUpdate, onQuestion } from '../data/Game'
import { Question, QuestionId } from '../data/Question'
import { onUserEvent } from '../data/Util'

interface Props {
    game: Game
    question: Question
    updateGame: OnGameUpdate
}

const QuestionCard = ( props: Props ) => {
    const { game, question, updateGame } = props

    const [ questionId, setQuestionId ] = React.useState( game.questionId )

    if ( !game || !question ) {
        return null
    }

    const updateQuestionId = ( questionId: QuestionId ) => {
        updateGame( game.id, onQuestion( questionId ) )
        setQuestionId( questionId )
    }

    const progress = 25;

    const onPreviousQuestion = onUserEvent( () => question.previousId && updateQuestionId( question.previousId ) )
    const onNextQuestion = onUserEvent( () => question.nextId && updateQuestionId( question.nextId ) )

    return (
        <>
            <Paper className="title" elevation={3}>
                <h1>#{question.id} - {question.title}</h1>
            </Paper>

            {
                question.answers.map( answer => {
                    return (
                        <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={answer.number*1000}>
                        <Paper key={answer.number} className="answer" elevation={3}>
                            <Grid container spacing={2}>

                                <Grid item xs={3} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                    <h1>{answer.number}</h1>
                                </Grid>

                                <Grid item xs={9} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                            <h3>{answer.answer}</h3>
                                        </Grid>
                                        <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}> 
                                        <h4>{answer.hint}</h4>
                                        </Grid>
                                    </Grid>
                                
                                </Grid>

                            </Grid>
                            
                        </Paper>
                        </Slide>
                    )
                })
            }        
            

            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous" disabled={question.previousId === undefined} onClick={onPreviousQuestion}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next" disabled={question.nextId === undefined} onClick={onNextQuestion}>
                        <SkipNextIcon />
                    </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 56, height: 56 }}
                    image={question.media.album.picture}
                    alt={question.media.album.title}
                />
                <CardMedia
                    component="img"
                    sx={{ width: 56, height: 56 }}
                    image={question.media.artist.picture}
                    alt={question.media.artist.name}
                />
            </Card>

            <LinearProgress variant="determinate" value={progress} />
            </>
    )
}

export default QuestionCard
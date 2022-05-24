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
import { AnswerId } from '../data/Answer'
import PlayerAvatar, { AvatarSize } from './PlayerAvatar'
import { getQuestionAnswerStats, getQuestionStats } from '../data/PlayerStats'
import PlayerCard from './PlayerCard'
import { withStyles } from '@mui/styles'
import MediaCard from './MediaCard'
import MusicPlayer from './MusicPlayer'

interface Props {
    game: Game
    question: Question
    updateGame: OnGameUpdate
    updateQuestion: OnQuestionUpdate    
    onNext: () => void
}

const QuestionCard = ( props: Props ) => {
    const { game, question, updateGame, updateQuestion, onNext } = props

    const [ questionNumber, setQuestionNumber ] = React.useState( game.questionNumber )

    if ( !game || !question ) {
        return null
    }
        
    const musicPlayed = question.status == 'played' || question.status == 'completed'

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

    return (
        <>

            {/* answers */}

            {
                question.answers.map( answer => {
                    const timeout = musicPlayed ? 0 : 1000
                    const answerNumber = answer.id % 100 
                    const delay = musicPlayed ? 0 : answerNumber * 1000
                    const color = musicPlayed ? answer.correct ? 'green' : 'orange' : 'grey'
                    const hintDelay = musicPlayed ? 0 : ( question.answers.length + 15 ) * 1000
                    return (
                        <Fade key={answer.id} in={true} timeout={timeout} style={{ transitionDelay: `${delay}ms` }}>
                            <Paper key={answer.id} className="answer" elevation={3} style={{ margin: '2px' }}>
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
                                            <Fade in={true} timeout={timeout} style={{ transitionDelay: `${hintDelay}ms` }}>
                                                <Typography variant='subtitle2' style={{ marginLeft: '20px', color: 'gray' }}>{answer.hint}</Typography>
                                            </Fade>                                            
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
                        </Fade>
                    )
                })
            } 

            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-start', marginTop: '15px' }}>

                    {/* music player */}

                    <MusicPlayer 
                        questionId={question.id} 
                        media={question.media} 
                        delay={question.answers.length + 4} 
                        played={musicPlayed} 
                        onMusicEnded={onNext}
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

            <pre style={{ border: '1px solid #999', background: '#f2fff6', padding: '20px' }}>{JSON.stringify(question,undefined,4)}</pre>

        </>
    )
}

export default QuestionCard
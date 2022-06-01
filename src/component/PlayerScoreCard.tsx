import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

import { Game, OnGameUpdate, updatePlayer } from '../data/Game'
import { Card as DataCard, CardSymbol, CardColor, CardSize, DefaultCards } from '../data/Card'
import { Player } from '../data/Player'

import PlayingCard from './PlayingCard'
import PlayingCardIcon from './PlayingCardIcon'
import PlayerAvatar, { AvatarSize } from './PlayerAvatar';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface Props {
    game: Game
    player: Player
    position: number    
}

const PlayerScoreCard = ( props: Props ) => {
    const { game, player, position } = props

    if ( !player.number ) {
        return null
    }

    const prettyPoints = ( value: number ): string => {
        value = value < 10 ? Math.ceil( 10 * value ) / 10 : Math.ceil( value )
        if ( value > 0 ) {
            return `+ ${value} pts`
        } else if ( value < 0 ) {
            return `- ${-value} pts`
        } else {
            return `-`
        }
    }

    const prettyPercent = ( value: number ): string => {
        value = value < 10 ? Math.ceil( 10 * value ) / 10 : Math.ceil( value )
        if ( value > 0 ) {
            return `${value} %`
        } else if ( value < 0 ) {
            return `-${-value} %`
        } else {
            return `-`
        }
    }

    const nbTotal = player.stats.nbAnswer + player.stats.nbMiss
    const successPercent = nbTotal > 0 ? player.stats.nbSuccess * 100 / nbTotal : 0
    const failurePercent = nbTotal > 0 ? player.stats.nbFailure * 100 / nbTotal : 0
    const missPercent = nbTotal > 0 ? player.stats.nbMiss * 100 / nbTotal : 0

    const color = position == 1 ? 'gold' : position == 2 ? 'grey' : position == 3 ? 'brown' : 'black'
    const colorMedal = position <= 3 ? color : 'transparent'

    let sumBySuccessAnswer = 0
    let sumByFailureAnswer = 0
    let nbSuccessAnswer = 0
    let nbFailureAnswer = 0
    for ( const question of player.stats.questions ) {
        for ( const answer of question.answers ) {
            if ( answer.success ) {
                nbSuccessAnswer++
                sumBySuccessAnswer += answer.score
            } else {
                nbFailureAnswer++
                sumByFailureAnswer += answer.score
            }
        } 
    }    
    const avgSuccessDelta = nbSuccessAnswer > 0 ? sumBySuccessAnswer / nbSuccessAnswer : 0    
    const avgFailureDelta = nbFailureAnswer > 0 ? sumByFailureAnswer / nbFailureAnswer : 0
    const avgDelta = ( nbSuccessAnswer + nbFailureAnswer ) > 0 ? ( sumBySuccessAnswer + sumByFailureAnswer ) / ( nbSuccessAnswer + nbFailureAnswer ) : 0    

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                
                <Grid container spacing={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: '2.5em', color: color, marginRight: '20px' }}>{position}</Typography>
                            <PlayerAvatar id={player.avatarId} size={AvatarSize.L}/>
                            <Typography style={{ marginLeft: '10px' }}>{player.name}</Typography>
                            <MilitaryTechIcon style={{ marginLeft: '10px', fontSize: '2.5em', color: colorMedal }}/>
                        </Box> 
                    </Grid>
                </Grid>

            </AccordionSummary>

            <AccordionDetails>
    
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e3d5ca' }}>
                                <TableCell>score: {player.stats.score}</TableCell>
                                <TableCell align="right">gain</TableCell>
                                <TableCell align="right">nb</TableCell>
                                <TableCell align="right">%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">answers:</TableCell>
                                <TableCell align="right">{prettyPoints(avgDelta)}</TableCell>
                                <TableCell align="right">{player.stats.nbSuccess+player.stats.nbFailure}</TableCell>
                                <TableCell align="right">{prettyPercent(successPercent+failurePercent)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row"> - succeed</TableCell>
                                <TableCell align="right">{prettyPoints(avgSuccessDelta)}</TableCell>
                                <TableCell align="right">{player.stats.nbSuccess}</TableCell>
                                <TableCell align="right">{prettyPercent(successPercent)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row"> - failed</TableCell>
                                <TableCell align="right">{prettyPoints(avgFailureDelta)}</TableCell>
                                <TableCell align="right">{player.stats.nbFailure}</TableCell>
                                <TableCell align="right">{prettyPercent(failurePercent)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">missed</TableCell>
                                <TableCell align="right">{prettyPoints(0)}</TableCell>
                                <TableCell align="right">{player.stats.nbMiss}</TableCell>
                                <TableCell align="right">{prettyPercent(missPercent)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </AccordionDetails>
        </Accordion>
    )
}

export default PlayerScoreCard
import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

import { Game } from '../data/Game'
import { Player } from '../data/Player'

import PlayerAvatar, { AvatarSize } from './PlayerAvatar';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

interface Props {
    game: Game
    player: Player
    position: number
    color: string
    medalColor?: string    
}

const PlayerScoreCard = ( props: Props ) => {
    const { player, position, color, medalColor } = props

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
            >
                
                <Grid container spacing={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ 
                                    width: '32px',
                                    borderRadius: '20px',
                                    border: `4px solid ${medalColor || '#42a5f5'}`,
                                    color: medalColor || '#42a5f5',
                                    // boxShadow: 'rgb(0 0 0 / 20%) 3px 3px 3px',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    aspectRatio: '1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '30px',
                                }}>
                                    {position}                                   
                                </div>
                                <PlayerAvatar id={player.avatarId} size={AvatarSize.M}/>
                                <Typography style={{ marginLeft: '10px' }} >{player.name}</Typography>
                                <MilitaryTechIcon style={{ marginLeft: '20px', fontSize: '2.5em', color: medalColor, opacity: medalColor ? '1' : '0' }}/>
                            </div>
                            <div style={{ 
                                width: '40px',
                                borderRadius: '20px',
                                marginRight: '10px',
                                backgroundColor: color,
                                boxShadow: 'rgb(0 0 0 / 20%) 3px 3px 3px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {player.stats.score}
                            </div>
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
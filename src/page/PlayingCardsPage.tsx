import React from 'react'

import Grid from '@mui/material/Grid';

import Page from '../component/Page'

import { CardSymbol, CardSize, CardColor } from '../data/Card'
import PlayingCard from '../component/PlayingCard';

interface Props {}

const PlayingCardsPage = ( props: Props ) => {

    return (
        <Page>
            
            <h3>Playing Cards</h3>

            <Grid container spacing={2}>

                { Object.keys( CardSymbol ).map(symbol => {

                    return (
                        <Grid key={symbol} item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                Object.keys( CardSize ).map(size => {
                                    return (
                                        <>
                                            <PlayingCard key={`${symbol}-${size}-black`} card={{
                                                    symbol: symbol as CardSymbol,
                                                    color: CardColor.BLACK,
                                                    size: size as CardSize,
                                                    number: 2,
                                                }} 
                                                onClick={() => {}} 
                                            />
                                            <PlayingCard key={`${symbol}-${size}-red`} card={{
                                                    symbol: symbol as CardSymbol,
                                                    color: CardColor.RED,
                                                    size: size as CardSize,
                                                    number: 2,
                                                }} 
                                                onClick={() => {}} 
                                            />
                                        </>
                                    )
                                })
                            }
                        </Grid>
                    )
                } ) }

            </Grid>

        </Page>
    )
}

export default PlayingCardsPage
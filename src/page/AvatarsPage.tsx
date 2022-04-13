import React from 'react'
import { useParams } from "react-router"
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid';

import Page from '../component/Page'
import Header from '../component/Header'
import Footer from '../component/Footer'
import PlayerCard from '../component/PlayerCard'
import NextButton from '../component/NextButton'

import { Game, selectGame } from '../data/Game'
import { PageLabel } from '../data/Page'
import { toGamePage } from '../data/Util'
import PlayerAvatar, { AvatarSize } from '../component/PlayerAvatar';

interface Props {
}

const AvatarsPage = ( props: Props ) => {

    return (
        <Page label="avatars">
            
            <h3>Avatars</h3>

            <Grid container spacing={2}>

                { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(id => {

                    return (
                        <Grid key={id} item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                ['XS','S','M','L','XL'].map(size => {
                                    return (
                                        <PlayerAvatar key={`${id}-${size}`} id={id} size={size as AvatarSize} />
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

export default AvatarsPage
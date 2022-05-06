import React from 'react'

import Grid from '@mui/material/Grid';

import Page from '../component/Page'

import PlayerAvatar, { AvatarSize } from '../component/PlayerAvatar';

interface Props {}

const AvatarsPage = ( props: Props ) => {

    return (
        <Page>
            
            <h3>Avatars</h3>

            <Grid container spacing={2}>

                { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(number => {

                    return (
                        <Grid key={number} item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {
                                ['XS','S','M','L','XL'].map(size => {
                                    return (
                                        <PlayerAvatar key={`${number}-${size}`} number={number} size={size as AvatarSize} />
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
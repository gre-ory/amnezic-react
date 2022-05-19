import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { CardMedia, Typography } from '@mui/material'
import { Media } from '../data/Media'

interface Props {
    media: Media
}

const MediaCard = ( props: Props ) => {
    const { media } = props

    if ( !media ) {
        return null
    }

    return (
        <Card variant="outlined">
            <CardContent>

                <Typography variant="h5" color="text.primary" component="div" style={{ margin: '5px 10px' }}>
                    {media.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                    <CardMedia
                        component="img"
                        sx={{ width: 56, height: 56, margin: '5px 10px' }}
                        image={media.album.picture}
                        alt={media.album.title}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Album
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary" component="div">
                            {media.album.title}
                        </Typography>
                    </div>

                    <CardMedia
                        component="img"
                        sx={{ width: 56, height: 56, margin: '5px 10px' }}
                        image={media.artist.picture}
                        alt={media.artist.name}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Artist
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary" component="div">
                            {media.artist.name}
                        </Typography>
                    </div>

                </Box>

            </CardContent>
        </Card>
    )
}

export default MediaCard
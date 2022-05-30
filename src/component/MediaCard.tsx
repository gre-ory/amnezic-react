import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { CardMedia, Typography } from '@mui/material'
import { Media } from '../data/Media'
import musicBackground from '../static/music.png'

interface Props {
    media: Media
}

const MediaCard = ( props: Props ) => {
    const { media } = props

    if ( !media ) {
        return null
    }

    const mediaImage = media.artist && media.artist.picture ? media.artist.picture : media.album && media.album.picture ? media.album.picture : musicBackground
    const artistName = media.artist && media.artist.name ? media.artist.name : '-'
    const albumName = media.album && media.album.title ? media.album.title : '-'

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
                        image={mediaImage}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                        
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Artist
                        </Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Album
                        </Typography>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                        
                        <Typography variant="subtitle1" color="text.primary" component="div">
                            {artistName}
                        </Typography>

                        <Typography variant="subtitle1" color="text.primary" component="div">
                            {albumName}
                        </Typography>

                    </div>

                </Box>

            </CardContent>
        </Card>
    )
}

export default MediaCard
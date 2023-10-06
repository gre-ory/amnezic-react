import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { CardMedia, Typography } from '@mui/material'
import { Music } from '../data/Music'
import musicBackground from '../static/music.png'

interface Props {
    music: Music
}

const MusicCard = ( props: Props ) => {
    const { music } = props

    if ( !music ) {
        return null
    }

    const musicImage = music.artist && music.artist.imgUrl ? music.artist.imgUrl : music.album && music.album.imgUrl ? music.album.imgUrl : musicBackground
    const artistName = music.artist && music.artist.name ? music.artist.name : '-'
    const albumName = music.album && music.album.name ? music.album.name : '-'

    return (
        <Card variant="outlined">
            <CardContent>

                <Typography variant="h5" color="text.primary" component="div" style={{ margin: '5px 10px' }}>
                    {music.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                    <CardMedia
                        component="img"
                        sx={{ width: 56, height: 56, margin: '5px 10px' }}
                        image={musicImage}
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

export default MusicCard
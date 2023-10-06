import React from 'react'

import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import DownloadingIcon from '@mui/icons-material/Downloading'

import { Game, OnGameUpdate } from '../data/Game'
import { Question, OnQuestionUpdate, QuestionId } from '../data/Question'
import { onKeyEvent, onUserEvent } from '../data/Util'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import MusicCard from './MusicCard'
import { Music, getImgUrl } from '../data/Music'
import { MUSIC_PLAYER_KEYBOARD_SHORTCUTS } from '../data/Constants'

import { AudioPlayerInterface } from '../data/AudioPlayer'

interface Props {
    audioPlayer: AudioPlayerInterface
    music: Music
    size?: number
}

const MusicButton = ( props: Props ) => {
    const { audioPlayer, music, size } = props

    if ( !music ) {
        return null
    }
        
    //
    // load music
    //

    const width = size ? size : 56;
    const height = size ? size : 56;

    const iconWidth = width*0.75;
    const iconHeight = height*0.75;

    const playIcon = <PlayArrowIcon sx={{ height: iconHeight, width: iconWidth, color: '#fff' }}/>
    const pauseIcon = <PauseIcon sx={{ height: iconHeight, width: iconWidth, color: '#fff' }}/>
    const downloadingIcon = <DownloadingIcon sx={{ height: iconHeight, width: iconWidth, color: '#fff' }}/>

    const [ loaded, setLoaded ] = React.useState(false)
    const [ icon, setIcon ] = React.useState(playIcon)

    //
    // toggle music
    //
    
    const loadAndPlay = () => {
        console.log( `[load-and-play-music]` )
        audioPlayer.unload()
        audioPlayer.onAudioPlaying = () => { 
            console.log( `audioPlayer.onAudioPlaying` )
            setIcon( pauseIcon )
        }
        audioPlayer.onAudioPausing = () => { 
            console.log( `audioPlayer.onAudioPausing` )
            setIcon( playIcon )
        }
        audioPlayer.onAudioLoading = () => { 
            console.log( `audioPlayer.onAudioLoading` )
            setIcon( downloadingIcon )
        }
        audioPlayer.onAudioLoaded = () => { 
            console.log( `audioPlayer.onAudioLoaded` )
            setLoaded( true )
        }
        audioPlayer.onAudioUnload = () => { 
            console.log( `audioPlayer.onAudioUnload` )
            setIcon( playIcon )
            setLoaded( false )
        }
        audioPlayer.loadAndPlay( music.mp3Url )
    }

    const pauseMusic = () => { 
        console.log( `[pause-music]` )
        audioPlayer.pause()
    }

    const toggleMusic = () => { 
        console.log( `[toggle-music]` )
        audioPlayer.toggle()
    }

    //
    // on click
    //

    const onClick = onUserEvent( () => {
        if ( loaded ) {
            toggleMusic()
        } else if ( !loaded ) {
            loadAndPlay()
        }
    } )



    return (
        <div 
            style={{ 
                width: `${width}px`, 
                height: `${height}px`, 
                cursor: 'auto', 
                marginRight: '0px', 
                border: 'none',
                background: `no-repeat url(${getImgUrl( music )})`,
                backgroundSize: `${width}px ${height}px`,
                backgroundColor: '#999',
                borderRadius: `5%`,
            }} 
            onClick={onClick}
        >

            <Box 
                sx={{
                    width: `${width}px`,
                    height: `${height}px`, 
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: '0.8',
                    cursor: 'pointer',
                }}
            >

                { icon }

            </Box>

        </div>
    )
}

export default MusicButton
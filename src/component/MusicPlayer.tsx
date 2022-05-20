import React from 'react'

import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

import { Game, OnGameUpdate } from '../data/Game'
import { Question, OnQuestionUpdate } from '../data/Question'
import { onUserEvent } from '../data/Util'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import MediaCard from './MediaCard'
import { Media } from '../data/Media'

interface Props {
    media: Media
    delay: number
    played: boolean
    onMusicEnded: () => void
}

const MusicPlayer = ( props: Props ) => {
    const { media, delay, played, onMusicEnded } = props

    if ( !media ) {
        return null
    }
        
    const audioRef = React.useRef( new Audio( media.music ) )
    const [ musicIsReady, setMusicIsReady ] = React.useState( false )
    const [ seconds, setSeconds ] = React.useState( delay )
    const [ isPlaying, setIsPlaying ] = React.useState( false )
    const [ duration, setDuration ] = React.useState( 0 )
    const [ currentTime, setCurrentTime ] = React.useState( 0 )


    let currentPercentage = 0
    if ( played ) {
        currentPercentage = 100
    } else if ( duration ) {
        currentPercentage = Math.ceil( ( currentTime / duration ) * 100 )
    }

    //
    // music helpers
    //

    const reset = () => {
        setMusicIsReady( false )
        setSeconds( delay )
        setIsPlaying( false )
        setDuration( 0 )
        setCurrentTime( 0 )
    }

    const musicReady = () => {
        console.log( 'musicReady >>> onMusicReady()' )
        setMusicIsReady( true )
    }   

    const timerOff = () => {  
        if ( !isPlaying ) {      
            playMusic()
        }
    }   

    const playMusic = () => {        
        if ( audioRef.current ) {
            audioRef.current.muted = true
            audioRef.current.play()
            setIsPlaying( true )
        }
    }

    const pauseMusic = () => {     
        if ( audioRef.current ) {   
            audioRef.current.pause()
            setIsPlaying( false )
        }
    } 

    const musicEnded = () => {
        console.log( 'musicEnded >>> onMusicEnded()' )
        onMusicEnded()
    }

    //
    // audio events
    //

    React.useEffect( () => {
        
        if ( audioRef.current ) {
            console.log("pause current music...")
            audioRef.current.pause();
        }
    
        if ( !played && media.music ) {
            console.log("new music...")
            audioRef.current = new Audio( media.music )
            reset()

            const audio = audioRef.current;
        
            const onAudioLoad = () => {
                // console.log( `onAudioLoad >>> setCurrentTime( ${audio.currentTime} ) + setDuration( ${audio.duration} )` )
                setCurrentTime( audio.currentTime )
                setDuration( audio.duration )
            }
            const onAudioReady = () => {            
                console.log( 'onAudioReady >>> musicReady' )
                musicReady()
            }
            const onAudioUpdate = () => {  
                // console.log( `onAudioUpdate >>> setCurrentTime( ${audio.currentTime} )` )
                setCurrentTime( audio.currentTime )
            }
            const onAudioEnd = () => {
                console.log( 'onAudioEnd >>> musicEnded()' )
                musicEnded()
            }
        
            // listeners

            console.log("add listener...")
            audio.addEventListener( 'loadeddata', onAudioLoad )    
            audio.addEventListener( 'canplaythrough', onAudioReady )
            audio.addEventListener( 'timeupdate', onAudioUpdate )
            audio.addEventListener( 'ended', onAudioEnd )

            // effect cleanup
            return () => {
                console.log("remove listener...")
                audio.removeEventListener( 'loadeddata', onAudioLoad )    
                audio.removeEventListener( 'canplaythrough', onAudioReady )
                audio.removeEventListener( 'timeupdate', onAudioUpdate )
                audio.removeEventListener( 'ended', onAudioEnd )
                reset()
            }
        }

        return reset

    }, [ media ] );

    const loadingMusic = !played && !musicIsReady
    const countingDown = !played && musicIsReady && ( seconds > 0 )
    const playingMusic = !played && musicIsReady && ( seconds === 0 ) && isPlaying
    const pausingMusic = !played && musicIsReady && ( seconds === 0 ) && !isPlaying

    const onPause = playingMusic ? onUserEvent( () => pauseMusic() ) : undefined
    const onPlay = pausingMusic ? onUserEvent( () => playMusic() ) : undefined

    //
    // timer 
    //

    React.useEffect( () => {
        let timerId: any = undefined;
        if ( seconds > 0 ) {
            timerId = setInterval( () => {
                setSeconds( seconds => seconds - 1 );
            }, 1000 );
        } else {
            clearInterval( timerId );
            timerOff()
        }
        return () => clearInterval( timerId );
    }, [ seconds ] );

    //
    // keyboard shortcuts
    // 

    const handleKeyPress = React.useCallback( ( event ) => {        
        switch ( event.key ) {
            case 'Space':
                if ( playingMusic ) {
                    console.log( `key "${event.key}" >>> pauseMusic()`);
                    pauseMusic();
                } else if ( pausingMusic ) {
                    console.log( `key "${event.key}" >>> playMusic()`);
                    playMusic();
                }
                break;
        }
    }, [] );

    React.useEffect( () => {
        document.addEventListener( 'keydown', handleKeyPress );
        return () => {
            document.removeEventListener( 'keydown', handleKeyPress );
        };
    }, [ handleKeyPress ] );

    //
    // tooltip
    //

    const LightTooltip = withStyles( theme => ( {
        tooltip: {
            backgroundColor: 'transparent',
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: 11
        },
        arrow: {
            color: "white"
        }
    } ) ) ( Tooltip );

    // console.log( `[render] music player: ready=${musicIsReady}, seconds=${seconds}/${delay}, played=${played}` )

    return (
        <LightTooltip title={played ? <MediaCard media={media} /> : false} >
            <div style={{ width: '56px', height: '56px', cursor: played ? 'help' : 'auto', marginRight: '10px', background: played ? `url(${media.album.picture})` : `none`, backgroundSize: '56px 56px' }}>                

                <Box 
                    sx={{ 
                        width: '54px', 
                        height: '54px',
                        border: '1px solid #777', 
                        position: 'relative', 
                        display: 'inline-flex'
                    }} 
                    onClick={onPause}
                >
                    { !played && <CircularProgress size={56} variant="determinate" value={currentPercentage}/> }
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.secondary">
                            {
                                loadingMusic && (
                                    '...'
                                )
                            }
                            {
                                countingDown && (
                                    seconds
                                )
                            }
                            {   
                                playingMusic && (
                                    `${Math.round(currentTime)}s`
                                )
                            }
                            {
                                pausingMusic && (
                                    <IconButton aria-label="play" onClick={onPlay}>
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
                                    </IconButton>
                                )
                            }
                        </Typography>
                    </Box>
                </Box>

            </div>
        </LightTooltip>
    )
}

export default MusicPlayer
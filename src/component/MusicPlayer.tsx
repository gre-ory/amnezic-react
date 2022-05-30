import React from 'react'

import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

import { Game, OnGameUpdate } from '../data/Game'
import { Question, OnQuestionUpdate, QuestionId } from '../data/Question'
import { onUserEvent } from '../data/Util'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import MediaCard from './MediaCard'
import { Media } from '../data/Media'
import musicBackground from '../static/music.png'


interface Props {
    questionId: QuestionId
    media: Media
    loading: boolean
    started: boolean
    playing: boolean
    progress: number
    played: boolean
    onMusicLoaded: ( nbSeconds:number ) => void
    onMusicPlaying: () => void
    onMusicPaused: () => void
    onMusicEnded: () => void
}

const MusicPlayer = ( props: Props ) => {
    const { questionId, media, loading, started, playing, progress, played, onMusicLoaded, onMusicPlaying, onMusicPaused, onMusicEnded } = props

    if ( !questionId && !media ) {
        return null
    }
        
    const audioRef = React.useRef<HTMLAudioElement>( new Audio( media.music ) )

    // const [ loading, setLoading ] = React.useState( true )
    // const [ isPlaying, setIsPlaying ] = React.useState( false )
    // const [ duration, setDuration ] = React.useState( 0 )
    // const [ currentTime, setCurrentTime ] = React.useState( 0 )

    // let currentPercentage = 0
    // if ( played ) {
    //     currentPercentage = 100
    // } else if ( duration ) {
    //     currentPercentage = Math.ceil( ( currentTime / duration ) * 100 )
    // }

    //
    // music helpers
    //

    const reset = () => {
        console.log( 'reset' )
        // setMusicIsReady( false )
        // setIsPlaying( false )
        // setDuration( 0 )
        // setCurrentTime( 0 )
    }

    const musicReady = () => {
        console.log( `musicReady >>> setLoading( false ) + onMusicLoaded( ${audioRef.current.duration} )` )
        // setMusicIsReady( true )
        // setLoading( false )
        onMusicLoaded( audioRef.current.duration )
    }   

    const playMusic = () => {  
        if ( started && !playing && !played ) {
            console.log( `playMusic >>> !playing >>> onMusicPlaying()` )
            onMusicPlaying()
        }
    }

    const pauseMusic = () => {     
        if ( started && playing && !played ) {
            console.log( `pauseMusic >>> playing >>> onMusicPaused()` )
            onMusicPaused()
        }
    } 

    React.useEffect( () => {
        if ( audioRef.current ) {
            if ( playing ) {
                console.log( `playing >>> audio.play()` )
                audioRef.current.play()
            } else {
                console.log( `!playing >>> audio.pause()` )
                audioRef.current.pause()
            }
        }
    }, [ playing ] ); 

    const lessVolume = () => {
        console.log( `lessVolume` ) 
        if ( audioRef.current ) {
            audioRef.current.volume = Math.max( 0.1, audioRef.current.volume - 0.1 )
        } 
    }

    const moreVolume = () => {
        console.log( `moreVolume` )  
        if ( audioRef.current ) {
            audioRef.current.volume = Math.min( 1.0, audioRef.current.volume + 0.1 )
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
    
        if ( !played ) {

            if ( audioRef.current.src != media.music ) {
                console.log("new music...")
                audioRef.current = new Audio( media.music )
                audioRef.current.loop = false
                audioRef.current.volume = 1.0
                reset()
            }
        
            const onAudioLoad = () => {
                console.log( `onAudioLoad >>> setCurrentTime( ${audioRef.current.currentTime} ) + setDuration( ${audioRef.current.duration} )` )
                // setCurrentTime( audioRef.current.currentTime )
                // setDuration( audioRef.current.duration )
            }
            const onAudioReady = () => {            
                console.log( 'onAudioReady >>> musicReady' )
                musicReady()
            }
            // const onAudioUpdate = () => {  
            //     // console.log( `onAudioUpdate >>> setCurrentTime( ${audio.currentTime} )` )
            //     // setCurrentTime( audioRef.current.currentTime )
            // }
            const onAudioEnd = () => {
                console.log( 'onAudioEnd >>> musicEnded()' )
                musicEnded()
            }
        
            // listeners

            console.log("add listener...")
            audioRef.current.addEventListener( 'loadeddata', onAudioLoad )    
            audioRef.current.addEventListener( 'canplaythrough', onAudioReady )
            // audioRef.current.addEventListener( 'timeupdate', onAudioUpdate )
            audioRef.current.addEventListener( 'ended', onAudioEnd )

            // effect cleanup
            return () => {
                console.log("remove listener...")
                audioRef.current.removeEventListener( 'loadeddata', onAudioLoad )    
                audioRef.current.removeEventListener( 'canplaythrough', onAudioReady )
                // audioRef.current.removeEventListener( 'timeupdate', onAudioUpdate )
                audioRef.current.removeEventListener( 'ended', onAudioEnd )
                reset()
            }
        }

        return reset

    }, [ played, questionId ] ); 

    const loadingMusic = !played && !started && loading
    // const musicReady = !played && !started && !loading
    // const countingDown = !played && musicIsReady && ( seconds > 0 )
    const playingMusic = !played && started && playing
    const pausingMusic = !played && started && !playing

    const onPause = playingMusic ? onUserEvent( () => pauseMusic() ) : undefined
    const onPlay = pausingMusic ? onUserEvent( () => playMusic() ) : undefined

    //
    // timer 
    //

    // React.useEffect( () => {
    //     console.log( `[effect] timer >>> played: ${played}` )
    //     if ( !played ) {
    //         let timerId: any = undefined;
    //         if ( seconds > 0 ) {
    //             timerId = setInterval( () => {
    //                 setSeconds( seconds => seconds - 1 );
    //             }, 1000 );
    //             console.log( `timer ${timerId} >>> ${seconds} >>> -1s` )
    //         } else {
    //             console.log( `timer ${timerId} >>> OFF >>> remove + timerOff()` )
    //             clearInterval( timerId );            
    //             timerOff()
    //         }
    //         return () => {
    //             console.log( `timer ${timerId} >>> unmount >>> remove` )
    //             clearInterval( timerId );
    //         }
    //     }
    // }, [ played, seconds ] );

    //
    // keyboard shortcuts
    // 

    const handleKeyPress = React.useCallback( ( event ) => {   
        console.log( `music-player >>> key-down >>> [${event.key}]` )          
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
            case 'ArrowUp':
                console.log( `key "${event.key}" >>> moreVolume()`);
                moreVolume();
                break;
            case 'ArrowDown':
                console.log( `key "${event.key}" >>> lessVolume()`);
                lessVolume();
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
            <div style={{ width: '56px', height: '56px', cursor: played ? 'help' : 'auto', marginRight: '10px', background: played ? media.album ? `url(${media.album.picture})` : `url(${musicBackground})` : 'none', backgroundSize: '56px 56px' }}>                

                <Box 
                    sx={{ 
                        width: '56px', 
                        height: '56px',
                        border: '0px solid #777',
                        borderRadius: '28px', 
                        backgroundColor: '#eee',
                        position: 'relative', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }} 
                    onClick={playingMusic ? onPause : onPlay}
                >
                    { !played && loading && <CircularProgress variant="indeterminate"/> }
                    { !played && !loading && started && <CircularProgress size={56} variant="determinate" value={progress}/> }
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
                                playingMusic && (
                                    <IconButton aria-label="pause" onClick={onPause}>
                                        <PauseIcon sx={{ height: 38, width: 38 }}/>
                                    </IconButton>
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
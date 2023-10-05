import React from 'react'

import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

import { Game, OnGameUpdate } from '../data/Game'
import { Question, OnQuestionUpdate, QuestionId } from '../data/Question'
import { onKeyEvent, onUserEvent } from '../data/Util'
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import MusicCard from './MusicCard'
import { Music } from '../data/Music'
import musicBackground from '../static/music.png'
import { MUSIC_PLAYER_KEYBOARD_SHORTCUTS } from '../data/Constants'


interface Props {
    questionId: QuestionId
    music: Music
    failed: boolean
    loading: boolean
    info?: any
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
    const { questionId, music, loading, info, started, playing, progress, played, onMusicLoaded, onMusicPlaying, onMusicPaused, onMusicEnded } = props

    if ( !questionId && !music ) {
        return null
    }
        
    const audioRef = React.useRef<HTMLAudioElement>( new Audio( music.mp3Url ) )

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
    
    const toggleMusic = () => {           
        if ( started && !played ) {
            if ( playing ) {
                console.log( `toggleMusic >>> playing >>> onMusicPaused()` )
                onMusicPaused()
            } else {
                console.log( `toggleMusic >>> not playing >>> onMusicPlaying()` )
                onMusicPlaying()
            }
        } else {
            console.log( `toggleMusic >>> not started or already played >>> No-Op` )
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

            if ( audioRef.current.src != music.mp3Url ) {
                console.log("new music...")
                audioRef.current = new Audio( music.mp3Url )
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
    // keyboard shortcuts
    // 

    if ( MUSIC_PLAYER_KEYBOARD_SHORTCUTS ) {

        const handleKeyPress = React.useCallback( onKeyEvent( ( key: string ): boolean => {
            switch ( key ) {
                case ' ':
                    console.log( `music-player >>> key "${key}" >>> toggleMusic()`);
                    toggleMusic();
                    return true;
                case 'ArrowUp':
                    console.log( `music-player >>> key "${key}" >>> moreVolume()`);
                    moreVolume();
                    return true;
                case 'ArrowDown':
                    console.log( `music-player >>> key "${key}" >>> lessVolume()`);
                    lessVolume();
                    return true;
            } 
            return false;
        } ), [ toggleMusic, moreVolume, lessVolume ] );

        React.useEffect( () => {
            document.addEventListener( 'keydown', handleKeyPress );
            return () => {
                document.removeEventListener( 'keydown', handleKeyPress );
            };
        }, [ handleKeyPress ] ); 

    }  

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
    
    const icon = started && pausingMusic ? (
        <Typography variant="caption" component="div" color="text.secondary">
            <IconButton aria-label="play" onClick={onPlay}>
                <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
            </IconButton> 
        </Typography>
    ) : undefined
    
    const onClick = started && playingMusic ? onPause : undefined

    return (
        <LightTooltip title={played ? <MusicCard music={music} /> : false} >
            <div 
                style={{ 
                    width: '56px', 
                    height: '56px', 
                    cursor: played ? 'help' : 'auto', 
                    marginRight: '10px', 
                    border: played ? '1px solid #777' : 'none',
                    borderRadius: '28px', 
                    backgroundColor: played ? 'transparent' : '#eee',
                    background: played ? music.album ? `url(${music.album.imgUrl})` : `url(${musicBackground})` : 'none', 
                    backgroundSize: '56px 56px' 
                }}
            >                

                <Box 
                    sx={{ 
                        width: '56px', 
                        height: '56px',
                        position: 'relative', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: onClick ? 'pointer' : 'auto',                        
                    }} 
                    onClick={onClick}
                >
                    
                    {/* progress */}

                    { !played && loading && <CircularProgress variant="indeterminate"/> }                    
                    { !played && !loading && started && <CircularProgress size={56} variant="determinate" value={progress} onClick={onClick}/> }
                    
                    {/* button or info */}

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
                        onClick={onClick}
                    >
                        { icon ? icon : info }
                    </Box>                    

                </Box>

            </div>
        </LightTooltip>
    )
}

export default MusicPlayer
import React from 'react'

import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { Chip, Stack } from '@mui/material';

import { Playlist } from '../data/Playlist'
import { onUserEvent, toDateTimeString } from '../data/Util'

import SearchPlaylistModal from './SearchPlaylistModal'

const useStyles = makeStyles( () => ( {
    playlistCard: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderRadius: '10px',
        border: '2px solid #ddd',        
        "&:hover": {
            border: '2px solid gold',        
            backgroundColor: '#ffd70029'
        }
    },
    playlistLine: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    playlistItem: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'left'
    },
} ) );

interface Props {
    playlist?: Playlist
    onPlaylist: ( playlist?: Playlist ) => void
}

const PlaylistCard = ( props: Props ) => {
    const { playlist, onPlaylist } = props
    const classes = useStyles()

    // user events

    const [ searchPlaylistModal, setSearchPlaylistModal ] = React.useState( false )
    const openSearchPlaylistModal = () => {
        setSearchPlaylistModal(true)
    }
    const closeSearchPlaylistModal = () => {
        setSearchPlaylistModal(false)
    }
    const selectPlaylist = (playlist: Playlist) => {
        console.log("select playlist", playlist)
        closeSearchPlaylistModal()
        onPlaylist( playlist )
    }

    const clearPlaylist = onUserEvent( () => {
        onPlaylist( undefined ) 
    } )

    return (  
        <>      
            <div title="Resume Game" className={`${classes.playlistCard} selectable`} onClick={openSearchPlaylistModal}>
                <div className={classes.playlistLine}> 
                    
                    {!playlist && <div className={classes.playlistItem}>Please select playlist</div>}
                    {playlist && <>
                        <div className={classes.playlistItem}><b>{playlist.name}</b></div>
                        <IconButton title="" onClick={clearPlaylist}>
                            <CloseIcon />
                        </IconButton>
                    </>}

                </div>
                {playlist && <div style={{ marginLeft: '5%', width: '95%' }}>
                    <div className={classes.playlistLine}> 
                        {playlist.imgUrl && <div className={classes.playlistItem}><img src={playlist.imgUrl}/></div>}
                        <div className={classes.playlistItem}><PersonIcon style={{ marginRight: '10px' }} color="primary"/> by {playlist.user}</div>
                        <div className={classes.playlistItem}><MusicNoteIcon style={{ marginRight: '10px' }} color="primary"/> {playlist.nbMusics} musics</div>
                    </div>
                </div>}
            </div>

            <SearchPlaylistModal
                open={searchPlaylistModal}
                closeModal={closeSearchPlaylistModal}
                selectPlaylist={selectPlaylist}
                />
        </>
    )
}

export default PlaylistCard
import React from 'react'

import { IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { Box, Grid, Modal, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

import { SearchMusic } from '../client/SearchMusic';
import { FetchPlaylist } from '../client/FetchPlaylist';

import { Music } from '../data/Music';
import { Playlist, getImgUrl } from '../data/Playlist';
import { AudioPlayerInterface } from '../data/AudioPlayer';
import { onUserEvent, onValueEvent } from '../data/Util';

import MusicButton from './MusicButton'

interface Props {
    open: boolean
    closeModal: () => void
    isMusicIncluded: (music: Music) => boolean
    addMusic: (music: Music) => void
    removeMusic: (music: Music) => void
    audioPlayer: AudioPlayerInterface
    playlistId?: number
}

const SearchMusicModal = ( props: Props ) => {
    const { open, closeModal, isMusicIncluded, addMusic, removeMusic, audioPlayer, playlistId } = props

    const [ search, SetSearch ] = React.useState<string>("")
    const [ submit, SetSubmit ] = React.useState<boolean>(false)
    const [ loading, SetLoading ] = React.useState<boolean>(false)
    const [ musics, SetMusics ] = React.useState<Music[]>()
    const [ playlist, SetPlaylist ] = React.useState<Playlist>()

    const handleChange = onValueEvent((value) => {
        console.log(`search: ${value}`)
        SetSearch(value);
    })

    const onSubmit = onUserEvent(() => {
        console.log(`submit: true`)
        SetSubmit(true);
    })

    const onClear = onUserEvent(() => {
        console.log(`onClear`)
        SetSearch("")
        SetMusics(undefined)
    })
    
    const onClose = onUserEvent(() => {
        console.log(`onClose`)
        SetSearch("")
        SetMusics(undefined)
        closeModal()
    })

    React.useEffect(() => {
        console.log(`submit: ${submit} / search: ${search} / playlistId: ${playlistId}`)
        if ( submit && search ) {
            SetLoading(true)
            SearchMusic(search,100)
            .then((musics) => {
                SetMusics(musics)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                SetLoading(false)
                SetSubmit(false)
            })
        }
    }, [submit])

    React.useEffect(() => {
        console.log(`playlistId: ${playlistId}`)
        if ( playlistId ) {
            SetLoading(true)
            FetchPlaylist(playlistId)
            .then((playlist) => {
                SetPlaylist(playlist)
                SetMusics(playlist.musics)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                SetLoading(false)
                SetSubmit(false)
            })
        }
    }, [playlistId])

    const columns: GridColDef[] = [
        {
            field: 'music',
            headerName: ' ',
            width: 56,
            sortable: false,
            disableColumnMenu: true,
            cellClassName: 'music-button-cell',
            renderCell: (params) => {
                if (params.row == null) {
                    return null
                }
                return <MusicButton audioPlayer={audioPlayer} music={params.row} size={56}/>
            },
        },
        {
          field: 'name',
          headerName: 'Title',
          flex: 1,
          renderCell: (params) => {
            const artist = params.row.artist ? params.row.artist.name : '-';
            const album = params.row.album ? params.row.album.name : '-';
            return <div style={{ justifyContent: 'left' }}>
                <Typography align='left'><b>{params.row.name}</b></Typography>
                <Typography align='left' color="textSecondary">{artist} / {album}</Typography>
            </div>  
          },
        },
        {
            field: 'actions',
            headerName: ' ',
            width: 50,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                if ( isMusicIncluded(params.row) ) {
                    return <IconButton
                            aria-label="Remove"
                            onClick={onUserEvent(() => { 
                                removeMusic(params.row)
                                audioPlayer.unload()
                            })}>
                        <CheckIcon />
                    </IconButton>
                }
                return <IconButton
                            aria-label="Add"
                            onClick={onUserEvent(() => { 
                                addMusic(params.row)
                                audioPlayer.unload()
                            })}
                        >
                            <AddIcon />
                        </IconButton>
            },
        },
      ];

    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '700px',
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        > 
            <Box sx={style}>
                <Grid container spacing={2} style={{ alignItems: 'center' }}>
                    
                    <Grid item xs={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '0px', marginBottom: '10px' }}>

                            {(playlistId && !playlist) && <>
                                <Typography variant="caption" display="block" gutterBottom>Loading Playlist #{playlistId}...</Typography>
                            </>}
                            {(playlistId && playlist) && <>
                                <img
                                    src={getImgUrl(playlist)}
                                    width="56" 
                                    height="56"
                                    style={{marginRight: '10px' }}
                                />
                                <Typography variant="overline" display="block" gutterBottom>{playlist.name}</Typography>
                            </>}
                            {!playlistId && <>
                                <TextField
                                    defaultValue={search}
                                    value={search}
                                    onChange={handleChange}
                                    id="outlined-name"
                                    label="Search music"
                                    margin="normal"
                                    variant="outlined"
                                    style={{minWidth:'200px'}}
                                    type="text"
                                    size="small"
                                    disabled={loading}
                                    />
                                <IconButton aria-label="Search" onClick={onSubmit} disabled={loading || !search}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton aria-label="Clear" onClick={onClear} disabled={loading || !search}>
                                    <SearchOffIcon />
                                </IconButton>
                            </>}

                    </Grid>

                    <Grid item xs={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                </Grid>

                {/* musics */}
                
                <Grid item xs={12} container spacing={1} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                    <Box sx={{ height: 400, width: '100%' }}>
                    {loading && <CircularProgress style={{ margin: '50px' }}/>} 
                    {(!loading && musics) &&
                        <DataGrid
                            density='compact'
                            rows={musics}
                            rowHeight={76}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 100,
                                    },
                                },
                            }}
                            pageSizeOptions={[100]}
                            disableRowSelectionOnClick
                            getRowId={(row) => { return row.deezerId}}
                            />}
                    </Box>

                </Grid>
            </Box>

        </Modal>
    )
}

export default SearchMusicModal
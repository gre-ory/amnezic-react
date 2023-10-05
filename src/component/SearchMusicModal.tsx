import React from 'react'

import { IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { Box, Grid, Modal, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { SearchMusic } from '../client/SearchMusic';

import { Music } from '../data/Music';
import { AudioPlayerInterface } from '../data/AudioPlayer';
import { onUserEvent, onValueEvent } from '../data/Util';

import MusicButton from './MusicButton'

interface Props {
    open: boolean
    closeModal: () => void
    isMusicIncluded: (music: Music) => boolean
    addMusic: (music: Music) => void
    audioPlayer: AudioPlayerInterface
}

const SearchMusicModal = ( props: Props ) => {
    const { open, closeModal, isMusicIncluded, addMusic, audioPlayer } = props

    const [ search, SetSearch ] = React.useState<string>("")
    const [ submit, SetSubmit ] = React.useState<boolean>(false)
    const [ musics, SetMusics ] = React.useState<Music[]>()

    const handleChange = onValueEvent((value) => {
        console.log(`search: ${value}`)
        SetSearch(value);
    })

    const onSubmit = onUserEvent(() => {
        console.log(`submit: true`)
        SetSubmit(true);
    })

    React.useEffect(() => {
        console.log(`submit: ${submit} / search: ${search}`)
        if ( submit && search ) {
            SearchMusic(search,10)
            .then((musics) => {
                SetMusics(musics)
                SetSubmit(false)
            })
            .catch((err) => {
                console.log(err)
                SetSubmit(false)
            })
        }
    }, [submit])

    const columns: GridColDef[] = [
        {
            field: 'music',
            headerName: ' ',
            width: 76,
            sortable: false,
            disableColumnMenu: true,
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
          width: 500,
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
                    return <IconButton disabled>
                        <CheckIcon />
                    </IconButton>
                }
                return <IconButton
                            aria-label="Add"
                            onClick={onUserEvent(() => { 
                                addMusic(params.row)
                                closeModal()
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
        width: 700,
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
                    
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                    <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    
                            <TextField
                                onChange={handleChange}
                                id="outlined-name"
                                label="Search"
                                margin="normal"
                                variant="outlined"
                                style={{minWidth:'200px'}}
                                type="text"
                                />
                            <IconButton aria-label="Search" onClick={onSubmit}>
                                <SearchIcon />
                            </IconButton>
                    </Grid>

                </Grid>

                {/* musics */}
                
                <Grid item xs={12} container spacing={1} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                    {musics && <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={musics}
                            rowHeight={76}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10,25,50,100]}
                            disableRowSelectionOnClick
                            getRowId={(row) => { return row.deezerId}}
                            />
                    </Box>}

                </Grid>
            </Box>

        </Modal>
    )
}

export default SearchMusicModal
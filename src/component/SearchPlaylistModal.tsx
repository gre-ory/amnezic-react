import React from 'react'

import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ForwardIcon from '@mui/icons-material/Forward';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { Box, Grid, Modal, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

import { SearchPlaylist } from '../client/SearchPlaylist';

import { Playlist, getImgUrl } from '../data/Playlist';
import { onUserEvent, onValueEvent } from '../data/Util';

interface Props {
    open: boolean
    closeModal: () => void
    selectPlaylist: (playlist: Playlist) => void
}

const SearchPlaylistModal = ( props: Props ) => {
    const { open, closeModal, selectPlaylist } = props

    const [ search, SetSearch ] = React.useState<string>("")
    const [ submit, SetSubmit ] = React.useState<boolean>(false)
    const [ loading, SetLoading ] = React.useState<boolean>(false)
    const [ playlists, SetPlaylists ] = React.useState<Playlist[]>()

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
        SetPlaylists(undefined)
    })

    const onClose = onUserEvent(() => {
        console.log(`onClose`)
        SetSearch("")
        SetPlaylists(undefined)
        closeModal()
    })

    function onPlaylist( playlist: Playlist ) {
        return onUserEvent(() => {
            SetSearch("")
            SetPlaylists(undefined)
            selectPlaylist(playlist)
        })
    }

    React.useEffect(() => {
        console.log(`submit: ${submit} / search: ${search}`)
        if ( submit && search ) {
            SetLoading(true)
            SearchPlaylist(search,100)
                .then((playlists) => {
                    SetPlaylists(playlists)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    SetLoading(false)
                    SetSubmit(false)
                })
        }
    }, [submit,search])

    const columns: GridColDef[] = [
        {
          field: 'imgUrl',
          headerName: ' ',
          width: 56,
          cellClassName: 'music-button-cell',
          renderCell: (params) => {
              return <img
                        src={getImgUrl(params.row)}
                        width="56" 
                        height="56"
                      />
          },
        },
        {
          field: 'name',
          headerName: 'Title',
          flex: 1,
        },
        {
          field: 'nbMusics',
          headerName: 'Nb musics',
          flex: 1,
        },
        {
          field: 'user',
          headerName: 'User',
          flex: 1,
        },
        {
            field: 'actions',
            headerName: ' ',
            width: 50,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return <IconButton
                            aria-label="Select"
                            onClick={onPlaylist(params.row)}
                        >
                            <ForwardIcon />
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
                    
                    <Grid item xs={10} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '0px', marginBottom: '0px' }}>
                    
                            <TextField
                                defaultValue={search}
                                value={search}
                                onChange={handleChange}
                                id="outlined-name"
                                label="Search playlist"
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
                    </Grid>

                    <Grid item xs={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                </Grid>

                

                {/* playlists */}
                
                <Grid item xs={12} container spacing={1} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <Box sx={{ height: 400, width: '100%' }}>

                    {loading && <CircularProgress style={{ margin: '50px' }}/>}   
                    {(!loading && playlists) && 
                        <DataGrid
                            density='compact'
                            rows={playlists}
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

export default SearchPlaylistModal
import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { Grid, Alert, AlertTitle, Box, Button, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { FetchTheme } from '../client/FetchTheme'
import { AddMusicToTheme } from '../client/AddMusicToTheme'
import { RemoveMusicFromTheme } from '../client/RemoveMusicFromTheme'

import { AdminStep } from '../data/Admin'
import { toAdminThemePage } from '../data/Navigate'
import { Theme } from '../data/Theme'
import { Music } from '../data/Music'
import { toGamePage, toAdminThemesPage } from '../data/Navigate'

import AdminPage from '../component/AdminPage'
import MusicButton from '../component/MusicButton'
import SearchMusicModal from '../component/SearchMusicModal'
import { onUserEvent, EventCallback } from '../data/Util';
import { AudioPlayer } from '../data/AudioPlayer';

interface Props {
}

const AdminThemePage = ( props: Props ) => {

    const navigate = useNavigate()

    const { themeId } = useParams()
    
    if ( !themeId ) {
        return null
    }
    const id = parseInt(themeId,10)

    const [theme, setTheme] = React.useState<Theme>()
    const [error, setError] = React.useState<Error>();

    const audioPlayer = new AudioPlayer()
    
    const [ searchMusicModal, setSearchMusicModal ] = React.useState( false )
    const openSearchMusicModal = () => {
        audioPlayer.pause()
        setSearchMusicModal(true)
    }
    const closeSearchMusicModal = () => {
        audioPlayer.pause()
        setSearchMusicModal(false)
    }
    const isMusicIncluded = (music: Music) => {
        if ( theme && theme.questions ) {
            for ( var question of theme.questions ) {
                if ( question.music && question.music.deezerId == music.deezerId ) {
                    return true
                }
            }
        }
        return false
    }
    const addMusic = (music: Music) => {
        if ( music.deezerId ) {
            AddMusicToTheme(id,music.deezerId).then(setTheme).catch(console.log)
        } else {
            console.log("missing deezer id!", music)
        }
    }

    const deleteMusic = (music: Music) => {
        return onUserEvent(() => {
            console.log("click >>> pause music", music.id )
            audioPlayer.pause()
            console.log("click >>> delete music", music.id )
            if ( music.id ) {
                if (window.confirm('Are you sure you wish to delete this item?')) {
                    RemoveMusicFromTheme(id,music.id).then(setTheme).catch(console.log)
                }
            } else {
                console.log("missing music id!", music)
            }
        })
    }

    React.useEffect(() => {
        FetchTheme(id)
            .then((theme) => setTheme(theme))
            .catch((err) => {
                console.error(err)
                setError(err)
            });
      }, [])

    console.log(error)
    if ( error !== undefined ) {
        return <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.message}</strong>
                </Alert>
    }
    console.log(theme)
    if ( theme === undefined ) {
        return null
    }

    const toThemes = () => {
        console.log( `[to-themes]` )
        navigate( toAdminThemesPage() )
    }

    const columns: GridColDef[] = [
        {
            field: 'music',
            headerName: ' ',
            width: 76,
            disableColumnMenu: true,
            renderCell: (params) => {
                if (params.value == null) {
                    return null
                }
                return <MusicButton audioPlayer={audioPlayer} music={params.value} size={56}/>
            },
        },
        {
          field: 'text',
          headerName: 'Questions',
          editable: true,
          hideable: false,
          width: 500,
          renderCell: (params) => {
            const artist = params.row.artist ? params.row.artist.name : '-';
            const album = params.row.album ? params.row.album.name : '-';
            return <div style={{ justifyContent: 'left' }}>
                <Typography align='left'><b>{params.row.text}</b></Typography>
                <Typography align='left' color="textSecondary">{params.row.hint}</Typography>
            </div>  
          },
        },
        {
            field: 'actions',
            headerName: ' ',
            width: 50,
            disableColumnMenu: true,
            renderCell: (params) => {
                return <IconButton
                aria-label="Delete"
                onClick={deleteMusic(params.row)}
            >
                <DeleteIcon />
            </IconButton>
            },
        },
      ];

    return (
        <AdminPage step={AdminStep.THEME}>
            <>theme {themeId}</>

            <SearchMusicModal
                open={searchMusicModal}
                closeModal={closeSearchMusicModal}
                isMusicIncluded={isMusicIncluded}
                addMusic={addMusic}
                audioPlayer={audioPlayer}
            />

            <Button 
                variant="contained" 
                color="primary"
                onClick={openSearchMusicModal}
                >
                <AddIcon />
            </Button>

            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={theme.questions || []}
                    rowHeight={76}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                            },
                        },
                    }}
                    pageSizeOptions={[10,25,50,100]}
                    disableRowSelectionOnClick
                    disableColumnSelector
                    />
            </Box>

        </AdminPage>
        
    )
}

export default AdminThemePage
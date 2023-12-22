import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { Grid, Alert, AlertTitle, Box, IconButton, Typography, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FetchTheme } from '../client/FetchTheme'
import { AddMusicToTheme } from '../client/AddMusicToTheme'
import { RemoveThemeQuestion } from '../client/RemoveThemeQuestion'
import { UpdateThemeQuestion } from '../client/UpdateThemeQuestion'
import { UpdateTheme } from '../client/UpdateTheme'

import { AdminStep } from '../data/Admin'
import { Theme, updateTitle, updateImgUrl, updateLanguageLabel, updateCategoryLabel } from '../data/Theme'
import { Language, Category, languageToLabel, categoryToLabel }  from '../data/ThemeLabels'
import { Music } from '../data/Music'
import { Playlist } from '../data/Playlist'
import { ThemeQuestion } from '../data/ThemeQuestion'
import { toAdminThemesPage } from '../data/Navigate'
import { onUserEvent, onValueEvent } from '../data/Util'
import { AudioPlayer } from '../data/AudioPlayer'

import AdminPage from '../component/AdminPage'
import MusicButton from '../component/MusicButton'
import SearchMusicModal from '../component/SearchMusicModal'
import SearchPlaylistModal from '../component/SearchPlaylistModal'
import UpdateQuestionModal from '../component/UpdateQuestionModal'

interface Props {
}

const AdminThemePage = ( props: Props ) => {

    const navigate = useNavigate()

    const { themeId } = useParams()
    
    if ( !themeId ) {
        return null
    }
    const id = parseInt(themeId,10)

    const [theme, setTheme] = React.useState<Theme>();
    const [needSave, setNeedSave] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error>();
    const [question, setQuestion] = React.useState<ThemeQuestion>();
    const [ playlistId, SetPlaylistId ] = React.useState<number>();

    const handleTitleChange = onValueEvent((value) => {
        console.log(`theme: updateTitle: ${value}`)
        if ( theme ) {
            setTheme(updateTitle(value)(theme))
            setNeedSave(true)
        }
    })

    const handleImgUrlChange = onValueEvent((value) => {
        console.log(`theme: updateImgUrl: ${value}`)
        if ( theme ) {
            setTheme(updateImgUrl(value)(theme))
            setNeedSave(true)
        }
    })

    const handleLanguageLabelChange = onValueEvent((value) => {
        console.log(`theme: updateLanguageLabel: ${value}`)
        if ( theme ) {
            setTheme(updateLanguageLabel(value !== '' ? value as Language : undefined)(theme))
            setNeedSave(true)
        }
    })

    const handleCategoryLabelChange = onValueEvent((value) => {
        console.log(`theme: updateCategoryLabel: ${value}`)
        if ( theme ) {
            setTheme(updateCategoryLabel(value as Category)(theme))
            setNeedSave(true)
        }
    })
    
    const [ updateQuestionModal, setUpdateQuestionModal ] = React.useState( false )
    const openUpdateQuestionModal = () => {
        audioPlayer.pause()
        setUpdateQuestionModal(true)
    }
    const closeUpdateQuestionModal = () => {
        audioPlayer.pause()
        setUpdateQuestionModal(false)
    }

    const audioPlayer = new AudioPlayer()
    
    const [ searchMusicModal, setSearchMusicModal ] = React.useState( false )
    const openSearchMusicModal = () => {
        audioPlayer.pause()
        setSearchMusicModal(true)
    }
    const closeSearchMusicModal = () => {
        audioPlayer.pause()
        setSearchMusicModal(false)
        SetPlaylistId(undefined)
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
    
    const removeMusic = (music: Music) => {
        if ( theme ) {
            for ( var question of theme.questions ) {
                if ( question.music && question.music.id && question.music.deezerId == music.deezerId ) {
                    RemoveThemeQuestion(id,question.id).then(setTheme).catch(console.log)
                }
            }
        }
    }

    const [ searchPlaylistModal, setSearchPlaylistModal ] = React.useState( false )
    const openSearchPlaylistModal = () => {
        audioPlayer.pause()
        setSearchPlaylistModal(true)
    }
    const closeSearchPlaylistModal = () => {
        audioPlayer.pause()
        setSearchPlaylistModal(false)
    }
    const selectPlaylist = (playlist: Playlist) => {
        console.log("select playlist", playlist)
        closeSearchPlaylistModal()
        if ( playlist.deezerId ) {
            SetPlaylistId(playlist.deezerId)
            openSearchMusicModal()
        } else {
            SetPlaylistId(undefined)
        }
    }

    const editQuestion = (question: ThemeQuestion) => {
        return onUserEvent(() => {
            console.log("click >>> pause music")
            audioPlayer.pause()
            console.log("click >>> edit question", question.id )
            if ( question.id ) {
                setQuestion(question)
                openUpdateQuestionModal()
            } else {
                console.log("missing question id!", question)
            }
        })
    }

    const updateTheme = () => {
        if ( theme ) {
            UpdateTheme(theme).then((theme) => {
                setTheme(theme)
                setNeedSave(false)
            }).catch(console.log)
        }
    }

    const updateQuestion = (question: ThemeQuestion) => {
        UpdateThemeQuestion(id,question).then(setTheme).catch(console.log)
    }

    const removeQuestion = (question: ThemeQuestion) => {
        return onUserEvent(() => {
            console.log("click >>> pause music" )
            audioPlayer.pause()
            console.log("click >>> remove question", question.id )
            if ( question.id ) {
                if (window.confirm('Are you sure you wish to delete this question?')) {
                    RemoveThemeQuestion(id,question.id).then(setTheme).catch(console.log)
                }
            } else {
                console.log("missing question id!", question)
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
            width: 56,
            cellClassName: 'music-button-cell',
            disableColumnMenu: true,
            sortable: false,
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
          flex: 1,
          renderCell: (params) => {
            const artist = params.row.artist ? params.row.artist.name : '-';
            const album = params.row.album ? params.row.album.name : '-';
            return <div style={{ justifyContent: 'left' }}>
                <Typography align='left'><b>{params.row.text ? params.row.text : "-"}</b></Typography>
                <Typography align='left' color="textSecondary">{params.row.hint ? params.row.hint : "-"}</Typography>
            </div>  
          },
        },
        {
            field: 'actions',
            headerName: ' ',
            width: 100,
            disableColumnMenu: true,
            sortable: false,
            renderHeader(params) {
                return <>
                    <IconButton 
                        color="primary"
                        aria-label="Add from playlist"
                        onClick={openSearchPlaylistModal}
                    >
                        <QueueMusicIcon />
                    </IconButton>

                    <IconButton 
                        color="primary"
                        aria-label="Add"
                        onClick={openSearchMusicModal}
                    >
                        <MusicNoteIcon />
                    </IconButton>
                </>
            },
            renderCell: (params) => {
                return <>
                    <IconButton
                        aria-label="Edit"
                        onClick={editQuestion(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="Delete"
                        onClick={removeQuestion(params.row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            },
        },
      ];

    return (
        <AdminPage title={`Theme #${theme.id} - ${theme.title}`} step={AdminStep.THEME} onBack={toThemes}>
            <Grid container spacing={0} style={{ alignItems: 'center' }}>
                <Grid item xs={10} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TextField
                        margin='dense'
                        onChange={handleTitleChange}
                        id="theme-title"
                        label="Title"
                        variant="outlined"
                        style={{width:'100%'}}
                        type="text"
                        value={theme.title}
                        size="small"
                        />
                </Grid>
                <Grid item xs={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {needSave && <IconButton color="primary" aria-label="Save" onClick={updateTheme}><SaveIcon /></IconButton>}
                    {!needSave && <IconButton disabled aria-label="Saved"><CheckIcon /></IconButton>}
                </Grid>

                <Grid item xs={10} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TextField
                        margin='dense'
                        onChange={handleImgUrlChange}
                        id="theme-img-url"
                        label="Image URL"
                        variant="outlined"
                        style={{width:'100%'}}
                        type="text"
                        value={theme.imgUrl}
                        size="small"
                        />
                </Grid>
                <Grid item xs={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {theme.imgUrl && <img src={theme.imgUrl} style={{ height: '56px', margin: '0 auto' }}/>}
                </Grid>

                <Grid item xs={5} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="select-language-label">Language</InputLabel>
                        <Select
                            labelId="select-language-label"
                            id="select-language"
                            value={theme.labels && theme.labels.language ? theme.labels.language : ""}
                            label="Language"
                            onChange={handleLanguageLabelChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={Language.French}>{languageToLabel(Language.French)}</MenuItem>
                            <MenuItem value={Language.English}>{languageToLabel(Language.English)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={5} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="select-category-label">Category</InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={theme.labels && theme.labels.category? theme.labels.category : ""}
                            label="Category"
                            onChange={handleCategoryLabelChange}
                            
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={Category.Genre}>{categoryToLabel(Category.Genre)}</MenuItem>
                            <MenuItem value={Category.Top}>{categoryToLabel(Category.Top)}</MenuItem>
                            <MenuItem value={Category.Decade}>{categoryToLabel(Category.Decade)}</MenuItem>
                            <MenuItem value={Category.Year}>{categoryToLabel(Category.Year)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                    <UpdateQuestionModal
                        open={updateQuestionModal}
                        closeModal={closeUpdateQuestionModal}
                        question={question}
                        updateQuestion={updateQuestion}
                    />
                    
                    <SearchPlaylistModal
                        open={searchPlaylistModal}
                        closeModal={closeSearchPlaylistModal}
                        selectPlaylist={selectPlaylist}
                    />
                    
                    <SearchMusicModal
                        open={searchMusicModal}
                        closeModal={closeSearchMusicModal}
                        isMusicIncluded={isMusicIncluded}
                        addMusic={addMusic}
                        removeMusic={removeMusic}
                        audioPlayer={audioPlayer}
                        playlistId={playlistId}
                    />

                    <Box sx={{ height: 500, width: '100%' }}>
                        <DataGrid
                            density='compact'
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
                            pageSizeOptions={[25]}
                            disableRowSelectionOnClick
                            disableColumnSelector
                            />
                    </Box>
                </Grid>
            </Grid>

        </AdminPage>
        
    )
}

export default AdminThemePage
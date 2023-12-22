import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IconButton, Alert, AlertTitle, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import AdminPage from '../component/AdminPage'
import CreateThemeModal from '../component/CreateThemeModal'

import { FetchThemes } from '../client/FetchThemes'
import { CreateTheme } from '../client/CreateTheme'
import { RemoveTheme } from '../client/RemoveTheme'

import { AdminStep } from '../data/Admin'
import { ThemeInfo } from '../data/ThemeInfo'
import { categoryToLabel, languageToLabel } from '../data/ThemeLabels'
import { toHomePage, toAdminThemePage } from '../data/Navigate'
import { onUserEvent } from '../data/Util'

interface Props {
}

const AdminThemesPage = ( props: Props ) => {

    const navigate = useNavigate()

    const [themes, setThemes] = React.useState<ThemeInfo[]>()
    const [error, setError] = React.useState<Error>();

    const [ createThemeModal, setCreateThemeModal ] = React.useState( false )
    const openCreateThemeModal = () => {
        setCreateThemeModal(true)
    }
    const closeCreateThemeModal = () => {
        setCreateThemeModal(false)
    }
    const createTheme = ( title: string ) => {
        if ( title ) {
            CreateTheme(title).then((theme) => { fetchThemes() }).catch(onError)
        } else {
            console.log("missing theme title!")
        }
    }
    
    const editTheme = (theme: ThemeInfo) => {
        return onUserEvent(() => {
            console.log("click >>> edit theme", theme.id )
            if ( theme.id ) {
                toTheme(theme.id)
            } else {
                console.log("missing theme id!", theme)
            }
        })
    }

    const deleteTheme = (theme: ThemeInfo) => {
        console.log("click >>> delete theme", theme.id )
        if ( theme.id ) {
            if (window.confirm('Are you sure you wish to delete this item?')) {
                RemoveTheme(theme.id).then((ok) => { fetchThemes() }).catch(console.log)
            }
        } else {
            console.log("missing theme id!", theme)
        }
    }
    
    const fetchThemes = () => {
        FetchThemes()
            .then((themes) => setThemes(themes))
            .catch(onError);
    }

    const onError = (err: Error) => {
        console.error(err)
        setError(err)
    }

    React.useEffect(() => {
        fetchThemes()
    }, [])

    console.log(error)
    if ( error !== undefined ) {
        return <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.message}</strong>
                </Alert>
    }
    console.log(themes)
    if ( themes === undefined ) {
        return null
    }

    const toHome = () => {
        console.log( `[to-home]` )
        navigate( toHomePage() )
    }

    const toTheme = ( themeId: number ) => {
        console.log( `[to-theme] ${themeId}` )
        navigate( toAdminThemePage( themeId ) )
    }

    const columns: GridColDef[] = [
        // {
        //   field: 'imgUrl',
        //   headerName: ' ',
        //   cellClassName: 'music-button-cell',
        //   width: 56,
        //   editable: false,
        //   disableColumnMenu: true,
        //   sortable: false,
        //   renderCell: (params) => {
        //     if ( params.value == null ) {
        //         return null
        //     }
        //     return <img src={params.value} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        //   },
        // },
        {
          field: 'title',
          headerName: 'Title',
          flex: 3,
          editable: false,
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            editable: false,
            valueGetter: (params) => {
                const theme = params.row as ThemeInfo
                if ( !theme.labels || !theme.labels.category ) {
                    return '-'
                }
                return `${categoryToLabel(theme.labels.category)}`
            },
        },
        {
            field: 'language',
            headerName: 'Language',
            flex: 1,
            editable: false,
            valueGetter: (params) => {
                const theme = params.row as ThemeInfo
                if ( !theme.labels || !theme.labels.language ) {
                    return '-'
                }
                return `${languageToLabel(theme.labels.language)}`
            },
        },
        {
          field: 'nbQuestion',
          headerName: ' ',
          type: 'number',
          width: 50,
          editable: false,
          disableColumnMenu: true,
          valueFormatter: (params) => {
            if ( params.value == null ) {
                return '-'
            }
            return `${params.value}`
          },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 100,
          editable: false,
          disableColumnMenu: true,
          sortable: false,
          renderHeader(params) {
              return <IconButton 
              color="primary"
              aria-label="Add"
              onClick={openCreateThemeModal}
              >
              <AddIcon />
          </IconButton>
          },
          renderCell: (params) => {
              return <>
              <IconButton
                  aria-label="Edit"
                  onClick={editTheme(params.row)}
              >
                  <EditIcon />
              </IconButton>
              <IconButton
              aria-label="Delete"
              onClick={() => { deleteTheme(params.row) }}
          >
              <DeleteIcon />
          </IconButton>
          </>
              
              
              
              
              
        },
        },
      ];

    return (
        <AdminPage step={AdminStep.THEMES} onBack={toHome}>
            <Box sx={{ height: 400, width: '100%' }}>

            <CreateThemeModal
                open={createThemeModal}
                closeModal={closeCreateThemeModal}
                createTheme={createTheme}
            />

                <DataGrid
                    rows={themes}
                    columns={columns}
                    rowHeight={56}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10,25,50,100]}
                    disableRowSelectionOnClick
                    density="compact"
                    />
            </Box>
        </AdminPage>
    )
}

export default AdminThemesPage
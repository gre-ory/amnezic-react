import React from 'react'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import AdminPage from '../component/AdminPage'

import { FetchThemes } from '../client/FetchThemes'

import { AdminStep } from '../data/Admin'
import { ThemeInfo } from '../data/ThemeInfo'
import { toAdminThemePage } from '../data/Navigate'
import { toGamePage, toAdminThemesPage } from '../data/Navigate'

interface Props {
}

const AdminThemesPage = ( props: Props ) => {

    const navigate = useNavigate()

    const [themes, setThemes] = React.useState<ThemeInfo[]>()
    const [error, setError] = React.useState<Error>();

    React.useEffect(() => {
        FetchThemes()
            .then((themes) => setThemes(themes))
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
    console.log(themes)
    if ( themes === undefined ) {
        return null
    }

    const toTheme = ( themeId: number ) => {
        console.log( `[to-theme] ${themeId}` )
        navigate( toAdminThemePage( themeId ) )
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'imgUrl',
          headerName: 'Picture',
          width: 150,
          editable: false,
          renderCell: (params) => {
            if ( params.value == null ) {
                return null
            }
            return <img src={params.value} style={{ width: '100px', height: '100px' }} />
          },
        },
        {
          field: 'title',
          headerName: 'Title',
          width: 150,
          editable: true,
        },
        {
          field: 'nbQuestion',
          headerName: 'Nb Questions',
          type: 'number',
          width: 110,
          editable: false,
          valueFormatter: (params) => {
            if ( params.value == null ) {
                return '-'
            }
            if ( params.value == 1 ) {
                return `${params.value} question`
            }
            return `${params.value} questions`
          },
        },
      ];

    return (
        <AdminPage step={AdminStep.THEMES}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={themes}
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
                    onRowClick={(params,event,details) => {
                        toTheme(params.row.id)
                    }}
                    />
            </Box>
        </AdminPage>
    )
}

export default AdminThemesPage
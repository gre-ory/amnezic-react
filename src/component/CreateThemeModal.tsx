import React from 'react'

import { IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { Box, Grid, Modal, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { onUserEvent, onValueEvent } from '../data/Util';

interface Props {
    open: boolean
    closeModal: () => void
    createTheme: (title: string, imgUrl?: string) => void
}

const CreateThemeModal = ( props: Props ) => {
    const { open, closeModal, createTheme } = props

    const [ title, SetTitle ] = React.useState<string>()

    const handleTitleChange = onValueEvent((value) => {
        console.log(`SetTitle: ${value}`)
        SetTitle(value);
    })

    const onSubmit = onUserEvent(() => {
        console.log(`createTheme: ${title}`)
        if ( title ) {
            createTheme(title);
            closeModal();
        }
    })

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
                <Grid container spacing={0} style={{ alignItems: 'center' }}>
                    
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton aria-label="Close" onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <TextField
                            onChange={handleTitleChange}
                            id="theme-title"
                            label="Title"
                            margin="normal"
                            variant="outlined"
                            style={{minWidth:'200px'}}
                            type="text"
                            />
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <Button aria-label="Create" onClick={onSubmit}>
                            <AddIcon />
                        </Button>
                    </Grid>

                </Grid>

            </Box>

        </Modal>
    )
}

export default CreateThemeModal
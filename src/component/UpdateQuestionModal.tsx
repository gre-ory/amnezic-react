import React from 'react'

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, Modal, Button, TextField } from '@mui/material';

import { ThemeQuestion } from '../data/ThemeQuestion';
import { onUserEvent, onValueEvent } from '../data/Util';

interface Props {
    open: boolean
    closeModal: () => void
    question?: ThemeQuestion
    updateQuestion: (question: ThemeQuestion) => void
}

const UpdateQuestionModal = ( props: Props ) => {
    const { open, closeModal, question, updateQuestion } = props

    const [ text, SetText ] = React.useState<string>("")
    const [ hint, SetHint ] = React.useState<string>("")

    const handleTextChange = onValueEvent((value) => {
        console.log(`text: ${value}`)
        SetText(value);
    })

    const handleHintChange = onValueEvent((value) => {
        console.log(`hint: ${value}`)
        SetHint(value);
    })

    const onSubmit = onUserEvent(() => {
        if ( question ) {
            console.log(`[update-question] text: ${text} / hint: ${hint}`)
            updateQuestion({ ...question, text: text, hint: hint});
            closeModal();
        }
    })

    React.useEffect(() => {
        if ( question ) {
            SetText(question.text)
            SetHint(question.hint)
        }
    }, [question])

    if ( !question ) {
        return null
    }

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

                <Grid container spacing={0} style={{ alignItems: 'center' }}>
                    
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton aria-label="Close" onClick={onSubmit}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <TextField
                            onChange={handleTextChange}
                            id="theme-title"
                            label="Text"
                            margin="dense"
                            variant="outlined"
                            style={{width:'100%'}}
                            type="text"
                            value={text}
                            />
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    <TextField
                            onChange={handleHintChange}
                            id="theme-title"
                            label="Hint"
                            margin="dense"
                            variant="outlined"
                            style={{width:'100%'}}
                            type="text"
                            value={hint}
                            />
                    </Grid>

                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <Button aria-label="Save" onClick={onSubmit}>
                            <SaveIcon />
                        </Button>
                    </Grid>

                </Grid>

            </Box>

        </Modal>
    )
}

export default UpdateQuestionModal
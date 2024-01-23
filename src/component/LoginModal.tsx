import React from 'react'

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import { Box, Grid, Modal, TextField } from '@mui/material';

import { Login } from '../client/Login';

import { LoginRequest } from '../data/LoginRequest';
import { UserSession } from '../data/UserSession';
import { onUserEvent, onValueEvent } from '../data/Util';

interface Props {
    open: boolean
    closeModal: () => void
    onLogin: (session: UserSession) => void
}

const LoginModal = ( props: Props ) => {
    const { open, closeModal, onLogin } = props

    const [ name, SetName ] = React.useState<string>("")
    const [ password, SetPassword ] = React.useState<string>("")
    const [ submit, SetSubmit ] = React.useState<boolean>(false)

    const handleNameChange = onValueEvent((value) => {
        console.log(`name: ${value}`)
        SetName(value);
    })

    const handlePasswordChange = onValueEvent((value) => {
        console.log(`password: ${value}`)
        SetPassword(value);
    })

    const onSubmit = onUserEvent(() => {
        console.log(`submit: true`)
        SetSubmit(true);
    })

    const onClear = onUserEvent(() => {
        console.log(`onClear`)
        SetName("")
        SetPassword("")
    })
    
    const onClose = onUserEvent(() => {
        console.log(`onClose`)
        SetName("")
        SetPassword("")
        closeModal()
    })

    const onSession = (session: UserSession) => {
        console.log(`onSession`)
        SetName("")
        SetPassword("")
        onLogin(session)
        closeModal()
    }

    const onError = (err: any) => {
        console.log(err)
    }

    React.useEffect(() => {
        console.log(`submit: ${submit} / name: ${name} / password: ${password}`)
        if ( submit && name && password ) {
            console.log( `[login] ${name} - ${password}` )
            Login({ name: name, password: password })
                .then(onSession)
                .catch(onError)
                .finally(() => {
                    SetSubmit(false)
                })
        }
    }, [submit])

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

                        <TextField
                            defaultValue={name}
                            value={name}
                            onChange={handleNameChange}
                            id="outlined-name"
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            style={{minWidth:'200px'}}
                            type="text"
                            size="small"
                            />
                        <TextField
                            defaultValue={password}
                            value={password}
                            onChange={handlePasswordChange}
                            id="outlined-password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            style={{minWidth:'200px'}}
                            type="password"
                            size="small"
                            />
                        <IconButton aria-label="Search" onClick={onSubmit} disabled={submit || !name || !password}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="Clear" onClick={onClear} disabled={submit || ( !name && !password )}>
                            <SearchOffIcon />
                        </IconButton>

                    </Grid>

                    <Grid item xs={2} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                </Grid>

            </Box>

        </Modal>
    )
}

export default LoginModal
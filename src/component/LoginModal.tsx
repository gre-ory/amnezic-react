import React from 'react'

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Box, Modal, TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { Login } from '../client/Login';

import { UserSession } from '../data/UserSession';
import { onUserEvent, onValueEvent, onEnterEvent } from '../data/Util';

interface Props {
    open: boolean
    closeModal: () => void
    onLogin: (session: UserSession) => void
}

const LoginModal = ( props: Props ) => {
    const { open, closeModal, onLogin } = props

    const [ name, SetName ] = React.useState<string>("")
    const [ password, SetPassword ] = React.useState<string>("")
    const [ error, SetError ] = React.useState<string>("")
    const [ submit, SetSubmit ] = React.useState<boolean>(false)

    const handleNameChange = onValueEvent((value) => {
        console.log(`name: ${value}`)
        SetName(value);
    })

    const handlePasswordChange = onValueEvent((value) => {
        console.log(`password: ${value}`)
        SetPassword(value);
    })

    const login = () => {
        if ( name && password ) {
            console.log( `[login] ${name} - ${password} >>> submit` )
            SetSubmit(true);
        }
    }
    const onSubmit = onUserEvent(login)
    const onEnter = onEnterEvent(login)
    
    const onClose = onUserEvent(() => {
        console.log(`onClose`)
        SetName("")
        SetPassword("")
        closeModal()
    })

    React.useEffect(() => {
        
        const onSession = (session: UserSession) => {
            console.log(`onSession`)
            SetName("")
            SetPassword("")
            onLogin(session)
            closeModal()
        }

        const onError = (err: any) => {
            console.log(`onError`)
            console.log(err)
            SetError("Wrong credentials")
        }

        console.log(`submit: ${submit}`)
        if ( submit ) {
            SetError("")
            Login({ name: name, password: password })
                .then(onSession)
                .catch(onError)
                .finally(() => {
                    SetSubmit(false)
                })
        }
    }, [submit, name, password, SetName, SetPassword, onLogin, closeModal])

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
                
                <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Login
                </div>

                <div>
                    <TextField
                        defaultValue={name}
                        value={name}
                        onChange={handleNameChange}
                        onKeyDown={onEnter}
                        id="outlined-name"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        style={{minWidth:'200px'}}
                        type="text"
                        size="small"
                        />
                        
                </div>   

                <div>
                    <TextField
                        defaultValue={password}
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={onEnter}
                        id="outlined-password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        style={{minWidth:'200px'}}
                        type="password"
                        size="small"
                        />
                </div>

                {error && 
                    <Snackbar
                        open
                        autoHideDuration={6000}
                        message={error}
                        sx={{ bottom: { xs: 90, sm: 0 } }}
                        />
                }

                <div style={{ textAlign: 'right' }}>
                {submit ? <>loading</> : <>
                    <Button variant="outlined" onClick={closeModal} style={{ marginRight: '20px' }}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit} disabled={submit || !name || !password}>Login</Button>
                </>}
                </div>

                <IconButton aria-label="Close" onClick={onClose} size="small" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <CloseIcon />
                </IconButton>

            </Box>

        </Modal>
    )
}

export default LoginModal
import React from 'react'

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Box, Grid, Modal, Typography } from '@mui/material';
import { ALL_AVATAR_IDS, AvatarId } from '../data/Avatar';
import PlayerAvatar, { AvatarSize } from './PlayerAvatar';

interface Props {
    open: boolean
    closeModal: () => void
    avatarId: AvatarId
    onAvatarChange: (avatarId: AvatarId) => void
}

const AvatarModal = ( props: Props ) => {
    const { open, closeModal, avatarId, onAvatarChange } = props
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
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
                <Grid container spacing={2} style={{ alignItems: 'flex-end' }}>
                    
                    <Grid item xs={12} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                        <IconButton aria-label="Close" onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>

                    </Grid>

                    <Grid item xs={4} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    
                        <PlayerAvatar id={avatarId} size={AvatarSize.XL} />

                    </Grid>

                    {/* symbols */}
                    
                    <Grid item xs={8} container spacing={1} textAlign="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 

                        <Grid item xs={12} textAlign="left">
                            <Typography>
                                <b>Avatars</b>
                            </Typography> 
                        </Grid>

                        {
                            ALL_AVATAR_IDS.map( newAvatarId => { 
                                return (
                                    <Grid key={newAvatarId} item xs={3}>
                                        <PlayerAvatar 
                                            id={newAvatarId} 
                                            size={AvatarSize.M}
                                            selected={avatarId == newAvatarId} 
                                            onClick={() => onAvatarChange(newAvatarId)}
                                        />
                                    </Grid>
                                )
                            } )
                        }

                    </Grid>

                </Grid>
            </Box>

        </Modal>
    )
}

export default AvatarModal
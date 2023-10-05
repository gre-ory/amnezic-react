import React from 'react'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { Game } from '../data/Game'

interface Props {
}

const GameFooter = ( props: Props ) => {

    return (
        <>
            {/* <Box className="footer" sx={{ marginTop: '20px', flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar style={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="caption" display="block" color="GrayText" gutterBottom>
                            @mnezic
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box> */}
        </>
    )
}

export default GameFooter
import React from 'react'

import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';

interface Props {
    title?: string
    onClick: () => void
}

const ReplayButton = ( props: Props ) => {
    const { title, onClick } = props
    const description = title && title != '' ? title : 'Replay'    

    return (
        <IconButton color="secondary" title={description} aria-label={description} onClick={onClick}>
            <ReplayIcon />
        </IconButton>
    )
}

export default ReplayButton
import React from 'react'

import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';

import { onUserEvent } from '../data/Util'

interface Props {
    title?: string
    onNext: () => void
}

const AdminButton = ( props: Props ) => {
    const { title, onNext } = props
    const description = title && title != '' ? title : 'Next'   
    
    // user events

    const onClick = onUserEvent( onNext )

    return (
        <IconButton color="secondary" title={description} onClick={onClick}>
            <FolderIcon />
        </IconButton>
    )
}

export default AdminButton
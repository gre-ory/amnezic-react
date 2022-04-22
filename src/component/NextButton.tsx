import React from 'react'

import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { onUserEvent } from '../data/Util'

interface Props {
    title?: string
    onNext: () => void
}

const NextButton = ( props: Props ) => {
    const { title, onNext } = props
    const description = title && title != '' ? title : 'Next'   
    
    // user events

    const onClick = onUserEvent( onNext )

    return (
        <IconButton color="secondary" title={description} aria-label={description} onClick={onClick}>
            <SkipNextIcon />
        </IconButton>
    )
}

export default NextButton
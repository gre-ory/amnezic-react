import React from 'react'

import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface Props {
    title?: string
    onClick: () => void
}

const NextButton = ( props: Props ) => {
    const { title, onClick } = props
    const description = title && title != '' ? title : 'Next'    

    return (
        <IconButton color="secondary" title={description} aria-label={description} onClick={onClick}>
            <SkipNextIcon />
        </IconButton>
    )
}

export default NextButton
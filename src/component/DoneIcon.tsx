import React from 'react'

import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    title?: string
    done: boolean
}

const DoneIcon = ( props: Props ) => {
    const { title, done } = props
    const description = title && title != '' ? title : 'Done'

    if ( done ) {
        return (
            <CheckIcon color="success" />
        )
    }
    return (
        <CloseIcon color="error" />
    )
}

export default DoneIcon
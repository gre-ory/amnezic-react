import React from 'react'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    title?: string
    done: boolean
}

const DoneIcon = ( props: Props ) => {
    const { done } = props

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
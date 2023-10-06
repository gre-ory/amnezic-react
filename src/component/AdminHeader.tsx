import React from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'

import { AdminStep } from '../data/Admin'

interface Props {
    title?: string
    step?: AdminStep
    onPrevious?: () => void
    onNext?: () => void
}

const Header = ( props: Props ) => {
    const { title, step, onPrevious, onNext } = props

    const navigate = useNavigate()

    // title helpers

    const themesTitle = 'Themes'
    const themeTitle = 'Theme'

    // selected helpers

    const isNoneSelected = step === undefined
    const isThemesSelected = step == AdminStep.THEMES
    const isThemeSelected = step == AdminStep.THEME

    // title 

    const finalTitle = title ? title : 
                        isThemesSelected ? themesTitle : 
                        isThemeSelected ? themeTitle : ''

    return (
        <Box className="header" sx={{ flexGrow: 1 }} style={{ marginBottom: '20px' }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* title */}

                        <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{finalTitle}</div>

                        {/* Previous & Next */}
                        
                        <div>

                            { onPrevious && (
                                <IconButton 
                                    aria-label="Previous" 
                                    color="info"
                                    onClick={onPrevious}
                                >
                                    <SkipPreviousIcon />
                                </IconButton>
                            ) }
                            
                            { onNext && (
                                <IconButton 
                                    aria-label="Next" 
                                    color="info"
                                    onClick={onNext}
                                >
                                    <SkipNextIcon />
                                </IconButton>
                            ) }

                        </div>

                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header

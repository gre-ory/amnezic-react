import React from 'react'

import { Language, categoryToLabel, languageToLabel, languageToImgUrl } from '../data/ThemeLabels'

interface Props {
    language?: Language
    size?: number
}

const LanguageChip = ( props: Props ) => {
    const { language, size } = props

    const imgUrl = languageToImgUrl(language)
    const label = languageToLabel(language)

    return <img width={size || 20} height={size || 20} src={imgUrl} alt={label} title={label} />
}

export default LanguageChip
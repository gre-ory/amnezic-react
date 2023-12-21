// //////////////////////////////////////////////////
// import

import { ThemeQuestion } from './ThemeQuestion'
import { ThemeLabels, Language, Category, updateLanguage, updateCategory } from './ThemeLabels'

// //////////////////////////////////////////////////
// theme

export interface Theme {
    id: number
    title: string
    imgUrl: string
    labels: ThemeLabels
    questions: ThemeQuestion[]
}

// //////////////////////////////////////////////////
// update

export type ThemeUpdater = ( theme: Theme ) => Theme

export function updateTitle( title: string ): ThemeUpdater {
    return ( theme: Theme ): Theme => {
        return { ...theme, title: title }
    }
}

export function updateImgUrl( imgUrl: string ): ThemeUpdater {
    return ( theme: Theme ): Theme => {
        return { ...theme, imgUrl: imgUrl }
    }
}

export function updateLanguageLabel( language?: Language ): ThemeUpdater {
    return ( theme: Theme ): Theme => {
        return { ...theme, labels: updateLanguage(language)(theme.labels) }
    }
}

export function updateCategoryLabel( category?: Category ): ThemeUpdater {
    return ( theme: Theme ): Theme => {
        return { ...theme, labels: updateCategory(category)(theme.labels) }
    }
}
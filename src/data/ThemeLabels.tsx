
// //////////////////////////////////////////////////
// theme labels

export interface ThemeLabels {
    category?: Category
    language?: Language
}

export enum Language {
    French = 'fr',
    English = 'en',
}

export enum Category {
    Top = 'top',
    Genre = 'genre',
    Decade = 'decade',
    Year = 'year',
}

// //////////////////////////////////////////////////
// update

export type ThemeLabelsUpdater = ( labels: ThemeLabels ) => ThemeLabels

export function updateLanguage( language?: Language ): ThemeLabelsUpdater {
    return ( labels: ThemeLabels ): ThemeLabels => {
        return { ...labels, language: language }
    }
}

export function updateCategory( category?: Category ): ThemeLabelsUpdater {
    return ( labels: ThemeLabels ): ThemeLabels => {
        return { ...labels, category: category }
    }
}

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

export function languageToLabel( language?: Language ): string {
    switch ( language ) {
        case Language.French: return 'French'
        case Language.English: return 'English'
    }
    return 'Unknown'
}

export function languageToImgUrl( language?: Language ): string {
    switch ( language ) {
        case Language.French: return 'http://158.178.206.68/static/logo/france.png'
        case Language.English: return 'http://158.178.206.68/static/logo/united-kingdom.png'
    }
    return 'http://158.178.206.68/static/logo/question-mark.png'
}

export enum Category {
    Top = 'top',
    Genre = 'genre',
    Decade = 'decade',
    Year = 'year',
}

export function categoryToLabel( category?: Category ): string {
    switch ( category ) {
        case Category.Top: return 'Top'
        case Category.Genre: return 'Genre'
        case Category.Decade: return 'Decade'
        case Category.Year: return 'Year'
    }
    return 'Others'
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
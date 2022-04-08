import { Game } from './Game'

// //////////////////////////////////////////////////
// navigate

export function toHomePage(): string {
    return `/`
}

export function toSettingsPage( game: Game ): string {
    return `/game/${game.id}/settings`
}

export function toPlayersPage( game: Game ): string {
    return `/game/${game.id}/players`
}

export function toQuizzPage( game: Game ): string {
    return `/game/${game.id}/quizz/${game.questionId}`
}

export function toScoresPage( game: Game ): string {
    return `/game/${game.id}/scores`
}

export function toEndPage( game: Game ): string {
    return `/game/${game.id}/end`
}

export function toGamePage( game: Game | undefined ): string {
    if ( !game ) {        
        return toHomePage()
    }
    if ( game.page == 'settings' ) {
        return toSettingsPage( game )
    } else if ( game.page == 'players' ) {
        return toPlayersPage( game )
    } else if ( game.page == 'quizz' ) {
        return toQuizzPage( game )
    } else if ( game.page == 'scores' ) {
        return toScoresPage( game )
    } else if ( game.page == 'end' ) {
        return toEndPage( game )
    }
    return toHomePage()
}

// //////////////////////////////////////////////////
// range

export function range( nb: number ): number[] {
    return Array.from( Array( nb ).keys() )
}

// //////////////////////////////////////////////////
// range

export function toDecimalString( value: number ): string {
    if ( value < 10 ) {
        return `0${value}`
    }
    return `${value}`
}

export function toDateString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    const date = new Date( value )
    const year = date.getFullYear()
    const month = toDecimalString( date.getMonth() + 1 )
    const day = toDecimalString( date.getDate() )
    return `${year}-${month}-${day}`
}

export function toTimeString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    const date = new Date( value )
    const hours = toDecimalString( date.getHours() )
    const minutes = toDecimalString( date.getMinutes() )
    return `${hours}h${minutes}`
}

export function toDateTimeString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    return `${toDateString(value)} ${toTimeString(value)}`
}

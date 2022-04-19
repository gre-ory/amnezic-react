
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

export function toZeroPadString( value: number, padSize: number ): string {
    return `${value}`.padStart( padSize, '0' )
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

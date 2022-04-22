
// //////////////////////////////////////////////////
// range

export function range( nb: number ): number[] {
    return Array.from( Array( nb ).keys() )
}

// //////////////////////////////////////////////////
// format

export function toZeroPadString( value: number, padSize: number ): string {
    return `${value}`.padStart( padSize, '0' )
}

export function toDateString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    const date = new Date( value )
    const year = date.getFullYear()
    const month = toZeroPadString( date.getMonth() + 1, 2 )
    const day = toZeroPadString( date.getDate(), 2 )
    return `${year}-${month}-${day}`
}

export function toTimeString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    const date = new Date( value )
    const hours = toZeroPadString( date.getHours(), 2 )
    const minutes = toZeroPadString( date.getMinutes(), 2 )
    return `${hours}h${minutes}`
}

export function toDateTimeString( value: number ): string {
    if ( value <= 0 ) {
        return '-'
    }
    return `${toDateString(value)} ${toTimeString(value)}`
}

// //////////////////////////////////////////////////
// user event

export type Callback = () => void
export type EventCallback = ( event: any ) => void

export function onUserEvent( callback: Callback ): EventCallback {
    return ( event: any ) => {
        callback()
        event.stopPropagation()
    }
}

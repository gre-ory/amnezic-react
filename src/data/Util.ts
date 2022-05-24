
// //////////////////////////////////////////////////
// range

export function range( nb: number ): number[] {
    return Array.from( Array( nb ).keys() )
}

export function pickIndexes( nbSelected: number, nbTotal: number ): number[] {    

    if ( nbTotal <= nbSelected ) {
        return shuffle( range( nbTotal ) )
    }

    var selected = new Set<number>();
    for( var i = 0; i < nbSelected; i++ ) {
        var j = Math.random() * nbTotal | 0;
        while(selected.has(j)){
            j = Math.random() * nbTotal | 0;
        }
        selected.add( j );
    }
    return Array.from( selected )
}

export function pick<T>( values: T[] ): T {
    return values[ Math.random() * values.length | 0 ];
}

export function shuffle<T>( values: T[] ) {
    for ( let i = values.length - 1; i > 0; i-- ) {
        let j = Math.random() * ( i + 1 ) | 0;
        [ values[ i ], values[ j ] ] = [ values[ j ], values[ i ] ];
    }
    return values
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
    const seconds = toZeroPadString( date.getSeconds(), 2 )
    return `${hours}:${minutes}:${seconds}`
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

// //////////////////////////////////////////////////
// key event

export type KeyCallback = ( key: string ) => boolean
export type KeyEventCallback = ( event: any ) => void

export function onKeyEvent( keyCallback: KeyCallback ): EventCallback {
    return ( event: any ) => {
        if ( keyCallback( event.key ) ) {
            event.stopPropagation()
        }
    }
}

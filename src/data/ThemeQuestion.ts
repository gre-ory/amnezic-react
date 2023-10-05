
// //////////////////////////////////////////////////
// import

import { Music } from './Music'

// //////////////////////////////////////////////////
// theme question

export interface ThemeQuestion {
    id: number
    text: string
    hint: string
    music: Music
}
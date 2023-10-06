// //////////////////////////////////////////////////
// import

import { ThemeQuestion } from './ThemeQuestion'

// //////////////////////////////////////////////////
// theme

export interface Theme {
    id: number
    title: string
    imgUrl: string
    questions: ThemeQuestion[]
}
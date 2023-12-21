
// //////////////////////////////////////////////////
// import

import { ThemeLabels } from './ThemeLabels'

// //////////////////////////////////////////////////
// theme info

export interface ThemeInfo {
    id: number
    title: string
    imgUrl: string
    nbQuestion: number
    labels: ThemeLabels
}
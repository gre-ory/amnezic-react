
import { customAlphabet } from 'nanoid'

import { Card } from './Card'
import { PlayerStats, newPlayerStats } from './PlayerStats'

// //////////////////////////////////////////////////
// status

export type PlayerStatus =
  | 'paused'
  | 'active'

// //////////////////////////////////////////////////
// model

// export const newPlayerId = customAlphabet( 'ABCDEFGHIJKLMNPQRSTUVWXYZ', 3 )
export const newPlayerId = customAlphabet( '0123456789', 3 )

export type PlayerId = string

export interface Player {
  id: PlayerId
  number: number,
  name: string
  status: PlayerStatus
  card: Card
  stats: PlayerStats  
}

export type PlayerUpdater = ( player: Player ) => Player

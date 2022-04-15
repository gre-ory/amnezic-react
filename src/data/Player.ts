
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
  status: PlayerStatus
  card: Card
  stats: PlayerStats
  number?: number
  name?: string
}

export type PlayerUpdater = ( player: Player ) => Player

// //////////////////////////////////////////////////
// create

export function newPlayer( card: Card ): Player {
  return {
    id: `P-${newPlayerId()}`, 
    status: 'active',
    card: card,
    stats: newPlayerStats(),
  }
}

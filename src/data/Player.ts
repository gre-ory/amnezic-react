
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

export type PlayerId = number

export interface Player {
  id: PlayerId
  playerNumber: number,
  name: string
  status: PlayerStatus
  card: Card
  stats: PlayerStats  
}

export type PlayerUpdater = ( player: Player ) => Player

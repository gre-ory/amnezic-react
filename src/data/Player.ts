
import { customAlphabet } from 'nanoid'
import { AvatarId } from './Avatar'

import { Card } from './Card'
import { PlayerStats } from './PlayerStats'

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
  number: number
  avatarId: AvatarId
  name: string
  status: PlayerStatus
  card: Card
  stats: PlayerStats  
}

export type PlayerUpdater = ( player: Player ) => Player

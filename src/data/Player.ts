
import { CardType } from './CardType'
import { PlayerStatus } from './PlayerStatus'

// //////////////////////////////////////////////////
// model

export interface Player {
  id: number
  status: PlayerStatus
  name: string
  card?: CardType
  score?: number
}

// //////////////////////////////////////////////////
// create

export function newPlayer( id: number ): Player {
  return {
    id: id,
    status: 'active',
    name: `Player #${id}`,
    score: 0,
  }
}

export function newPlayers( nbPlayer: number ): Player[] {
  return Array.from( { length: nbPlayer }, ( _, i ) => newPlayer( i + 1 ) )
}

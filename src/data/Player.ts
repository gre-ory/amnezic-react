
import { Card, DefaultCards } from './Card'
import { PlayerStatus } from './PlayerStatus'

// //////////////////////////////////////////////////
// model

export interface Player {
  id: number
  status: PlayerStatus
  name: string
  card: Card
  score?: number
}

// //////////////////////////////////////////////////
// create

export function newPlayer( id: number, card: Card ): Player {
  return {
    id: id,
    status: 'active',
    name: `Player #${id}`,
    card: card,
    score: 0,
  }
}

export function newPlayers( nbPlayer: number ): Player[] {
  return Array.from( { length: nbPlayer }, ( _, i ) => newPlayer( i + 1, DefaultCards[i] ) )
}

// //////////////////////////////////////////////////
// update

export function updateName( prev: Player, name: string ): Player {
  return {
    ...prev,
    name: name,
  }
}

export function updateScore( prev: Player, score: number ): Player {
  return {
    ...prev,
    score: score,
  }
}

export function updateCard( prev: Player, card: Card ): Player {
  return {
    ...prev,
    card: card,
  }
}

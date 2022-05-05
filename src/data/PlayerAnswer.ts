
import { AnswerId } from "./Answer"
import { PlayerId } from "./Player"

// //////////////////////////////////////////////////
// model

export interface PlayerAnswer {
  playerId: PlayerId
  answerId: AnswerId
  correct?: boolean
  score?: number
}

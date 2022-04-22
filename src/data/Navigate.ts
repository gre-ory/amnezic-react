import { Game, GameStep } from './Game'

// //////////////////////////////////////////////////
// navigate

export function toHomePage(): string {
  return `/`
}

export function toSettingsPage( game: Game ): string {
  return `/game/${game.id}/settings`
}

export function toPlayersPage( game: Game ): string {
  return `/game/${game.id}/players`
}

export function toQuizzPage( game: Game ): string {
  if ( !game.questionId ) {
    return `/game/${game.id}/start`    
  }
  return `/game/${game.id}/question/${game.questionId}`
}

export function toScoresPage( game: Game ): string {
  return `/game/${game.id}/scores`
}

export function toEndPage( game: Game ): string {
  return `/game/${game.id}/end`
}

export function toGamePage( game: Game | undefined ): string {
  if ( game ) {
    switch ( game.step ) {
      case GameStep.SETTINGS:
        return toSettingsPage( game )
      case GameStep.PLAYERS:
        return toPlayersPage( game )
      case GameStep.QUIZZ:
        return toQuizzPage( game )
      case GameStep.SCORES:
        return toScoresPage( game )
      case GameStep.END:
        return toEndPage( game )
    }  
  }
  return toHomePage()
}
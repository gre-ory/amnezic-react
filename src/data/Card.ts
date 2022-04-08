
//
// french  : heart, diamond|tile, clover|club, pike|spade
// german  : heart, bell, acorn, leave
// swiss   : rose, bell, acorn, shield
// italian : cup|coppe, coin|denari, club|bastoni, sword|spade
// spanish : cup|copas, coin|oros, cluc|bastos, sword|espadas
//

export type CardSymbol = 
  | 'heart' 
  | 'diamond' 
  | 'club' 
  | 'spade' 
  | 'star' 
  | 'dot'

export type CardColor = 
  | 'white' 
  | 'gray' 
  | 'black' 
  | 'red'  
  | 'blue'  
  | 'green'  
  | 'purple'
  | 'yellow'  
  | 'orange'      
  | 'pink'  
  | 'brown'  

export type CardShape = 
  | 'square' 
  | 'normal' 
  | 'tarot'  

export type CardSize = 
  | 'small' 
  | 'medium' 
  | 'large'
  
export interface Card {
  readonly symbol: CardSymbol
  readonly color: CardColor
  readonly shape: CardShape
  value?: string
  size?: CardSize
}

export const HeartCard: Card = { symbol: 'heart', color: 'red', shape: 'normal' }
export const DiamondCard: Card = { symbol: 'diamond', color: 'red', shape: 'normal' }
export const ClubCard: Card = { symbol: 'club', color: 'green', shape: 'normal' }
export const SpadeCard: Card = { symbol: 'spade', color: 'black', shape: 'normal' }

export const Cards: Card[] = [ HeartCard, DiamondCard, ClubCard, SpadeCard ]

export const HeartTarotCard: Card = { symbol: 'heart', color: 'red', shape: 'tarot' }
export const DiamondTarotCard: Card = { symbol: 'diamond', color: 'red', shape: 'tarot' }
export const ClubTarotCard: Card = { symbol: 'club', color: 'green', shape: 'tarot' }
export const SpadeTarotCard: Card = { symbol: 'spade', color: 'black', shape: 'tarot' }
export const TrumpTarotCard: Card = { symbol: 'star', color: 'gray', shape: 'tarot' }

export const TarotCards: Card[] = [ HeartTarotCard, DiamondTarotCard, ClubTarotCard, SpadeTarotCard, TrumpTarotCard ]

export const YellowUnoCard: Card = { symbol: 'dot', color: 'yellow', shape: 'square' }
export const GreenUnoCard: Card = { symbol: 'dot', color: 'green', shape: 'square' }
export const RedUnoCard: Card = { symbol: 'dot', color: 'red', shape: 'square' }
export const BlueUnoCard: Card = { symbol: 'dot', color: 'blue', shape: 'square' }

export const UnoCards: Card[] = [ YellowUnoCard, GreenUnoCard, RedUnoCard, BlueUnoCard ]

export const DefaultCards: Card[] = [ HeartCard, TrumpTarotCard, GreenUnoCard, ClubCard, SpadeTarotCard ]
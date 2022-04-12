
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
  | 'square'

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

export type CardSize = 
  | 'XS' 
  | 'S' 
  | 'M' 
  | 'L' 
  | 'XL'
  
export interface Card {
  readonly symbol: CardSymbol
  readonly color: CardColor
  size?: CardSize
  value?: string
}

export const HeartCard: Card = { symbol: 'heart', color: 'red' }
export const DiamondCard: Card = { symbol: 'diamond', color: 'red' }
export const ClubCard: Card = { symbol: 'club', color: 'black' }
export const SpadeCard: Card = { symbol: 'spade', color: 'black' }

export const Cards: Card[] = [ HeartCard, DiamondCard, ClubCard, SpadeCard ]

export const YellowUnoCard: Card = { symbol: 'dot', color: 'yellow' }
export const GreenUnoCard: Card = { symbol: 'dot', color: 'green' }
export const RedUnoCard: Card = { symbol: 'dot', color: 'red' }
export const BlueUnoCard: Card = { symbol: 'dot', color: 'blue' }

export const UnoCards: Card[] = [ YellowUnoCard, GreenUnoCard, RedUnoCard, BlueUnoCard ]

export const TrumpCard: Card = { symbol: 'star', color: 'gray' }
export const SquareCard: Card = { symbol: 'square', color: 'pink' }
export const BrownSpadeCard: Card = { symbol: 'spade', color: 'brown' }
export const OrangeDiamondCard: Card = { symbol: 'diamond', color: 'orange' }
export const PurpleHeartCard: Card = { symbol: 'heart', color: 'purple' }

export const OtherCards: Card[] = [ TrumpCard, SquareCard, BrownSpadeCard, OrangeDiamondCard, PurpleHeartCard ]

export const DefaultCards: Card[] = [ HeartCard, GreenUnoCard, ClubCard, YellowUnoCard, TrumpCard, OrangeDiamondCard, PurpleHeartCard ]
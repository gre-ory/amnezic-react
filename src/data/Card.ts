
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
  | 'triangle'
  | 'cross'

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

export const Cards: Card[] = [ ClubCard, DiamondCard, HeartCard, SpadeCard ]

export const RedDotCard: Card = { symbol: 'dot', color: 'red' }
export const OrangeDotCard: Card = { symbol: 'dot', color: 'orange' }
export const YellowDotCard: Card = { symbol: 'dot', color: 'yellow' }
export const GreenDotCard: Card = { symbol: 'dot', color: 'green' }
export const PurpleDotCard: Card = { symbol: 'dot', color: 'purple' }
export const BlueDotCard: Card = { symbol: 'dot', color: 'blue' }
export const PinkDotCard: Card = { symbol: 'dot', color: 'pink' }
export const BrownDotCard: Card = { symbol: 'dot', color: 'brown' }

export const ColorCards: Card[] = [ BlueDotCard, YellowDotCard, GreenDotCard, RedDotCard, OrangeDotCard, PurpleDotCard, PinkDotCard, BrownDotCard ]

export const DefaultCards: Card[] = [ ...Cards, ...ColorCards ]
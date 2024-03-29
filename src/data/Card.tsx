
export enum CardSymbol {
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
  CLUB = 'CLUB',
  SPADE = 'SPADE',
  STAR = 'STAR',
  CIRCLE = 'CIRCLE',
  SQUARE = 'SQUARE',
  TRIANGLE = 'TRIANGLE',
  CROSS = 'CROSS',
}  

export enum CardColor {
  BLACK = 'BLACK',
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  PURPLE = 'PURPLE',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  PINK = 'PINK',
  BROWN = 'BROWN',
  GRAY = 'GRAY',
}

export enum CardSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export interface Card {
  readonly symbol: CardSymbol
  readonly color: CardColor
  size?: CardSize
  number?: number
  value?: string
}

export const HeartCard: Card = { symbol: CardSymbol.HEART, color: CardColor.RED }
export const DiamondCard: Card = { symbol: CardSymbol.DIAMOND, color: CardColor.RED }
export const ClubCard: Card = { symbol: CardSymbol.CLUB, color: CardColor.BLACK }
export const SpadeCard: Card = { symbol: CardSymbol.SPADE, color: CardColor.BLACK }

export const BlueCircleCard: Card = { symbol: CardSymbol.CIRCLE, color: CardColor.BLUE }
export const YellowCircleCard: Card = { symbol: CardSymbol.CIRCLE, color: CardColor.YELLOW }
export const RedCircleCard: Card = { symbol: CardSymbol.CIRCLE, color: CardColor.RED }
export const GreenCircleCard: Card = { symbol: CardSymbol.CIRCLE, color: CardColor.GREEN }

export const OrangeTriangleCard: Card = { symbol: CardSymbol.TRIANGLE, color: CardColor.ORANGE }
export const PurpleTriangleCard: Card = { symbol: CardSymbol.TRIANGLE, color: CardColor.PURPLE }

export const DefaultCards: Card[] = [ 
  ClubCard, 
  DiamondCard, 
  HeartCard, 
  SpadeCard,

  BlueCircleCard, 
  YellowCircleCard, 
  RedCircleCard, 
  GreenCircleCard,
  
  OrangeTriangleCard,
  PurpleTriangleCard 
]
import { MAX_NB_AVATAR } from "./Constants"
import { range } from "./Util"

export type AvatarId = number

export const ALL_AVATAR_IDS = range( MAX_NB_AVATAR ).map( i => i + 1 )
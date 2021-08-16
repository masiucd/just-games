import {Player} from "./machine"

export const AMOUNT_OF_SQUARES = 9
export const checkIfDraw = (squares: Array<Player | null>) =>
  squares.filter(Boolean).length === AMOUNT_OF_SQUARES

import {Player} from "./machine"

interface Props {
  selectSquare: (index: number) => void
  square: null | Player
  index: number
}
const Square = ({selectSquare, square, index}: Props) => (
  <button onClick={() => selectSquare(index)}>{square}</button>
)

export default Square

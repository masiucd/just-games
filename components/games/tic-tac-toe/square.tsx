import React from "react"

interface Props {
  handleClick: (index: number) => void
  index: number
  square: null | string
}

const Square = ({handleClick, index, square}: Props) => (
  <button
    onClick={() => {
      handleClick(index)
    }}
    className={`square square${index}`}
  >
    {square}
  </button>
)

export default Square

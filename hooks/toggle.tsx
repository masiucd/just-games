import {useState} from "react"

type ReturnType = {
  state: boolean
  toggle: () => void
  toFalse: () => void
  toTrue: () => void
}

const useToggle = (initialState = false): ReturnType => {
  const [state, setState] = useState(initialState)

  const toggle = (): void => {
    setState((prevState) => !prevState)
  }
  const toTrue = (): void => {
    setState(true)
  }
  const toFalse = (): void => {
    setState(false)
  }

  return {state, toggle, toFalse, toTrue}
}

export {useToggle}

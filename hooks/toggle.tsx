import {useState} from "react"

interface ToggleMap {
  state: boolean
  toggle: () => void
  toFalse: () => void
  toTrue: () => void
}
type FnType<T = void> = () => T
type ReturnType = [boolean, FnType, FnType, FnType, ToggleMap]

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

  return [state, toggle, toFalse, toTrue, {state, toggle, toFalse, toTrue}]
}

export {useToggle}

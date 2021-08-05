import {useEffect, RefObject} from "react"

type Fn = () => void
type HandlerEvent = MouseEvent | TouchEvent

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: Fn,
) => {
  useEffect(() => {
    const handler = (e: HandlerEvent) => {
      const element = ref?.current

      if (!element || element.contains(e.target as Node)) {
        return
      }
      callback()
    }

    document.addEventListener("mousedown", handler)
    document.addEventListener("touchcancel", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchcancel", handler)
    }
  }, [ref, callback])
}

export {useClickOutside}

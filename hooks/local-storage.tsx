import {useState} from "react"

import {useHasMounted} from "./useHasMounted"

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const hasMounted = useHasMounted()
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const storedItem = hasMounted ? window.localStorage.getItem(key) : null
      return storedItem ? JSON.parse(storedItem) : initialValue
    } catch (err) {
      console.error(err)
      return initialValue
    }
  })

  const setValue = (value: T | ((value: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      hasMounted
        ? window.localStorage.setItem(key, JSON.stringify(valueToStore))
        : null
    } catch (err) {
      console.error(err)
    }
  }

  return {storedValue, setValue}
}

export {useLocalStorage}

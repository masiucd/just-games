import {useEffect} from "react"

import {useLocalStorage} from "./local-storage"

type ThemeValue = "dark" | "light"

const useTheme = (themeKey = "theme", themeValue: ThemeValue = "light") => {
  const {storedValue: storedTheme, setValue: setStoredTheme} = useLocalStorage(
    themeKey,
    themeValue,
  )

  const handleTheme = (): void => {
    const nextTheme = storedTheme === "dark" ? "light" : "dark"
    setStoredTheme(nextTheme)
  }

  useEffect(() => {
    document.body.dataset.theme = storedTheme
  }, [storedTheme])

  return {storedTheme, handleTheme}
}

export {useTheme}

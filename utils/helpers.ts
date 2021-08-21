export const makeIntArray = (amount: number) =>
  Array(amount)
    .fill(1)
    .map((n, i) => n + i)

export const toInt = (x: string) => parseInt(x, 10)
export const makeList = <T>(size: number, fill: T): Array<T> =>
  Array(size).fill(fill)

const floor = (x: number) => Math.floor(x)
const randomInt = () => Math.random()

export const getRandomItemInList = <T>(xs: Readonly<Array<T>>) => {
  const index = floor(randomInt() * xs.length)
  return xs[index]
}

export const getRandomInt = (x = 10): number => Math.floor(Math.random() * x)
export const getTail = <T>(xs: Array<T>) => xs[xs.length - 1]
export const len = <T>(xs: Array<T>) => xs.length

export const wordToList = (word: string) => [...word]

export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "🧨",
]

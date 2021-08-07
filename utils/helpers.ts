export const makeIntArray = (amount: number) =>
  Array(amount)
    .fill(1)
    .map((n, i) => n + i)

export const toInt = (x: string) => parseInt(x, 10)

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
]

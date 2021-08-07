export const makeIntArray = (amount: number) =>
  Array(amount)
    .fill(1)
    .map((n, i) => n + i)

export const toInt = (x: string) => parseInt(x, 10)

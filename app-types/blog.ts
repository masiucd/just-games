export interface FrontMatter {
  date: string
  keywords: Array<string>
  slug: GameSlug
  spoiler: string
  tags: string[]
  title: string
  updated: string
}

export interface OptionalFrontMatter {
  date?: string
  keywords?: Array<string>
  slug?: GameSlug
  spoiler?: string
  tags?: string[]
  title?: string
  updated?: string
}

export type GameSlug = "quiz" | "hangman" | "black-jack" | "tic-tac-toe"

// export type Fields = keyof FrontMatter
// TODO: Fix type to be dynamic
export type Field =
  | "date"
  | "keywords"
  | "slug"
  | "spoiler"
  | "tags"
  | "title"
  | "updated"
  | "content"

export type SortDir = "DESC" | "ASC"

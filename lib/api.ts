import {Fields} from "@app-types/blog"
import fs from "fs"
import matter from "gray-matter"
import {join} from "path"

export const getFullPath = (): string => process.cwd()

export const getPostBySlug = (
  slug: string,
  fields: Fields[],
): Record<string, string | string[]> => {
  const urlQuerySlug = slug.replace(/\.mdx$/, "")

  const postContent = fs.readFileSync(
    join(getFullPath(), "posts", slug),
    "utf-8",
  )

  const {data: frontMatter, content} = matter(postContent)

  const record: Record<string, string | string[]> = {}
  for (const field of fields) {
    if (field === "slug") {
      record[field] = urlQuerySlug
    }
    if (field === "content") {
      record[field] = content
    }
    if (frontMatter[field]) {
      record[field] = frontMatter[field]
    }
  }

  return record
}

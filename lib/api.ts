import {Field, SortDir} from "@app-types/blog"
import fs from "fs"
import matter from "gray-matter"
import {join} from "path"

const postPath = join(process.cwd(), "posts")
const getPostsSlugs = () => fs.readdirSync(postPath)

export const getPostBySlug = (
  slug: string,
  fields: Field[],
): Record<Field, string | string[]> => {
  const urlQuerySlug = slug.replace(/\.mdx$/, "")

  const postContent = fs.readFileSync(
    join(process.cwd(), "posts", slug),
    "utf-8",
  )

  const {data: frontMatter, content} = matter(postContent)

  const postItem: Record<Field, string | string[]> = {}
  for (const field of fields) {
    if (field === "slug") {
      postItem[field] = urlQuerySlug
    }
    if (field === "content") {
      postItem[field] = content
    }
    if (frontMatter[field]) {
      postItem[field] = frontMatter[field]
    }
  }

  return postItem
}

export const getAllPosts = (
  fields: Field[],
  sortDir: SortDir,
): Record<Field, string | string[]>[] => {
  const slugs = getPostsSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug, fields))

  return sortDir === "DESC"
    ? [...posts].sort((a, b) => (a.updated > b.updated ? -1 : 1))
    : [...posts].sort((a, b) => (a.updated > b.updated ? 1 : -1))
}

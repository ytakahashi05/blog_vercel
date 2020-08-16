import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import axios from "axios"
const postsDirectory = join(process.cwd(), '_posts')
const X_API_KEY: string = process.env.X_API_KEY || "";  
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export type BlogContent = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  title: string,
  date: string,
  content: string
}

export type Blogs = {
  contents: BlogContent[],
  totalCount: number,
  offset: number,
  limit: number
}

export const getBlogs = () => (
  axios.get<Blogs>("https://ytakahashi_blog.microcms.io/api/v1/blogs", {headers: {
    'Content-type': 'application/json',
    'X-API-KEY': X_API_KEY
  }})
)

export const getBlogBy = (id: string) => (
  axios.get<BlogContent>('https://ytakahashi_blog.microcms.io/api/v1/blogs/' + id, { headers: {
    'Content-type': 'application/json',
    'X-API-KEY': X_API_KEY
  }})
)
import { hiddenRepos, profile, projects, type Project } from '../data/content'

type Repo = {
  name: string
  description: string | null
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
  has_pages: boolean
}

type Cache = {
  savedAt: number
  projects: Project[]
}

export const REPOS_STORAGE_KEY = 'portfolio:repos'
const CACHE_TTL = 1000 * 60 * 60 * 6
const ENDPOINT = `https://api.github.com/users/${profile.username}/repos?per_page=100&sort=pushed`

const curated = new Map(projects.map((project) => [project.slug.toLowerCase(), project]))
const hidden = new Set(hiddenRepos.map((name) => name.toLowerCase()))

function titleize(slug: string) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

function tagsFrom(repo: Repo) {
  const tags = new Set<string>()
  if (repo.language) tags.add(repo.language)
  for (const topic of repo.topics ?? []) tags.add(titleize(topic))
  return [...tags]
}

function demoFrom(repo: Repo) {
  if (repo.homepage) return repo.homepage
  if (repo.has_pages) return `https://${profile.username.toLowerCase()}.github.io/${repo.name}/`
  return undefined
}

function toProject(repo: Repo): Project {
  const base = curated.get(repo.name.toLowerCase())
  const description = repo.description ?? ''

  return {
    slug: repo.name,
    name: base?.name ?? titleize(repo.name),
    description: base?.description ?? { pt: description, en: description },
    tags: base?.tags ?? tagsFrom(repo),
    demo: base?.demo ?? demoFrom(repo),
    featured: base?.featured,
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at,
  }
}

function rank(project: Project) {
  const index = projects.findIndex((item) => item.slug.toLowerCase() === project.slug.toLowerCase())
  return index === -1 ? projects.length : index
}

function merge(repos: Repo[]): Project[] {
  return repos
    .filter((repo) => !repo.fork && !repo.archived && !hidden.has(repo.name.toLowerCase()))
    .filter((repo) => curated.has(repo.name.toLowerCase()) || Boolean(repo.description))
    .map(toProject)
    .sort((a, b) => {
      const byRank = rank(a) - rank(b)
      if (byRank !== 0) return byRank
      return (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')
    })
}

function readCache(): Project[] | null {
  try {
    const raw = window.localStorage.getItem(REPOS_STORAGE_KEY)
    if (!raw) return null
    const cache = JSON.parse(raw) as Cache
    if (!Array.isArray(cache.projects) || Date.now() - cache.savedAt > CACHE_TTL) return null
    return cache.projects
  } catch {
    return null
  }
}

function writeCache(list: Project[]) {
  try {
    const cache: Cache = { savedAt: Date.now(), projects: list }
    window.localStorage.setItem(REPOS_STORAGE_KEY, JSON.stringify(cache))
  } catch {
    return
  }
}

export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const cached = readCache()
  if (cached) return cached

  const response = await fetch(ENDPOINT, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`)

  const merged = merge((await response.json()) as Repo[])
  if (merged.length === 0) throw new Error('GitHub API não retornou repositórios utilizáveis')

  writeCache(merged)
  return merged
}

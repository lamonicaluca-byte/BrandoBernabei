// Commit di più file in un solo colpo tramite la Git Data API di GitHub.
// Un solo commit = un solo deploy su Vercel.

const API = process.env.GITHUB_API_URL ?? "https://api.github.com"

export interface GithubConfig {
  token: string
  repo: string
  branch: string
}

export function getGithubConfig(): GithubConfig | null {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null
  return {
    token,
    repo: process.env.GITHUB_REPO ?? "lamonicaluca-byte/BrandoBernabei",
    branch: process.env.GITHUB_BRANCH ?? "main",
  }
}

async function gh<T>(cfg: GithubConfig, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}/repos/${cfg.repo}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} su ${path}: ${(await res.text()).slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

/** Legge un file di testo dal ramo configurato. Restituisce null se non esiste. */
export async function readTextFile(cfg: GithubConfig, path: string): Promise<string | null> {
  const res = await fetch(`${API}/repos/${cfg.repo}/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github.raw+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub ${res.status} nella lettura di ${path}`)
  return res.text()
}

export type FileChange =
  | { path: string; content: string | Buffer }
  | { path: string; delete: true }

export async function commitFiles(cfg: GithubConfig, message: string, changes: FileChange[]) {
  const ref = await gh<{ object: { sha: string } }>(cfg, `/git/ref/heads/${cfg.branch}`)
  const parentSha = ref.object.sha
  const parent = await gh<{ tree: { sha: string } }>(cfg, `/git/commits/${parentSha}`)

  const tree = await Promise.all(
    changes.map(async (c) => {
      if ("delete" in c) {
        return { path: c.path, mode: "100644", type: "blob", sha: null }
      }
      const data = typeof c.content === "string" ? Buffer.from(c.content, "utf-8") : c.content
      const blob = await gh<{ sha: string }>(cfg, "/git/blobs", {
        method: "POST",
        body: JSON.stringify({ content: data.toString("base64"), encoding: "base64" }),
      })
      return { path: c.path, mode: "100644", type: "blob", sha: blob.sha }
    }),
  )

  const newTree = await gh<{ sha: string }>(cfg, "/git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
  })
  const commit = await gh<{ sha: string }>(cfg, "/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [parentSha] }),
  })
  await gh(cfg, `/git/refs/heads/${cfg.branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  })
  return commit.sha
}

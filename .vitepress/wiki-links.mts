import fs from 'node:fs'
import path from 'node:path'
import type MarkdownIt from 'markdown-it'

function collectMarkdownFiles(directory: string, root = directory): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '_private' || entry.name === 'CollaborationSys') return []

    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectMarkdownFiles(absolute, root)
    if (!entry.name.endsWith('.md') || entry.name === 'README.md' || entry.name === 'CollaborationSys_plan.md') return []

    return [path.relative(root, absolute).replaceAll(path.sep, '/')]
  })
}

function createRouteMap(): Map<string, string> {
  const routes = new Map<string, string>()

  for (const file of collectMarkdownFiles(process.cwd())) {
    const noteName = path.basename(file, '.md')
    const route = file.replace(/\.md$/, '')
    routes.set(noteName, '/' + route)
  }

  return routes
}

function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[：:]/g, '')
    .replace(/\s+/g, '-')
}

export function createWikiLinkPlugin() {
  const routes = createRouteMap()

  return (md: MarkdownIt) => {
    md.inline.ruler.before('link', 'obsidian-wikilink', (state, silent) => {
      const start = state.pos
      if (state.src.slice(start, start + 2) !== '[[') return false

      const end = state.src.indexOf(']]', start + 2)
      if (end < 0) return false
      if (silent) return true

      const raw = state.src.slice(start + 2, end)
      const [destination, customLabel] = raw.split('|', 2)
      const [noteName, heading] = destination.split('#', 2)
      const route = routes.get(noteName)

      if (!route) {
        const token = state.push('text', '', 0)
        token.content = customLabel || destination
        state.pos = end + 2
        return true
      }

      const href = heading ? route + '#' + slugifyHeading(heading) : route
      const open = state.push('link_open', 'a', 1)
      open.attrSet('href', href)

      const text = state.push('text', '', 0)
      text.content = customLabel || noteName

      state.push('link_close', 'a', -1)
      state.pos = end + 2
      return true
    })
  }
}

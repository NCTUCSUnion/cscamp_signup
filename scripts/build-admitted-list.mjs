#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const csvPath = process.argv[2] || path.join(repoRoot, '錄取名單 - 最終名單.csv')
const outPath = path.join(repoRoot, 'src/data/admitted-list.json')

if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found at: ${csvPath}`)
  console.error('Usage: node scripts/build-admitted-list.mjs [path/to/csv]')
  process.exit(1)
}

// --- RFC 4180-ish CSV parser (handles quoted fields with embedded ", , and \n) ---
function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        row.push(field)
        field = ''
      } else if (ch === '\n') {
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      } else if (ch === '\r') {
        // ignore; \n handles row break
      } else {
        field += ch
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function maskName(name) {
  if (!name) return ''
  const trimmed = name.trim()
  if (trimmed.length < 2) return trimmed
  const chars = Array.from(trimmed)
  chars[1] = 'O'
  return chars.join('')
}

function normalizeGender(g) {
  const v = (g || '').trim()
  if (v === '男' || v.toLowerCase() === 'male' || v === 'M') return 'male'
  if (v === '女' || v.toLowerCase() === 'female' || v === 'F') return 'female'
  return 'other'
}

const raw = fs.readFileSync(csvPath, 'utf8')
const rows = parseCSV(raw)

if (rows.length === 0) {
  console.error('CSV appears empty after parsing.')
  process.exit(1)
}

const header = rows[0].map((h) => h.trim())
const idx = {
  reject: header.findIndex((h) => h === '不要'),
  reconsider: header.findIndex((h) => h === '再想想'),
  name: header.findIndex((h) => h === '姓名'),
  gender: header.findIndex((h) => h === '生理性別'),
  school: header.findIndex((h) => h === '就讀學校'),
}

const missing = Object.entries(idx)
  .filter(([, v]) => v === -1)
  .map(([k]) => k)
if (missing.length > 0) {
  console.error('Missing expected columns:', missing.join(', '))
  console.error('Header columns found:', header.join(' | '))
  process.exit(1)
}

const dataRows = rows.slice(1).filter((r) => r.some((c) => (c || '').trim() !== ''))

const filtered = dataRows.filter((r) => {
  const rej = (r[idx.reject] || '').trim().toUpperCase()
  const rec = (r[idx.reconsider] || '').trim().toUpperCase()
  return rej !== 'TRUE' && rec !== 'TRUE'
})

// Deduplicate by (name, school) — same person re-submitting form
const seen = new Set()
const entries = []
for (const r of filtered) {
  const name = (r[idx.name] || '').trim()
  const school = (r[idx.school] || '').trim()
  const gender = normalizeGender(r[idx.gender])
  if (!name) continue
  const key = `${name}@@${school}`
  if (seen.has(key)) continue
  seen.add(key)
  entries.push({
    name: maskName(name),
    school,
    gender,
  })
}

// Sort: by school, then by masked name (stable, deterministic output)
entries.sort((a, b) => {
  const s = a.school.localeCompare(b.school, 'zh-Hant')
  if (s !== 0) return s
  return a.name.localeCompare(b.name, 'zh-Hant')
})

const stats = {
  total: dataRows.length,
  admitted: filtered.length,
  output: entries.length,
  byGender: entries.reduce((acc, e) => {
    acc[e.gender] = (acc[e.gender] || 0) + 1
    return acc
  }, {}),
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(
  outPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: entries.length,
      entries,
    },
    null,
    2,
  ) + '\n',
  'utf8',
)

console.log('Admitted list built:', outPath)
console.log('Stats:', JSON.stringify(stats, null, 2))

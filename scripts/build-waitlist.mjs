#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const csvPath =
  process.argv[2] ||
  path.join(repoRoot, '2026 交大資訊逐夢營【天資驕子】報名表單 (回覆) - 備取名單.csv')
const outPath = path.join(repoRoot, 'src/data/waitlist.json')

if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found at: ${csvPath}`)
  console.error('Usage: node scripts/build-waitlist.mjs [path/to/csv]')
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
  sent: header.findIndex((h) => h === '寄出'),
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

// Split rows by 寄出 status. "寄出=TRUE" rows go to `entries` (shown on the
// site). All other rows with a name go to `pendingEntries` (data-only,
// intentionally NOT rendered yet — see Admitted.vue which only reads
// `entries`). Both arrays use the same masked schema so the latter can be
// promoted to `entries` later without re-running the script.
const sentRows = dataRows.filter((r) => (r[idx.sent] || '').trim().toUpperCase() === 'TRUE')
const pendingRows = dataRows.filter((r) => (r[idx.sent] || '').trim().toUpperCase() !== 'TRUE')

function buildEntries(srcRows, alreadySeen) {
  const seen = alreadySeen || new Set()
  const out = []
  for (const r of srcRows) {
    const name = (r[idx.name] || '').trim()
    const school = (r[idx.school] || '').trim()
    const gender = normalizeGender(r[idx.gender])
    if (!name) continue
    const key = `${name}@@${school}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      name: maskName(name),
      school,
      gender,
    })
  }
  return out
}

const sentSeen = new Set()
const entries = buildEntries(sentRows, sentSeen)
// Re-use the same `seen` set so anyone already counted as sent (e.g. duplicate
// submissions) is not double-listed in pendingEntries.
const pendingEntries = buildEntries(pendingRows, sentSeen)

// --- Manual additions (not in the CSV) ---------------------------------------
// Late submissions or out-of-form sign-ups handled outside the Google Form.
// Provide raw (un-masked) names; the build pipeline applies the same masking,
// dedup, and sort rules as CSV rows. Survives CSV re-imports.
const MANUAL_PENDING = [
  { name: '謝沅呈', gender: '男', school: '建功高中' },
]

function appendManual(targetList, sourceList, seen) {
  for (const m of sourceList) {
    const name = (m.name || '').trim()
    const school = (m.school || '').trim()
    const gender = normalizeGender(m.gender)
    if (!name) continue
    const key = `${name}@@${school}`
    if (seen.has(key)) continue
    seen.add(key)
    targetList.push({ name: maskName(name), school, gender })
  }
}
appendManual(pendingEntries, MANUAL_PENDING, sentSeen)

function sortEntries(arr) {
  arr.sort((a, b) => {
    const s = a.school.localeCompare(b.school, 'zh-Hant')
    if (s !== 0) return s
    return a.name.localeCompare(b.name, 'zh-Hant')
  })
}
sortEntries(entries)
sortEntries(pendingEntries)

const stats = {
  total: dataRows.length,
  sent: sentRows.length,
  pending: pendingRows.length,
  output: entries.length,
  pendingOutput: pendingEntries.length,
  byGender: entries.reduce((acc, e) => {
    acc[e.gender] = (acc[e.gender] || 0) + 1
    return acc
  }, {}),
  pendingByGender: pendingEntries.reduce((acc, e) => {
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
      _note:
        '`entries` are notified waitlist members shown on the site. `pendingEntries` are not yet notified and intentionally hidden from the UI; promote rows from `pendingEntries` to `entries` (or merge both) when ready to publish them.',
      count: entries.length,
      pendingCount: pendingEntries.length,
      entries,
      pendingEntries,
    },
    null,
    2,
  ) + '\n',
  'utf8',
)

console.log('Waitlist built:', outPath)
console.log('Stats:', JSON.stringify(stats, null, 2))

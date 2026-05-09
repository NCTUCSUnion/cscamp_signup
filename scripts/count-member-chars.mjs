/**
 * 統計 public/contents/members 內各檔案字數（Unicode code points，不含檔名）。
 * 用法：自 cscamp_signup 目錄執行 `npm run count-members`
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMBERS_DIR = path.join(__dirname, "..", "public", "contents", "members");

function countChars(text) {
  return [...text].length;
}

async function main() {
  const entries = await readdir(MEMBERS_DIR, { withFileTypes: true });
  const txtFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".txt"))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "zh-Hant"));

  if (txtFiles.length === 0) {
    console.error(`No .txt files in ${MEMBERS_DIR}`);
    process.exit(1);
  }

  const rows = [];
  let total = 0;

  for (const name of txtFiles) {
    const full = path.join(MEMBERS_DIR, name);
    const raw = await readFile(full, "utf8");
    const n = countChars(raw);
    total += n;
    rows.push({ name, chars: n });
  }

  const nameWidth = Math.max(...rows.map((r) => [...r.name].length), 4);
  const numWidth = String(Math.max(...rows.map((r) => r.chars), total)).length;

  console.log(`${"檔案".padEnd(nameWidth)}  字數`);
  console.log("-".repeat(nameWidth + numWidth + 3));
  for (const { name, chars } of rows) {
    console.log(`${name.padEnd(nameWidth)}  ${String(chars).padStart(numWidth)}`);
  }
  console.log("-".repeat(nameWidth + numWidth + 3));
  console.log(`${"合計".padEnd(nameWidth)}  ${String(total).padStart(numWidth)}`);
  console.log(`\n共 ${rows.length} 個檔案`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

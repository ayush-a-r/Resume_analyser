import fs from "fs/promises";
import pdf from "pdf-parse/lib/pdf-parse.js";  // ✅ skip broken index.js

export async function parsePdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const { text } = await pdf(buffer);
  return text.trim();
}
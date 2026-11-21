import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One line about working beside an AI coding agent. The demo is the joke:
// the agent does the building, then sells the room on work that never existed.
const JOKE =
  "My AI pair programmer built the whole demo in 40 seconds, then spent the whole meeting demoing features that don't exist yet — with total confidence.";

function main(): void {
  const text = JOKE.trim();
  if (text.length < 1 || text.length > 280) {
    throw new Error(`entry must be 1-280 chars, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const here = dirname(fileURLToPath(import.meta.url));
  const targets = ["/output/entry.txt", join(here, "output", "entry.txt")];
  for (const target of targets) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, text, "utf8");
  }
  console.log(`wrote ${text.length} chars to ${targets.join(" and ")}`);
}

main();

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

test("uses the self-hosted Chill G Sans font with a locale-safe fallback", () => {
  assert.ok(existsSync(new URL("../public/assets/fonts/HanChanGaoHeiTi.woff2", import.meta.url)));
  assert.match(css, /@font-face\s*\{[^}]*font-family:\s*"Chill G Sans";[^}]*HanChanGaoHeiTi\.woff2[^}]*font-weight:\s*500;[^}]*font-display:\s*swap;/s);
  assert.match(css, /:root\s*\{[^}]*font-family:\s*"Chill G Sans",\s*system-ui,\s*sans-serif;/s);
  assert.doesNotMatch(css, /Noto Sans JP|Hiragino Sans|Yu Gothic/);
  assert.match(css, /:root:lang\(zh-CN\) \.arrow-link\s*\{[^}]*font-weight:\s*700;[^}]*letter-spacing:\s*\.04em;/s);
});

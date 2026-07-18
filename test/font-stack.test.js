import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

test("uses a locale-safe system font stack and calmer Chinese CTA typography", () => {
  assert.match(css, /:root\s*\{[^}]*font-family:\s*system-ui,\s*sans-serif;/s);
  assert.doesNotMatch(css, /Noto Sans JP|Hiragino Sans|Yu Gothic/);
  assert.match(css, /:root:lang\(zh-CN\) \.arrow-link\s*\{[^}]*font-weight:\s*700;[^}]*letter-spacing:\s*\.04em;/s);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const app = readFileSync(new URL("../src/App.vue", import.meta.url), "utf8");
const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");

test("uses the light editorial shell and original global-network hero", () => {
  assert.match(css, /--canvas:\s*#ededed;/);
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*fixed;/s);
  assert.match(css, /\.nav-contact\s*\{[^}]*border-radius:\s*999px;/s);
  assert.match(css, /\.hero\s*\{[^}]*hero-global-network-lineart\.png/s);
  assert.match(app, /class="service-band"/);
  assert.doesNotMatch(app + css, /diamondhead/i);
});

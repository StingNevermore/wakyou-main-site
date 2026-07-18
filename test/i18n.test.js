import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import {
  createSiteI18n,
  LOCALE_OPTIONS,
  localizedHref,
  normalizeLocale,
  readStoredLocale,
  resolveLocale,
  writeStoredLocale,
} from "../src/i18n.js";
import { messages } from "../src/locales/index.js";

test("stores each locale in an editable JSON resource", () => {
  for (const locale of ["ja", "zh", "en"]) {
    const resource = new URL(`../src/locales/${locale}.json`, import.meta.url);
    assert.ok(existsSync(resource), `${locale}.json should exist`);
    assert.deepEqual(JSON.parse(readFileSync(resource, "utf8")), messages[locale]);
  }
});

test("exposes native language labels and creates a Japanese-fallback composer", () => {
  assert.deepEqual(LOCALE_OPTIONS, [
    { code: "ja", label: "日本語", htmlLang: "ja" },
    { code: "zh", label: "简体中文", htmlLang: "zh-CN" },
    { code: "en", label: "English", htmlLang: "en" },
  ]);

  const i18n = createSiteI18n("zh");
  assert.equal(i18n.global.locale.value, "zh");
  assert.equal(i18n.global.fallbackLocale.value, "ja");
  assert.equal(i18n.global.t("nav.home"), "首页");
});

test("normalizes supported regional locale codes", () => {
  assert.equal(normalizeLocale("ja-JP"), "ja");
  assert.equal(normalizeLocale("zh-CN"), "zh");
  assert.equal(normalizeLocale("zh-TW"), "zh");
  assert.equal(normalizeLocale("en-US"), "en");
  assert.equal(normalizeLocale("fr-FR"), "");
});

test("resolves locale from URL, storage, browser, then Japanese", () => {
  assert.equal(resolveLocale({ search: "?lang=zh", stored: "en", languages: ["ja-JP"] }), "zh");
  assert.equal(resolveLocale({ search: "?lang=fr", stored: "en", languages: ["zh-CN"] }), "en");
  assert.equal(resolveLocale({ search: "", stored: "fr", languages: ["de-DE", "en-US"] }), "en");
  assert.equal(resolveLocale({ search: "", stored: null, languages: ["de-DE"] }), "ja");
});

test("storage helpers tolerate blocked local storage", () => {
  const values = new Map([["wakyou-lang", "zh"]]);
  const available = () => ({
    getItem: (key) => values.get(key),
    setItem: (key, value) => values.set(key, value),
  });
  const blockedMethods = () => ({
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
  });
  const blockedGetter = () => {
    throw new Error("blocked");
  };

  assert.equal(readStoredLocale(available), "zh");
  writeStoredLocale(available, "en");
  assert.equal(values.get("wakyou-lang"), "en");
  assert.equal(readStoredLocale(blockedMethods), null);
  assert.equal(readStoredLocale(blockedGetter), null);
  assert.doesNotThrow(() => writeStoredLocale(blockedMethods, "en"));
  assert.doesNotThrow(() => writeStoredLocale(blockedGetter, "en"));
});

test("localizes internal URLs while preserving query parameters and hashes", () => {
  const base = "https://wakyou.example/index.html?campaign=summer#top";

  assert.equal(
    localizedHref("/business.html?source=home#trading", "zh", base),
    "/business.html?source=home&lang=zh#trading",
  );
  assert.equal(
    localizedHref("/business.html?source=home&lang=en#trading", "ja", base),
    "/business.html?source=home#trading",
  );
});

test("all locales keep the same message shape and accessibility copy", () => {
  const flatten = (value, prefix = "", paths = []) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, paths));
    } else if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, item]) => flatten(item, prefix ? `${prefix}.${key}` : key, paths));
    } else {
      paths.push(prefix);
    }
    return paths;
  };

  const japaneseShape = flatten(messages.ja);
  assert.deepEqual(flatten(messages.zh), japaneseShape);
  assert.deepEqual(flatten(messages.en), japaneseShape);

  for (const locale of ["ja", "zh", "en"]) {
    assert.deepEqual(Object.keys(messages[locale].a11y).sort(), [
      "brandHome",
      "footerNavigation",
      "language",
      "mainNavigation",
      "menuClose",
      "menuOpen",
    ]);
  }
});

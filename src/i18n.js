import { createI18n } from "vue-i18n";
import { messages } from "./locales/index.js";

const STORAGE_KEY = "wakyou-lang";
const SUPPORTED_LOCALES = new Set(["ja", "zh", "en"]);

export const LOCALE_OPTIONS = [
  { code: "ja", label: "日本語", htmlLang: "ja" },
  { code: "zh", label: "简体中文", htmlLang: "zh-CN" },
  { code: "en", label: "English", htmlLang: "en" },
];

export function normalizeLocale(value) {
  const locale = String(value || "").trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.has(locale) ? locale : "";
}

export function resolveLocale({ search = "", stored = null, languages = [] } = {}) {
  const candidates = [new URLSearchParams(search).get("lang"), stored, ...languages];
  return candidates.map(normalizeLocale).find(Boolean) || "ja";
}

export function readStoredLocale(getStorage) {
  try {
    return getStorage().getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStoredLocale(getStorage, locale) {
  try {
    getStorage().setItem(STORAGE_KEY, locale);
  } catch {
    // Browsers can block storage; the URL still preserves the selection.
  }
}

export function localizedHref(href, locale, base) {
  const url = new URL(href, base);
  if (locale === "ja") url.searchParams.delete("lang");
  else url.searchParams.set("lang", locale);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function createSiteI18n(locale) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: "ja",
    messages,
  });
}

import { createApp } from "vue";
import App from "./App.vue";
import { createSiteI18n, readStoredLocale, resolveLocale } from "./i18n.js";
import "./styles.css";

const locale = resolveLocale({
  search: window.location.search,
  stored: readStoredLocale(() => window.localStorage),
  languages: navigator.languages,
});

createApp(App).use(createSiteI18n(locale)).mount("#root");

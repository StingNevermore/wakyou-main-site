# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable design decisions

- Keep the immersive full-width hero and the three prominent business gateways from the selected third concept.
- The brand must feel digitally native, online, networked, and technology-led—not like a traditional multinational shipping company.
- International trading remains the primary business; cross-border EC and creator/live commerce are connected solution lines.
- Default language is Japanese with complete Chinese and English switching.
- Use Vue I18n Composition API as the single source of locale state, with Japanese as the fallback.
- Resolve language in this order: `?lang=` query, saved choice, browser language, then Japanese; keep Japanese URLs clean and use `?lang=zh|en` for shareable non-Japanese pages.
- Use one compact native language select with self-language labels (`日本語`, `简体中文`, `English`) in the header and mobile menu.
- Keep editable copy in one JSON resource per language under `src/locales/`; non-developers should not need to edit JavaScript to update translations.
- The implementation stack is Vue 3 with Vite; do not reintroduce React.

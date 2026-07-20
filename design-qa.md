# Design QA

- Source visual truth: `qa/reference-diamondhead-hero.png`, `qa/reference-diamondhead-service.png`, `qa/reference-business-card-logo.png`
- Implementation stack: Vue 3 + Vite, native CSS, Iconoir
- Desktop evidence: `qa/redesign-home-desktop.png`, `qa/redesign-home-intro.png`, `qa/logo-desktop-header.png`, `qa/logo-profile-focus.png`, `qa/logo-footer-focus.png`
- Mobile evidence: `qa/redesign-home-mobile.png`, `qa/redesign-mobile-menu.png`, `qa/redesign-contact-form-mobile.png`, `qa/logo-mobile-zh-menu.png`
- Full-view comparison: `qa/design-comparison.png`; focused logo comparison: `qa/logo-comparison.png`
- Viewports: 1280 × 720 and 1440 × 900 desktop; 390 × 844 mobile override (375 CSS-pixel content width)
- States: Japanese homepage and editorial intro, open Chinese mobile menu, Chinese-to-English locale switch, English profile/footer, empty contact-form validation

## Findings

- No actionable P0, P1, or P2 findings remain.
- Fonts and typography: the system sans stack preserves the reference's bold editorial geometry while supporting Japanese, Chinese, and English without clipping or overflow.
- Spacing and layout rhythm: the fixed light header, immersive split hero, generous vertical whitespace, rounded white surfaces, and three business gateways reproduce the intended density and hierarchy. International Trading remains visually primary.
- Colors and visual tokens: the site is predominantly pale gray (`#ededed`), white, and charcoal. Deep navy and gold are limited to brand accents and primary actions; no gradients are used.
- Image quality and assets: the homepage uses a project-local raster illustration generated specifically for Wakyou. Its Japan/global trade, EC, logistics, network, and creator motifs crop cleanly at both target viewports and do not reuse Diamondhead imagery, logos, or copy.
- Logo fidelity: the header, footer, and profile card use the navy bridge-shaped W with upper and lower arcs extracted from the supplied business card. The transparent crop has no white box, clipping, stretching, or visible edge halo at the tested sizes.
- Copy and content: all existing Japanese, Chinese, and English resources, routes, business descriptions, and mail-contact behavior are preserved. No reference-site news, recruiting, client, or product content was introduced.
- Accessibility: native controls and labels, visible focus rings, reduced-motion handling, practical mobile targets, and adequate text contrast are present.

## Interaction Verification

- All five public pages were inspected at desktop size; homepage and contact flows were also inspected at 390 × 844.
- Japanese, Chinese, and English switching updates visible copy while preserving the existing URL locale rules.
- The Chinese mobile menu opens correctly, and selecting English closes the menu and updates the shareable URL to `?lang=en`.
- Desktop navigation, mobile menu open/close behavior, gateway links, CTA links, and footer links work.
- Empty contact submission triggers native required-field validation and focuses the first invalid field.
- Browser console checks across the tested pages reported no warnings or errors.

## Comparison History

1. Initial desktop capture found a P2 collision between hero copy and the right-side illustration. A solid pale surface was added behind the left 54% of the hero; the final hero capture verifies clean separation without introducing a gradient.
2. Initial editorial-intro capture left the final Japanese characters on an isolated line. The desktop grid ratio was rebalanced; `qa/redesign-home-intro.png` verifies the heading now resolves into two balanced lines.
3. The final desktop/mobile comparison found no remaining P0, P1, or P2 fidelity issues.
4. The initial logo capture found a P1 transparency failure caused by chroma-keying the white background, which made the mark invisible in-browser. Replacing it with RGB color-keying restored the supplied navy artwork; `qa/logo-desktop-header.png`, `qa/logo-profile-focus.png`, `qa/logo-footer-focus.png`, and `qa/logo-mobile-zh-menu.png` verify the corrected result with no remaining P0/P1/P2 logo findings.

## Follow-up Polish

- P3: the reference site uses richer motion in places; this implementation intentionally keeps only lightweight CSS transitions and honors `prefers-reduced-motion`, as required by the approved plan.
- P3: the business-card screenshot is the only available logo source. Replace `public/assets/wakyou-mark.png` in place if an official SVG, AI, PDF, or high-resolution transparent PNG becomes available.

final result: passed

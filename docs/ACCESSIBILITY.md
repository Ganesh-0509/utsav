# Accessibility (a11y) Compliance Specification

Target Standard: **WCAG 2.2 Level AA** Compliance.

Utsav is designed from the ground up for universal access across mobile devices, low-bandwidth connections, and assistive technologies.

## 1. Structural Navigation & Landmarks

- **Semantic HTML5**: Native `<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`, and `<footer>` elements provide screen-reader landmarks.
- **Skip Links**: The very first interactive element on every page is a high-contrast `"Skip to main content"` anchor (`#main-content`), allowing keyboard and screen-reader users to bypass the navigation header.
- **Heading Hierarchy**: Each route maintains a single logical `<h1>` followed by sequential `<h2>` and `<h3>` tags with zero skipped levels.
- **WAI-ARIA Tabs**: The multi-tab dashboard implements WAI-ARIA tab pattern with `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, and roving keyboard navigation (Left/Right/Home/End keys).

## 2. Form Usability & Error Handling

- **Explicit Label Associations**: Every input, select, and textarea is explicitly bound to a `<label>` via `id` and `htmlFor`.
- **Accessible Descriptions**: Form field hints and error notifications are linked dynamically with `aria-describedby`.
- **Visual & Non-Visual Errors**: Fields with errors set `aria-invalid="true"`.
- **Keyboard Traps Eliminated**: All modals, drawers (such as the GenAI Assistant), and dropdowns can be opened and dismissed using standard keyboard commands (`Escape`, `Tab`, `Shift+Tab`).

## 3. Visual Design & Contrast Ratios

- **Color Contrast Standards**:
  - Primary text (`#231f20` on light background): Contrast ratio `14.2:1` (exceeds WCAG AAA requirement of `7:1`).
  - Secondary text and captions: Minimum contrast ratio `4.8:1` (exceeds WCAG AA requirement of `4.5:1`).
  - Interactive buttons and badges: High-contrast borders and foregrounds.
- **Information Not Conveyed by Color Alone**: Status indicators (completed tasks, overruns, vendor booking statuses) always combine colors with descriptive icons and textual labels.
- **Focus Indicators**: 3px high-visibility gold/amber focus outlines on all interactive elements.
- **Touch Target Sizes**: All buttons and tappable controls meet or exceed the 44px × 44px minimum touch target size.

## 4. Motion & Cognitive Accessibility

- **`prefers-reduced-motion`**: Respects the user's OS-level motion preferences. When enabled, Three.js WebGL animations freeze into a static serene frame, and Framer Motion spring transitions are disabled.
- **Data Saver Mode (`Save-Data`)**: Automatically disables heavy 3D canvas rendering for low-bandwidth users while preserving the full functional planning suite.

## 5. Pan-Indian Typography & Multi-Script Support

- **Native Unicode Fonts**: Self-hosted Google Fonts (Baloo 2 and Hind family) provide native rendering for Devanagari (हिन्दी), Tamil (தமிழ்), and Telugu (తెలుగు) scripts without layout shift or missing glyphs.
- **Language Tagging**: All localized text segments carry appropriate HTML `lang` attributes (`lang="hi"`, `lang="ta"`, `lang="te"`, `lang="en"`).

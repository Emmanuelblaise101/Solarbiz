# Design System Strategy: The Radiant Monolith

## 1. Overview & Creative North Star
**Creative North Star: "The Radiant Monolith"**
This design system rejects the "SaaS-standard" look of flat cards and thin borders. Instead, it treats the UI as a series of heavy, architectural volumes carved out of darkness and illuminated by internal solar energy. We are moving away from "webpages" and toward "digital instruments." 

The experience is defined by **intentional asymmetry**—mimicking the way sunlight hits a solar array—and **high-contrast scale**. Large, editorial headlines sit against deep, textured voids. This is where luxury meets industrial sustainability; it is the precision of a Dyson motor paired with the warmth of a sunset.

---

## 2. Colors & Atmospheric Depth
The palette is built on a "Total Black" foundation, allowing the Brand Gold and Amber tokens to feel like light sources rather than mere colors.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Boundaries must be defined solely through background color shifts. To separate a feature section from a hero, transition from `surface` (#131313) to `surface-container-low` (#1C1B1B). This creates a sophisticated, seamless flow that feels high-end and custom.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Obsidian and Light."
- **Base Layer:** `surface` (#131313) for the main viewport.
- **Sectioning:** `surface-container-low` (#1C1B1B) for large content blocks.
- **Interactive Elements:** `surface-container-high` (#2A2A2A) for cards that need to "lift" toward the user.
- **The Glow:** Use `primary_container` (#F5A623) as a background glow (20% opacity with 100px blur) behind key modules to simulate the sun’s radiance.

### Signature Textures & Glass
To avoid a flat "flat-design" look:
1.  **Grain Texture:** Apply a subtle 3% opacity film grain over all `background` and `surface` layers to provide a tactile, filmic quality.
2.  **Solar Glass:** Floating navigation or modal elements must use a frosted glass effect. Use `surface-container-highest` at 60% opacity with a `backdrop-filter: blur(24px)`.

---

## 3. Typography: The Editorial Voice
Typography is our primary tool for authority. We balance the brutalist impact of display type with the technical precision of mono-spaced specs.

- **Display & Headlines (Epilogue):** Set with tight letter spacing (-0.04em). This font choice provides the "Powerful" and "Trustworthy" vibe. Use `display-lg` for hero statements, ensuring they dominate the screen.
- **Body (Plus Jakarta Sans):** Chosen for its modern, clean legibility. Maintain generous line height (1.6) to ensure the "Luxury" feel—white space is a premium commodity.
- **Technical Specs (Space Grotesk / JetBrains Mono):** Use `label-md` for all technical data points, energy outputs, and coordinates. This reinforces the "Sustainability meets Tech" (Tesla-like) persona.

---

## 4. Elevation & Depth
We do not use shadows to create "pop." We use **Tonal Layering**.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in dark tones creates a "soft-carved" depth that feels integrated, not pasted on.
- **Ambient Shadows:** Only for floating elements (like Modals). Use a large blur (60px) at 8% opacity, using a tinted version of `primary` (#FFC880) instead of black. This creates a "glow" rather than a shadow.
- **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use the `outline-variant` token at **15% opacity**. High-contrast outlines are the enemy of premium design.

---

## 5. Components & Geometry

### Geometry: The Solar Array
All containers must utilize the **Roundedness Scale**.
- **Standard Cards:** `lg` (2rem / 32px) for a soft, premium feel.
- **Interactive Elements:** `md` (1.5rem / 24px).
- **Signature Cut:** On hero images or primary containers, implement a **diagonal 45-degree corner cut** on the top-right corner to mimic solar panel silhouettes.

### Buttons: Kinetic Energy
- **Primary:** Background of `primary_container` (#F5A623), text in `on_primary_container`. No border. Apply a subtle "inner glow" using a 1px top-inset shadow of `primary_fixed` to make the button look like it’s emitting light.
- **Secondary:** Transparent background with a "Ghost Border" (15% `outline`). On hover, the background fills with a 5% `primary` tint.
- **Tertiary:** Pure text using `label-md` in `Solar Gold`, underlined with a 2px offset.

### Cards & Lists
- **No Dividers:** Forbid the use of horizontal rules. Separate list items using `spacing-4` (1.4rem) of vertical white space or by alternating background tones between `surface-container-low` and `surface-container-lowest`.
- **Nesting:** Cards should never have a shadow. They are "etched" into the page using a slightly lighter surface tone than the background they sit on.

### Input Fields
- **State:** Resting state uses `surface-container-highest` with no border.
- **Focus:** The border should not just change color; it should trigger a subtle `Solar Gold` outer glow (4px blur) to indicate "Power On."

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** Align a headline to the left and its supporting body text to the far right of a grid to create an editorial, high-end feel.
- **Use "Sunlight" Accents:** Use `tertiary` (Nature Green) sparingly—only for status indicators or "Eco-Mode" features to ensure the gold/black luxury palette remains dominant.
- **Mobile-First 3D:** Use CSS transforms to tilt cards slightly (2deg) on scroll, giving a 3D-depth effect that feels like a physical solar panel array.

### Don't:
- **No 100% White:** Never use pure #FFFFFF. Always use `on_surface` (#E5E2E1) or `Warm White` (#FFFDF5) to keep the "Warm" brand vibe.
- **No Sharp Corners:** Except for the signature diagonal cut, avoid 0px radii. Luxury is found in the "squircle" and the oversized radius.
- **No Crowding:** If an element feels "stuck," add `spacing-12` (4rem). High-end brands are never afraid of empty space.
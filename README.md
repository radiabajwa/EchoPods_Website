# Halcyon — Silence, Sculpted.

An Apple-inspired product landing page for **Halcyon One**, a concept spatial-audio earbud milled from aerospace titanium. Built as a fully static, zero-dependency site with a scroll-driven narrative, a live light/dark theme toggle, and an interactive frequency-response visualization.

> A concept design, not an available product — built purely as a front-end design exercise.

---

## ✨ Highlights

- **Cinematic hero** with animated gradient rings and a two-tone serif/script headline
- **Full light & dark mode**, toggled instantly with no page reload or flash
- **Data-driven "Sound" section** — an animated frequency bar visualization framed by real spec callouts (40kHz, −42dB, 9-axis, 0.9ms)
- **Step-by-step manufacturing story** ("Three passes, no shortcuts") using a numbered, connected timeline layout
- **Live color/finish switcher** for the product render (Graphite / Champagne / Glacier)
- **Direct comparison table** against generic earbuds — spec-for-spec
- **Zero build step** — pure HTML/CSS/JS, works by just opening `index.html`

---

## 🖤🤍 Light & Dark Mode

The entire experience is themed — typography, gradients, and the product render all adapt.

| Light | Dark |
|---|---|
| ![Hero light](./screenshots/light_hero.png) | ![Hero dark](./screenshots/dark_hero.png) |

---

## 📐 Section Breakdown

### 1. Hero — "Silence, sculpted."
The landing moment: concentric animated rings, a serif/script contrast headline, and the product floating dead-center. Two CTAs — a gradient primary "Pre-order" button and a ghost "Watch the film" button.

| Light | Dark |
|---|---|
| ![Hero light](./screenshots/light_hero.png) | ![Hero dark](./screenshots/dark_hero.png) |

### 2. Overview — "Four decisions, one obsession."
Four feature cards (Adaptive spatial audio, −42dB of silence, Aerospace titanium, 30-hour case), each with an icon, a bold claim, and a one-line justification — no filler copy.

| Light | Dark |
|---|---|
| ![Overview cards light](./screenshots/light_overview-cards.png) | ![Overview cards dark](./screenshots/dark_overview-cards.png) |

### 3. Sound — "A signature you can see."
An animated bar-chart visualization standing in for real driver frequency response, paired with four hard specs: frequency ceiling, noise floor, motion tracking axes, and head-tracking latency.

| Light | Dark |
|---|---|
| ![Sound light](./screenshots/light_sound.png) | ![Sound dark](./screenshots/dark_sound.png) |

### 4. Design — "Three passes. No shortcuts."
A connected, numbered timeline (Milled → Tuned → Calibrated) that explains the manufacturing process as a dependent sequence, not a feature list.

| Light | Dark |
|---|---|
| ![Design steps light](./screenshots/light_design-steps.png) | ![Design steps dark](./screenshots/dark_design-steps.png) |

### 5. Finish — "Choose your metal."
An interactive swatch picker (Graphite / Champagne / Glacier) next to the product render, communicating that the anodized color runs through the shell rather than being painted on.

| Light | Dark |
|---|---|
| ![Finish picker light](./screenshots/light_finish-color.png) | ![Finish picker dark](./screenshots/dark_finish-color.png) |

### 6. Compare — "Where the difference is measured."
A direct spec-vs-spec table against generic earbuds — shell material, noise floor, spatial tracking, ear-fit calibration, and battery life.

| Light | Dark |
|---|---|
| ![Compare table light](./screenshots/light_compare-table.png) | ![Compare table dark](./screenshots/dark_compare-table.png) |

### 7. Testimonial + Reserve
A pull-quote from the (fictional) Principal Acoustic Engineer leads into the reservation form — a gradient card with an email field and a zero-commitment "$0 today" CTA.

| Light | Dark |
|---|---|
| ![Testimonial and reserve light](./screenshots/light_testimonial-reserve.png) | ![Testimonial and reserve dark](./screenshots/dark_testimonial-reserve.png) |

### 8. Footer
Minimal footer nav mirroring the header, social links, and the fine-print disclaimer that this is a concept design.

| Light | Dark |
|---|---|
| ![Footer light](./screenshots/light_footer.png) | ![Footer dark](./screenshots/dark_footer.png) |

---

## 🛠️ Tech Stack

- **HTML5 / CSS3** — custom properties for theming, no CSS framework
- **Vanilla JavaScript** — theme toggle, color-swatch switching, scroll-triggered animations
- No bundler, no build step, no dependencies

## 🚀 Running Locally

```bash
git clone https://github.com/<your-username>/halcyon.git
cd halcyon
# just open it — no install, no build
open index.html   # macOS
# or start "index.html"   # Windows
# or double-click index.html in your file explorer
```

## 📁 Project Structure

```
halcyon/
├── index.html
├── style.css
├── script.js
└── assets/
```

## 📌 Status

Concept / portfolio project. Not an available product.

---

Built by **Radia** — [RDIX](#) web design.

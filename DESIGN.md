# Tarot Arcana Explorer — Design Guide

## Concept

A spatial exploration app for learning tarot through geography rather than flashcards. The user navigates a 2D worldmap where each arcanum is a place with presence, story, and connections to its neighbors. Learning happens through exploration, not memorization.

## Core Metaphor

**A worldmap you scroll around.** Think Google Maps or a video game overworld — pan, zoom, discover. The spatial arrangement of cards encodes their relationships. Proximity = conceptual similarity. Paths between cards = meaningful connections.

---

## Map Layout

### Coordinate System
- 2D plane, continuous scroll/zoom
- Use Leaflet.js with a custom CRS (no real-world tiles) or Pixi.js with camera controls
- Map bounds should feel large enough to explore but not infinite — maybe 4000x3000 virtual units

### Regions

**The Fool's Road (Major Arcana)**
- A winding path through the center of the map, roughly diagonal
- 22 stops along the road, one per Major Arcanum, in order (0-XXI)
- The road is the spine of the map — everything else is arranged around it
- Visual: a golden/luminous trail with landmarks at each card

**Four Suit Territories (Minor Arcana)**
Each suit occupies a quadrant/region around the Fool's Road:

| Suit | Element | Region Feel | Palette |
|------|---------|-------------|---------|
| **Wands** | Fire | Warm forest/volcanic, energetic terrain | Oranges, reds, amber |
| **Cups** | Water | Coastal/riverine, flowing, reflective | Blues, teals, silver |
| **Swords** | Air | Highland/mountain, sharp, exposed | Grays, whites, pale blue |
| **Pentacles** | Earth | Lowland/garden, grounded, lush | Greens, browns, gold |

Within each suit region:
- **Ace** is at the heart/source — the purest expression of the element
- **Number cards (2-10)** radiate outward from the Ace, arranged by narrative progression
- **Court cards (Page → Knight → Queen → King)** are at the borders/edges of the territory, representing mastery/maturity of the suit's energy

### Thematic Connections
- Cards that share a **number** across suits (e.g., all four 3s) should have a loose spatial alignment — a cross-suit "latitude" line
- Major Arcana cards that thematically resonate with a suit should be positioned near that suit's territory (e.g., The Star near Cups, The Emperor near Pentacles)

---

## Visual Design

### Overall Aesthetic
- **Dark base** — deep navy/charcoal background, like a night sky or old parchment in moonlight
- **Subtle texture** — noise or grain overlay, not flat
- **Warm highlights** — gold, amber, soft white for illuminated/discovered areas
- **Fog of discovery** — undiscovered regions are dimmed/desaturated, discovered regions glow softly

### Card Places (Landmarks)
Each arcanum on the map appears as a **landmark**, not a card:
- **Undiscovered**: A dim, glowing point with a faint symbol. You can see something's there.
- **Discovered**: The landmark expands — shows the card name, a key symbol/icon, and subtle ambient glow in the suit's color palette
- **Selected/Focused**: Full detail panel opens (see below)

### Terrain Texture
- The map isn't blank space with dots — it has **visual terrain** between landmarks
- Color gradients shift as you move between suit territories
- Subtle patterns: wavy lines near Cups, angular marks near Swords, organic shapes near Pentacles, flickering marks near Wands
- The Fool's Road has its own distinct texture — golden, luminous, slightly elevated

### Paths/Edges
- Connections between cards render as **trails** on the map
- Different edge types have different visual styles:
  - **Suit progression**: solid lines in the suit's color (Ace → 2 → 3 → ...)
  - **Numeric resonance**: dotted lines connecting same numbers across suits
  - **Thematic**: subtle, organic paths (revealed on discovery of both endpoints)
  - **Inversion**: not a path — the card itself shifts when you toggle upright/reversed
- Paths start hidden and reveal as you discover both endpoints

---

## Interaction

### Navigation
- **Pan**: click-drag or touch-drag (standard webmap)
- **Zoom**: scroll wheel or pinch (2-3 zoom levels minimum)
- **Click landmark**: select card, open detail panel

### Detail Panel
When a card-place is selected, a panel slides in (bottom sheet on mobile, side panel on desktop):

```
┌─────────────────────────────────┐
│ ✨ THE FOOL (0)                 │
│ Major Arcana                    │
│                                 │
│ ┌─ Upright ──────────────────┐  │
│ │ Beginnings · Innocence ·   │  │
│ │ Spontaneity · Leap of Faith│  │
│ │                            │  │
│ │ The Fool steps into the    │  │
│ │ unknown, trusting the      │  │
│ │ journey without knowing    │  │
│ │ the destination...         │  │
│ └────────────────────────────┘  │
│                                 │
│ ┌─ Reversed ─────────────────┐  │
│ │ Recklessness · Naivety ·   │  │
│ │ Poor planning              │  │
│ │ ...                        │  │
│ └────────────────────────────┘  │
│                                 │
│ Connections:                    │
│  → The Magician (next on Road) │
│  → Ace of Wands (new energy)   │
│  → The World (cycle complete)  │
└─────────────────────────────────┘
```

- Clicking a connection in the panel pans the map to that card
- Connections listed only if the target card is already discovered

### Discovery
- All 78 cards are placed on the map from the start
- Initially all are **dim/undiscovered** (visible but not readable)
- Clicking an undiscovered landmark **discovers** it — reveals name, meaning, connections
- Discovered state persists in localStorage
- A subtle counter shows: "23/78 discovered" 

### Suggested Walks
Optional guided exploration paths:
- "The Fool's Journey" — follow the Major Arcana road start to finish
- "The Suit of Cups" — explore a full suit from Ace to King
- "The Threes" — visit all four 3s and see their connections
- These highlight a path on the map for the user to follow

---

## Technical Architecture

### Stack
- **Vite + TypeScript** (no React needed — this is canvas/map, not forms)
- **Leaflet.js** with `L.CRS.Simple` (custom coordinate system, no real tiles)
  - Custom markers for card landmarks
  - Custom polylines for paths/edges
  - Built-in pan/zoom/touch support
  - Lightweight, well-documented
- **Tailwind CSS v4** for the detail panel and UI chrome
- **localStorage** for discovery state and preferences

### Data Model

```typescript
interface TarotCard {
  id: string;                    // "major-00", "wands-01", etc.
  name: string;                  // "The Fool"
  arcana: 'major' | 'minor';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles' | null;
  rank: number;                  // 0-21 for major, 1-14 for minor
  position: [number, number];    // [x, y] on the map
  uprightKeywords: string[];
  uprightDescription: string;
  reversedKeywords: string[];
  reversedDescription: string;
  symbol: string;                // emoji or unicode symbol
}

interface CardEdge {
  from: string;                  // card id
  to: string;                    // card id
  type: 'suit' | 'numeric' | 'thematic' | 'journey';
  description: string;           // why these cards connect
}

interface DiscoveryState {
  discovered: string[];          // card ids
  visitedEdges: string[];        // "from|to" keys
  lastPosition: [number, number];
  zoom: number;
}
```

### Map Rendering
- Leaflet `L.CRS.Simple` with custom bounds
- Each card is a `L.Marker` with a custom `L.DivIcon` (HTML/CSS landmark)
- Edges are `L.Polyline` instances, initially hidden
- Background "terrain" via a single large image or SVG overlay, or CSS gradient on the map container
- Fog of war: CSS filter on undiscovered markers (desaturate + dim)

### File Structure
```
sr-tarot-trainer/
├── index.html
├── vite.config.ts
├── package.json
├── tsconfig.json
├── .github/workflows/deploy.yml
├── src/
│   ├── main.ts              — entry point, init map
│   ├── map.ts               — Leaflet setup, camera, controls
│   ├── landmarks.ts         — render card markers on map
│   ├── paths.ts             — render edges/connections
│   ├── detail.ts            — detail panel logic
│   ├── discovery.ts         — discovery state, localStorage
│   ├── walks.ts             — guided walk system
│   ├── data/
│   │   ├── cards.ts         — all 78 cards with positions + meanings
│   │   └── edges.ts         — all card connections
│   └── style.css            — Tailwind + custom styles
└── public/
    └── (any static assets)
```

### GitHub Pages
- `vite.config.ts` base: `'/sr-tarot-trainer/'`
- Deploy workflow: `.github/workflows/deploy.yml` using `actions/deploy-pages@v4`

---

## Card Images

Source: Rider-Waite-Smith Pam-A scans from https://steve-p.org/cards/RWSa.html (public domain, 1909)

**Download all 78 card images to `public/cards/` as part of the build.**

Use the small/thumbnail versions for map display (faster loading):
- Base URL: `https://steve-p.org/cards/pix/`
- Format: `.png`

Naming convention:
| Card Type | Pattern | Example |
|-----------|---------|---------|
| Major Arcana (Trumps) | `RWSa-T-{NN}` | `RWSa-T-00.png` (The Fool) through `RWSa-T-21.png` (The World) |
| Pentacles | `RWSa-P-{rank}` | `RWSa-P-0A.png` (Ace), `RWSa-P-02.png`...`RWSa-P-10.png`, `RWSa-P-J1.png` (Page), `RWSa-P-J2.png` (Knight), `RWSa-P-QU.png` (Queen), `RWSa-P-KI.png` (King) |
| Wands | `RWSa-W-{rank}` | Same rank pattern as Pentacles |
| Cups | `RWSa-C-{rank}` | Same rank pattern |
| Swords | `RWSa-S-{rank}` | Same rank pattern |

**Important:** Download these images into `public/cards/` during project setup (use a script or curl). Do NOT hotlink to steve-p.org at runtime — serve them locally from the app's own assets.

The card data model should map each card's `id` to its image filename so the app can render `<img src="/cards/RWSa-T-00.png">` etc.

## What NOT To Build

- No flashcard/quiz mode
- No React — vanilla TS with Leaflet is lighter and better suited
- No server/backend
- No login/accounts
- No animations that block interaction — keep it snappy

---

## Success Criteria

The app is successful when:
1. You can open it and immediately start scrolling around a map
2. Clicking a place reveals a card and its story
3. Navigating connections naturally teaches you how cards relate
4. After 20 minutes of exploration, you know more about tarot than after 20 minutes of flashcards
5. It feels like exploring a world, not using an app

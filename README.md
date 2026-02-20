# Tarot Explorer

An interactive study tool for the Rider-Waite-Smith tarot deck. Not a fortune-telling app — a research instrument for exploring the symbology, structure, and interconnected meaning systems embedded in 78 cards.

**[Live Demo →](https://lostinplace.github.io/TarotExplorer/)**

![Tarot Explorer — Tree of Life Map](docs/screenshot-tree.png)

---

## What This Is

The RWS tarot deck is a 20th-century collage of older symbolic systems: Kabbalah, astrology, alchemy, numerology, Hermeticism, Greek mystery traditions, and Christian mysticism. Arthur Edward Waite and Pamela Colman Smith packed all of this into 78 images, and most tarot resources reduce that density to keywords and fortune-cookie interpretations.

Tarot Explorer treats the deck as what it is: a structured symbolic language. The app provides three interlocking systems for studying it:

### 🃏 Cards — Deep Symbology Data

Each of the 78 cards is documented with:

- **Visual symbology** — discrete elements in the RWS artwork (what you see, what it means, what tradition it comes from)
- **Correspondences** — Golden Dawn attributions: Hebrew letters, Tree of Life paths, astrological assignments, elemental mappings, numerological relationships
- **Connections** — typed relationships between cards (polarity, sequence, echo, shadow)
- **Court card personalities** — elemental dignities explained as recognizable human types (who this person is, how they show up, how they go wrong)
- **Themes and questions** — conceptual handles and contemplative prompts
- **References** — specific, actionable pointers to primary sources (book, author, chapter, what to look for)

### 🗺️ Maps — Multiple Spatial Lenses

Cards don't have fixed positions. Instead, **maps** arrange the same 78 cards according to different organizing systems:

| Map | What It Shows |
|-----|---------------|
| **Tree of Life** | The Kabbalistic scaffold: 10 Sephiroth, 22 paths, cards placed by Golden Dawn attributions |
| **Elemental Compass** | Four suits as cardinal directions by element, Majors at center |
| **Fool's Journey** | Major Arcana as a narrative arc in three acts, Minors orbiting thematically |
| **Numerological Grid** | Cards grouped by number across suits, revealing cross-element patterns |
| **Astrological Wheel** | Zodiac wheel with cards placed by decan, sign, and planetary attribution |
| **The Descent** | A focused vertical map for the Descent walk — 11 cards, U-shaped path |

Switching between maps is itself a learning tool — watching the same cards rearrange reveals which relationships are structural and which are lens-dependent.

### 🚶 Walks — Narrative Journeys

Walks are guided stories through subsets of the deck. Each step visits a card with narrative prose, transitions between steps, contemplative reflections, and scholarly asides:

| Walk | Cards | What It Teaches |
|------|-------|-----------------|
| **The Fool's Journey** | 22 Major Arcana | The archetypal story of psychological/spiritual development |
| **The Descent and Return** | 11 Major + Minor | The underworld journey — Inanna, Persephone, Orpheus — traced through both arcana |
| **The Life of Fire** | 10 Wands (Ace–Ten) | The life cycle of creative will, from spark to burden |
| **The Life of Water** | 10 Cups (Ace–Ten) | The life cycle of emotional experience, from overflow to rainbow |
| **The Life of Air** | 10 Swords (Ace–Ten) | The life cycle of thought, from clarity to collapse to dawn |
| **The Life of Earth** | 10 Pentacles (Ace–Ten) | The life cycle of craft and material reality, from seed to legacy |
| **The Shadow Walk** | 24 steps (12 pairs) | Card pairs as mirrors — polarity thinking through opposition |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/lostinplace/TarotExplorer.git
cd TarotExplorer
npm install
npm run dev
```

Open `http://localhost:5174/sr-tarot-trainer/` in your browser.

### Build

```bash
npm run build
```

Static output goes to `dist/`. Deployed automatically to GitHub Pages via the included workflow.

---

## Project Structure

```
src/
├── data/
│   ├── cards/              # 78 YAML files — one per card
│   │   ├── major-00.yaml   # The Fool
│   │   ├── major-01.yaml   # The Magician
│   │   ├── ...
│   │   ├── cups-01.yaml    # Ace of Cups
│   │   ├── ...
│   │   └── pentacles-14.yaml
│   ├── maps/               # Spatial arrangements
│   │   ├── tree-of-life.yaml
│   │   ├── elemental-compass.yaml
│   │   ├── fools-journey.yaml
│   │   ├── numerology.yaml
│   │   ├── astrological.yaml
│   │   └── descent.yaml
│   ├── walks/              # Narrative journeys
│   │   ├── 01-fools-journey.yaml
│   │   ├── 02-descent-and-return.yaml
│   │   ├── 03-four-lives-wands.yaml
│   │   ├── 04-four-lives-pentacles.yaml
│   │   ├── 05-four-lives-cups.yaml
│   │   ├── 06-four-lives-swords.yaml
│   │   └── 07-shadow-walk.yaml
│   ├── CARD_SCHEMA.md      # Card data specification
│   ├── MAP_SCHEMA.md       # Map data specification
│   └── WALK_SCHEMA.md      # Walk data specification
├── main.ts                 # App entry point
├── map.ts                  # Map rendering (pan, zoom, cards)
├── detail.ts               # Card detail panel
├── walkPanel.ts            # Walk narrative panel
├── paths.ts                # Connection line rendering
├── state.ts                # App state management
├── types.ts                # TypeScript types
└── style.css               # Styles
```

---

## Data Schemas

The data layer is designed to be human-readable and editable. All card, map, and walk data lives in YAML files with documented schemas:

- **[CARD_SCHEMA.md](src/data/CARD_SCHEMA.md)** — Card data specification with worked example (The High Priestess)
- **[MAP_SCHEMA.md](src/data/MAP_SCHEMA.md)** — Map data specification with design rationale for all six maps
- **[WALK_SCHEMA.md](src/data/WALK_SCHEMA.md)** — Walk data specification with narrative structure guidelines

### Key Design Decisions

**Cards don't know where they are.** Position is a property of the map, not the card. The same card appears in different places depending on which spatial lens is active.

**Walks are narrative, maps are spatial.** They're complementary views of the same data, not competing systems. A walk tells you *why* cards relate; a map shows you *where* they sit relative to each other.

**Meanings are grounded in symbology, not advice.** The card data describes what the symbols mean and what traditions they come from. It does not tell you what to do about your love life. The `personality` section on court cards is the closest thing to "relatable" content, and it's clearly separated from the symbolic analysis.

**References are actionable.** Every reference includes author, specific section, and a note on what to look for. "Read about Kabbalah" is useless. "Read Regardie on the path of Gimel and understand why it crosses the Abyss" is a research prompt.

---

## Contributing

### Adding or Improving Card Data

Card data is the heart of the project. Every improvement to a card's imagery descriptions, correspondences, connections, or references makes the tool more useful. Read `CARD_SCHEMA.md` and look at `major-02.yaml` (The High Priestess) as the quality bar.

**Particularly welcome:**
- Corrections to Golden Dawn attributions or astrological assignments
- More specific imagery descriptions grounded in art-historical analysis of the actual RWS artwork
- Additional references to primary sources (Waite, Crowley, Regardie, Pollack, etc.)
- Cross-cultural connections (e.g., how RWS imagery relates to older Marseille traditions)

### Adding Maps

New maps are standalone YAML files. See `MAP_SCHEMA.md`. Some ideas:
- A **historical** map showing how card imagery evolved across deck traditions
- A **Jungian** map organized by archetype
- A **spread** map that arranges cards in common reading layouts (Celtic Cross, etc.)

### Adding Walks

New walks are standalone YAML files. See `WALK_SCHEMA.md`. Some ideas:
- **Numbers as Teachers** — cross-suit walks by number ("The Lesson of Five")
- **The Court as Personality** — 16 court cards by rank, with Jungian typology
- **The Tree of Life Ascent** — Major Arcana walked in reverse, Malkuth to Kether

---

## Esoteric Systems Referenced

This project draws on established symbolic traditions. For readers unfamiliar with these systems:

- **Kabbalah / Tree of Life** — A Jewish mystical framework describing 10 divine emanations (Sephiroth) connected by 22 paths. The Golden Dawn mapped the 22 Major Arcana to these paths and the 40 pip cards to the Sephiroth.
- **Golden Dawn** — The Hermetic Order of the Golden Dawn (1888–1903), the occult society that systematized most of the correspondences used in modern tarot. Waite was a member.
- **Elemental Dignities** — The system of assigning elements to court card ranks (Kings=Air, Queens=Water, Knights=Fire, Pages=Earth), creating "element of element" descriptions like "Water of Water" (Queen of Cups).
- **Decans** — Each zodiac sign is divided into three 10° segments, each ruled by a planet. The Golden Dawn assigned one pip card (2–10) to each of the 36 decans.
- **Numerological Reduction** — Adding a number's digits until you reach a single digit (e.g., 17→1+7=8). Cards sharing a root number share thematic resonance.

---

## RWS Card Images

Card images are from the public domain Rider-Waite-Smith deck (first published 1909, US copyright expired). The specific scan set used is the "RWSa" (Rider-Waite-Smith, version A) collection.

---

## License

MIT

---

*Built as a tool for thinking, not a replacement for it.*

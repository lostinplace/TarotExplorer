# Map Schema

## Core Idea

Cards have identity and meaning. Maps have spatial arrangement and interpretive logic. These are separate concerns.

A map is a **spatial lens** — a way of arranging the 78 cards that encodes a particular system of relationships. Different maps teach different things. The user selects which map they want to explore, and the same cards appear in different positions with different visual connections depending on the active map.

---

## Card Schema Change

Remove `position` from card data entirely. Cards no longer know where they are — maps tell them.

---

## Map Data Structure

Each map is a standalone YAML file in `src/data/maps/`.

```yaml
# === IDENTITY ===
id: string                    # e.g. "tree-of-life", "fools-journey", "elemental-compass"
name: string                  # Human-readable: "Tree of Life", "The Fool's Journey"
description: string           # 2-3 sentences: what this map shows and why

# === CANVAS ===
canvas:
  width: number               # Logical canvas width
  height: number              # Logical canvas height

# === REGIONS ===
# Optional grouping structure. Not all maps need regions.
# Regions give the map a visible scaffold — areas with labels and boundaries
# that the user can learn to recognize.
regions:
  - id: string                # e.g. "kether", "earth-quadrant", "act-1"
    name: string              # Display name: "Kether (Crown)", "Earth / North"
    description: string       # What this region represents in this map's system
    center: [x, y]            # Center point of the region
    radius: number            # Approximate radius for visual grouping (circle)
                              # OR use bounds: [[x1,y1],[x2,y2]] for rectangles

# === PATHS ===
# Optional visual connections between regions or cards.
# These are the "lines on the map" — they encode relationships that are
# structural to this map's system (not to be confused with card.connections,
# which are semantic/symbolic).
paths:
  - from: string              # region id or card id
    to: string                # region id or card id
    label: string | null      # Optional label for the path
    style: string | null      # Visual hint: "solid", "dashed", "faint"

# === CARD PLACEMENTS ===
# Where each card goes on this map.
cards:
  major-00: [x, y]
  major-01: [x, y]
  major-02: [x, y]
  # ... all 78 cards
  # Cards can be omitted if a map intentionally excludes them
  # (e.g. a "Major Arcana Only" map)
```

---

## Proposed Maps

### 1. Tree of Life (`tree-of-life`)

The Kabbalistic scaffold. 10 Sephiroth as regions, 22 paths for the Major Arcana, pips grouped by number into their Sephirah, court cards by world.

**What it teaches:** The deep structural system the Golden Dawn embedded in the RWS deck. Why the numbers matter. Why the Majors are ordered the way they are. How the four suits relate to the four worlds.

**Regions:** Kether, Chokmah, Binah, Chesed, Geburah, Tiphareth, Netzach, Hod, Yesod, Malkuth (+ optionally Da'ath)

**Paths:** The 22 connections between Sephiroth, each carrying one Major Arcana card.

**Card placement logic:**
- Major Arcana → midpoint of their assigned path between two Sephiroth
- Pips (Ace–10) → clustered within their number's Sephirah (Aces in Kether, Twos in Chokmah, etc.)
- Court cards → layered by world (Kings/Atziluth outermost, Pages/Assiah innermost) — or arranged in a band around the tree

---

### 2. The Fool's Journey (`fools-journey`)

The Major Arcana as a linear or spiral narrative path, with minor arcana orbiting thematically.

**What it teaches:** The archetypal story of psychological/spiritual development. How each Major card represents a stage of growth. The narrative logic of the trump sequence.

**Regions:** Three acts or rows:
- **Act I (0–7):** The Conscious / Worldly — Fool through Chariot
- **Act II (8–14):** The Search / Inward Turn — Strength through Temperance
- **Act III (15–21):** The Cosmic / Integration — Devil through World

**Paths:** Sequential connections between Major Arcana. Key thematic leaps highlighted (e.g., Death → Temperance, Tower → Star).

**Card placement logic:**
- Major Arcana → along a winding path or spiral, evenly spaced
- Minor Arcana → clustered near the Major card(s) they most thematically echo (using the `connections` data from the card schema)

---

### 3. Elemental Compass (`elemental-compass`)

Four quadrants, one per element/suit. Majors in the center.

**What it teaches:** Elemental relationships. The contrast between suits. How the pip progression (Ace → 10) tells a story within each element. How court cards represent elemental personalities.

**Regions:** Four quadrants + center
- North / Earth → Pentacles
- East / Air → Swords
- South / Fire → Wands
- West / Water → Cups
- Center → Major Arcana

**Card placement logic:**
- Pips radiate outward from center by number (Ace nearest, 10 farthest)
- Court cards at the outer edge of their quadrant
- Majors arranged in a circle or cluster at the center, possibly grouped by elemental affinity

---

### 4. Numerological Grid (`numerology`)

Cards grouped by number across all suits, emphasizing what the numbers themselves mean.

**What it teaches:** Numerological patterns. What all the Threes have in common. What all the Fives share. How the same number manifests differently across elements.

**Regions:** Rows or columns by number (1–10), plus a court section and Major section.

**Card placement logic:**
- Each row = one number (Ace row, Two row, etc.)
- Four columns = four suits
- Majors grouped by their numerological reduction (e.g., 10 The Wheel, 19 The Sun → both reduce to 1)
- Court cards in their own section, grouped by rank (all Pages, all Knights, etc.)

---

### 5. Astrological Wheel (`astrological`)

Cards arranged on a zodiac wheel by their astrological correspondences.

**What it teaches:** The astrological framework behind tarot. Which cards correspond to which signs, planets, and decans. How astrology and tarot are parallel symbol systems.

**Regions:** 12 zodiac signs around a wheel, with planetary bodies in the center.

**Card placement logic:**
- Major Arcana with zodiac attributions → on their sign's position around the wheel
- Major Arcana with planetary attributions → in the center, near their planet
- Minor pip cards → by decan (each decan of the zodiac corresponds to specific pip cards in the Golden Dawn system)
- Court cards → by their elemental/zodiac overlap

---

## Future Maps (user or community could create)

- **Historical** — cards arranged by when their imagery evolved (pre-RWS → RWS → Thoth → modern)
- **Psychological** — Jungian archetypes as the organizing principle
- **Practical Spreads** — Celtic Cross, three-card, etc. as interactive layouts
- **Personal** — user's own arrangement based on their experience with each card

---

## Implementation Notes

- The app needs a map selector in the UI
- Card rendering reads position from the active map, not from the card data
- Transitions between maps could animate cards moving to new positions (satisfying + teaches by showing which cards move far vs. stay close)
- Maps can omit cards — e.g., a "Major Arcana Journey" map only places 22 cards
- Maps can include the same card in multiple visual states if needed (e.g., a card at a path midpoint AND in a Sephirah cluster) — though this adds complexity, probably v2
- Regions and paths are rendered as background/overlay layers beneath the cards

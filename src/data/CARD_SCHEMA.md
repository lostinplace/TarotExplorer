# Card Data Schema

## Design Goals

1. **Layered depth** — a beginner skims keywords; an intermediate reads symbolism; an advanced user follows correspondences and references into primary sources
2. **Visual literacy** — the `imagery` section teaches you to *read* the Rider-Waite-Smith artwork, not just know what the card "means"
3. **Connective thinking** — `connections` and `correspondences` let you see how cards relate to each other and to broader symbolic systems (Kabbalah, astrology, alchemy, numerology)
4. **Research launchpad** — `references` and `questions` give the user threads to pull on

---

## Schema

```yaml
# === IDENTITY ===
id: string                # e.g. "major-02", "cups-07"
name: string              # e.g. "The High Priestess"
arcana: major | minor
suit: null | wands | cups | swords | pentacles
rank: number              # 0-21 for major, 1-14 for minor

# === DISPLAY ===
position: [x, y]          # layout coordinates (existing)
image: string             # RWS image filename
symbol: string            # emoji shorthand

# === CORE MEANINGS ===
upright:
  keywords: [string]      # 4-6 keywords
  meaning: string         # 2-3 sentences. What this card communicates.

reversed:
  keywords: [string]
  meaning: string

# === VISUAL SYMBOLOGY ===
# Each element visible in the RWS artwork, what it signifies,
# and where it connects to broader traditions.
imagery:
  - element: string       # What you see: "Two pillars marked B and J"
    significance: string  # What it means: "Boaz (severity) and Jachin (mercy)..."
    tradition: string     # Where it comes from: "Kabbalistic / Freemasonic"

# === CORRESPONDENCES ===
# Formal symbolic mappings from established esoteric systems.
correspondences:
  element: string | null          # Fire, Water, Air, Earth (minor always has one; major varies)
  planet: string | null           # Planetary ruler if applicable
  zodiac: string | null           # Zodiac sign if applicable
  hebrew_letter: string | null    # For major arcana — Golden Dawn attribution
  tree_of_life: string | null     # Path or Sephirah, e.g. "Gimel: Kether → Tiphareth"
  numerology: string | null       # Numerological significance of the rank
  colors: [string]                # Dominant symbolic colors in the image

# === CONNECTIONS ===
# How this card relates to other cards. Not just "similar vibes" —
# structural, narrative, or symbolic links.
connections:
  - card: string          # id of related card, e.g. "major-01"
    relationship: string  # Nature of connection: "polarity", "sequence", "echo", "shadow"
    description: string   # Why they connect

# === PERSONALITY (Court Cards Only) ===
# Only for ranks 11-14 (Page, Knight, Queen, King).
# Court cards are people — or modes of being that feel like people.
# This section describes the court card as a recognizable personality,
# distinct from the symbolic/cultural analysis in upright/reversed.
# upright/reversed meanings should stay grounded in symbology and tradition.
# personality is where the human, relatable, "you know this person" content lives.
personality:
  summary: string           # Who she is in plain language — a felt portrait, not keywords.
                            # Write this as though describing someone you know.
  elemental_dignity: string # The card's element-within-element explained as lived experience.
                            # e.g. "Water of Water means feeling IS her intelligence"
  as_a_person: string       # When this card represents a person in a reading — who to look for.
  as_an_energy: string      # When this card represents a mode of being or invitation.
  shadow: string            # The specific way this personality goes wrong — not just
                            # "reversed keywords" but the recognizable human pattern.
                            # The martyr, the tyrant, the coward, the manipulator.

# === DEEPER READING ===
# Themes and questions to expand the reader's thinking.
# These aren't quiz questions — they're contemplative prompts.
themes:
  - string                # e.g. "The power of not-knowing"
                          # e.g. "Receptivity as a form of strength"

questions:
  - string                # e.g. "What knowledge can only be accessed through stillness?"
                          # e.g. "Where in your life are you ignoring intuition in favor of logic?"

# === REFERENCES ===
# Primary and secondary sources for deeper research.
# Each should be specific enough to find, not just "read about Kabbalah."
references:
  - title: string         # e.g. "The Pictorial Key to the Tarot"
    author: string        # e.g. "Arthur Edward Waite"
    relevance: string     # What specifically to look for in this source
    section: string | null  # Chapter, page range, or section name if applicable
```

---

## Example: The High Priestess

```yaml
id: major-02
name: The High Priestess
arcana: major
suit: null
rank: 2
position: [750, 1350]
image: RWSa-T-02.png
symbol: 🌙

upright:
  keywords:
    - Intuition
    - Hidden knowledge
    - The unconscious
    - Stillness
    - Mystery
    - Receptivity
  meaning: >
    The High Priestess guards the threshold between the known and the unknown.
    She does not act — she receives. Wisdom here comes not from seeking but
    from stillness, not from analysis but from listening to what lies beneath
    the surface of consciousness.

reversed:
  keywords:
    - Blocked intuition
    - Secrets and deception
    - Superficial knowledge
    - Disconnection from inner self
    - Information withheld
  meaning: >
    Reversed, the veil thickens. You may be ignoring your intuition, relying
    too heavily on rational analysis, or someone is deliberately withholding
    information. Can also indicate esoteric knowledge pursued for ego rather
    than understanding — knowing the words without feeling the meaning.

imagery:
  - element: "Two pillars — black (B) and white (J)"
    significance: >
      Boaz (בועז, 'in strength') and Jachin (יכין, 'he establishes') — the
      pillars of Solomon's Temple. They represent duality: severity and mercy,
      dark and light, the manifest and unmanifest. The Priestess sits between
      them, not choosing either — she IS the threshold.
    tradition: "Kabbalistic / Freemasonic — 1 Kings 7:21"

  - element: "Veil with pomegranates between the pillars"
    significance: >
      The veil separates the conscious from the unconscious mind. The
      pomegranates reference Persephone's descent to the underworld — the
      knowledge that comes from crossing into darkness. The pattern suggests
      the Tree of Life. You cannot see what's behind the veil; you must go
      through her to reach it.
    tradition: "Greek mystery traditions / Kabbalistic"

  - element: "Scroll labeled TORA, partially hidden"
    significance: >
      The Torah (divine law) or TARO (an anagram) — esoteric knowledge that
      is never fully revealed. She holds it but does not display it openly.
      The partial concealment is the point: some knowledge can only be
      apprehended, not transmitted.
    tradition: "Western esoteric / Hermetic"

  - element: "Crescent moon at her feet"
    significance: >
      The moon governs cycles, tides, the unconscious. At her feet, it
      suggests she has mastery over the lunar/intuitive realm — it serves her
      rather than controlling her. Also connects to her role as a lunar
      counterpart to The Magician's solar energy.
    tradition: "Astrological / Goddess traditions"

  - element: "Blue robe flowing like water"
    significance: >
      Water is the element of emotion, intuition, and the unconscious. Her
      robes merge with what appears to be flowing water at the bottom of the
      card — she is continuous with the unconscious, not separate from it.
    tradition: "Elemental symbolism"

  - element: "Equal-armed cross on her chest"
    significance: >
      The solar cross or cross of the four elements, centered on her heart.
      Balances masculine/solar energy within a feminine/lunar figure.
      Suggests wholeness — she contains both polarities.
    tradition: "Hermetic / Rosicrucian"

  - element: "Crown: lunar disc between two horns"
    significance: >
      The crown of Hathor/Isis — the full moon cradled by the waxing and
      waning crescents. Triple goddess symbolism: maiden, mother, crone.
      Connects her to ancient priestess traditions predating Christianity.
    tradition: "Egyptian / Triple Goddess"

correspondences:
  element: Water
  planet: Moon
  zodiac: null
  hebrew_letter: "Gimel (ג)"
  tree_of_life: "Path 13: Kether (Crown) → Tiphareth (Beauty)"
  numerology: >
    2 — duality, polarity, the first division from unity. The number of
    reflection (as a mirror creates a second image) and of choice
    (two paths, two pillars).
  colors:
    - Blue (unconscious, water, depth)
    - White (purity, moonlight, the unmanifest)
    - Black (mystery, the unknown, severity)

connections:
  - card: major-01
    relationship: polarity
    description: >
      The Magician acts; the High Priestess receives. He channels power
      downward into manifestation; she draws wisdom upward from the
      unconscious. Together they represent the active and passive modes
      of engaging with the unseen.

  - card: major-03
    relationship: sequence
    description: >
      The Empress is the Priestess made manifest — intuition expressed
      as creation, the unconscious given form in the material world.
      The Priestess knows; the Empress births.

  - card: major-18
    relationship: echo
    description: >
      The Moon card amplifies the Priestess's lunar themes into a full
      landscape of the unconscious — illusion, fear, the long path
      through darkness. Where the Priestess is composed, The Moon is
      the experience of being lost in what she guards.

  - card: major-05
    relationship: polarity
    description: >
      The Hierophant teaches public doctrine; the Priestess holds esoteric
      knowledge. He is the outer church; she is the inner mystery. Both
      are spiritual authorities, but through opposite modes.

themes:
  - "The power of receptivity — strength through stillness rather than action"
  - "Liminal space — the threshold as a place of power, not just passage"
  - "Hidden knowledge — what can be known but not spoken"
  - "The anima — Jung's concept of the feminine aspect of the unconscious mind"
  - "Duality without opposition — holding two truths without choosing"

questions:
  - "What do you know that you can't prove or explain?"
  - "Where are you forcing action when the situation calls for patience?"
  - "What would change if you treated not-knowing as a kind of wisdom?"
  - "What's behind your personal veil — what are you not looking at?"
  - "When has silence communicated more than words?"

references:
  - title: "The Pictorial Key to the Tarot"
    author: "Arthur Edward Waite"
    relevance: "Waite's own description of the card he commissioned Pamela Colman Smith to paint. Note what he emphasizes and what he deliberately obscures."
    section: "Part II: The Major Trumps — II. The High Priestess"

  - title: "Seventy-Eight Degrees of Wisdom"
    author: "Rachel Pollack"
    relevance: "The most influential modern reading of the RWS deck. Pollack's treatment of the Priestess emphasizes the feminist and psychological dimensions."
    section: "Chapter 2: The High Priestess"

  - title: "The Book of Thoth"
    author: "Aleister Crowley"
    relevance: "Crowley's parallel card (The Priestess) in the Thoth deck. Useful for contrast — he leans harder into the Kabbalistic path of Gimel and the camel symbolism."
    section: "Atu II: The Priestess"

  - title: "A Garden of Pomegranates"
    author: "Israel Regardie"
    relevance: "For understanding the Tree of Life path attributions. The path of Gimel connecting Kether to Tiphareth is the highest path that crosses the Abyss."
    section: "Chapter on the Paths"

  - title: "The Woman's Encyclopedia of Myths and Secrets"
    author: "Barbara G. Walker"
    relevance: "Background on the goddess traditions (Isis, Hathor, Persephone) that inform the Priestess imagery."
    section: null
```

---

## Notes on the Schema

**Why `imagery` is a list of discrete elements:** Each visual symbol in an RWS card is a deliberate choice by Waite and Pamela Colman Smith. Breaking them out individually teaches the user to *look* at the card — to read it like a visual text rather than memorizing a keyword. The `tradition` field connects each symbol to its source, showing that the RWS deck is a collage of multiple esoteric traditions.

**Why `connections` uses typed relationships:**
- `polarity` — cards that mirror or oppose each other
- `sequence` — narrative/developmental progression
- `echo` — cards that rhyme thematically across the deck
- `shadow` — a card that represents the dark side or unconscious aspect of another

These relationship types help the user think *structurally* about the deck rather than card-by-card.

**Why `themes` and `questions` are separate:** Themes are conceptual handles — they connect the card to ideas bigger than tarot. Questions are personal — they turn the card into a mirror. Together they make the card a thinking tool, not just a reference entry.

**Why `references` include `relevance` and `section`:** "Go read Waite" is useless. "Read Waite's own description and notice what he hides" is a research prompt that teaches critical reading.

**Minor arcana will be lighter:** Not every card needs seven imagery entries and five references. The schema allows sparse population — a Pip card might have 2-3 imagery elements and 1-2 references. The structure stays consistent; the depth scales with the card's complexity.

# Walk Schema

## Core Idea

A **walk** is a narrative path through a subset of the deck. It tells a story by visiting cards in a meaningful sequence, with prose connecting each step to the next.

Maps show spatial relationships (where cards sit relative to each other). Walks show **temporal/narrative relationships** (how cards unfold as a journey). The same card can appear in multiple walks, playing a different role in each story.

Walks are the primary teaching tool for understanding the deck as a *system of meaning* rather than a collection of isolated symbols.

---

## Schema

Each walk is a YAML file in `src/data/walks/`.

```yaml
# === IDENTITY ===
id: string                    # e.g. "fools-journey", "descent-of-the-feminine"
name: string                  # "The Fool's Journey", "The Descent of the Feminine"
description: string           # 2-3 sentences: what story this walk tells and why it matters

# === METADATA ===
author: string | null         # Who wrote this walk (for community/user-created walks)
tradition: string | null      # What system or tradition this walk draws from
                              # e.g. "Golden Dawn", "Jungian", "Kabbalistic", "Original"

# === STRUCTURE ===
# A walk can optionally be divided into acts/chapters.
# Acts group steps into narrative phases — they're not required but add
# structure for longer walks.
acts:
  - id: string                # e.g. "act-1", "the-descent"
    name: string              # "The Worldly", "The Descent"
    description: string       # What this phase of the journey represents
    steps: [string]           # List of step ids that belong to this act

# === STEPS ===
# The heart of the walk. Each step is a card (or cards) visited in sequence,
# with narrative prose that tells the story.
steps:
  - id: string                # Unique within this walk, e.g. "step-00", "the-threshold"
    card: string              # Primary card id, e.g. "major-00"
    cards: [string] | null    # Optional: multiple cards if this step involves a group
                              # (e.g. "all four Aces" or "the Lovers and the Devil")
    title: string | null      # Optional step title (if different from card name)
    narrative: string         # The story prose for this step — what happens, what is learned
    transition: string | null # How this step connects to the next — the bridge between beats
                              # This is the connective tissue that makes it a story rather
                              # than a list. Appears after the narrative, before the next step.
    reflection: string | null # Optional contemplative prompt specific to this point in the
                              # walk (distinct from the card's own questions — this one is
                              # about the narrative position, not the card in isolation)
    aside: string | null      # Optional scholarly/esoteric note — a sidebar that adds depth
                              # without interrupting the narrative flow. Could reference
                              # traditions, parallel myths, or connections the reader might
                              # want to pursue.

# === CONNECTIONS ===
# How this walk relates to other walks. Helps the user discover new paths.
connections:
  - walk: string              # id of related walk
    relationship: string      # "parallel", "counterpoint", "deepens", "subset"
    description: string       # Why these walks relate
```

---

## Design Notes

### Why `narrative` and `transition` are separate

The narrative is the *scene* — what happens at this card. The transition is the *cut* — how the story moves from one card to the next. Separating them lets the UI render them differently (e.g., transitions as italicized connective text between cards, or as the text that appears during an animated transition between steps).

### Why `reflection` exists alongside card questions

A card's `questions` in the card schema are about the card in isolation. A walk's `reflection` is about the card *in context of the story so far*. "What do you know that you can't prove?" is a High Priestess question in any context. "What did you learn from stillness that action couldn't teach you?" is a question that only makes sense after you've already met the Magician.

### Why `aside` exists

Some walks want to be pure story. Others want to layer in scholarship — "this mirrors Persephone's descent" or "the Golden Dawn placed this card on the path between Chesed and Geburah because..." The aside lets the walk carry both without the scholarly notes breaking narrative flow. The UI can render these as expandable sidebars, footnotes, or a secondary layer.

### Why `cards` (plural) is optional

Most steps visit one card. But some narrative moments involve a group: "The Fool meets all four Aces" or "The Lovers and The Devil are two faces of the same choice." The plural field allows this without forcing every step to use array syntax.

### Why acts are optional

Short walks (5-10 cards) don't need acts. Long walks (the full Major Arcana, or a journey through all 78) benefit from narrative structure. Acts are referenced by step id, so you can reorganize acts without touching the steps themselves.

---

## Proposed Walks

### The Fool's Journey (`fools-journey`)
The classic. The Fool encounters each Major Arcana card in sequence as stages of psychological/spiritual development. Three acts: The Worldly (0-7), The Inward Turn (8-14), The Cosmic (15-21). This is the foundational walk — most people's first encounter with the Major Arcana as a narrative.

### The Descent and Return (`descent-and-return`)
A non-linear walk through cards that echo the myth of descent into the underworld — Persephone, Inanna, Orpheus. High Priestess → Hanged Man → Death → The Moon → The Star → The World. Focuses on the cards that involve going *down* (into the unconscious, into death, into darkness) and coming back transformed.

### The Four Suits as Four Lives (`four-lives`)
Four parallel walks — one per suit — that tell the story of the pip cards (Ace through Ten) as a complete life cycle within each element. The Ace is birth, the Ten is completion/crisis. Walked in parallel, they show how the same journey of growth manifests differently in Fire, Water, Air, and Earth.

### The Court as a Person (`court-personalities`)
A walk through the 16 court cards organized not by suit but by rank — all four Pages, then all four Knights, then Queens, then Kings. Each step compares how the same developmental stage (student, seeker, inner master, outer master) looks in different elements. The aside layer carries Jungian personality typology.

### The Shadow Walk (`shadow-walk`)
Pairs of cards connected by their shadow relationship — cards that represent each other's dark side or unconscious complement. Magician↔Devil, Empress↔Emperor, Star↔Moon, etc. Each step visits both cards and explores what each reveals about the other. This walk teaches polarity thinking.

### The Tree of Life Ascent (`tree-ascent`)
A Kabbalistic walk from Malkuth to Kether — ascending the Tree of Life through the Major Arcana paths. Starts at The World (Malkuth→Yesod) and ends at The Fool (Kether→Chokmah). Reverses the Fool's Journey: instead of descending into manifestation, the seeker ascends toward unity. Heavy on esoteric content in the aside layer.

### Numbers as Teachers (`number-walk`)
Walks through each number (1 through 10) across all four suits plus the corresponding Major Arcana. "The Lesson of Five": Five of Wands, Five of Cups, Five of Swords, Five of Pentacles, The Hierophant (5), Temperance (14→5). What does disruption look like in fire, water, air, earth, and spirit?

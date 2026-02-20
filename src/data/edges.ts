import { CardEdge } from '../types';

export const edges: CardEdge[] = [
  // ═══════════════════════════════════════
  // THE FOOL'S JOURNEY — Major Arcana sequence
  // ═══════════════════════════════════════
  { from: 'major-00', to: 'major-01', type: 'journey', description: 'The Fool meets The Magician — potential discovers willpower' },
  { from: 'major-01', to: 'major-02', type: 'journey', description: 'Willpower meets intuition — the conscious and unconscious minds' },
  { from: 'major-02', to: 'major-03', type: 'journey', description: 'Inner knowing gives birth to creative abundance' },
  { from: 'major-03', to: 'major-04', type: 'journey', description: 'Nurturing meets structure — mother and father archetypes' },
  { from: 'major-04', to: 'major-05', type: 'journey', description: 'Worldly authority meets spiritual tradition' },
  { from: 'major-05', to: 'major-06', type: 'journey', description: 'Tradition confronts the choice of the heart' },
  { from: 'major-06', to: 'major-07', type: 'journey', description: 'Choice leads to determined action' },
  { from: 'major-07', to: 'major-08', type: 'journey', description: 'Outer conquest yields to inner strength' },
  { from: 'major-08', to: 'major-09', type: 'journey', description: 'Inner strength leads to solitary wisdom' },
  { from: 'major-09', to: 'major-10', type: 'journey', description: 'The Hermit\'s wisdom meets the turning Wheel' },
  { from: 'major-10', to: 'major-11', type: 'journey', description: 'Fortune\'s cycles demand Justice\'s balance' },
  { from: 'major-11', to: 'major-12', type: 'journey', description: 'Justice\'s clarity invites surrender of perspective' },
  { from: 'major-12', to: 'major-13', type: 'journey', description: 'Surrender opens the door to transformation' },
  { from: 'major-13', to: 'major-14', type: 'journey', description: 'After death comes the healing of Temperance' },
  { from: 'major-14', to: 'major-15', type: 'journey', description: 'Balance is tested by shadow and bondage' },
  { from: 'major-15', to: 'major-16', type: 'journey', description: 'The Devil\'s chains shatter with The Tower' },
  { from: 'major-16', to: 'major-17', type: 'journey', description: 'After destruction, hope returns with The Star' },
  { from: 'major-17', to: 'major-18', type: 'journey', description: 'Hope navigates the Moon\'s illusions' },
  { from: 'major-18', to: 'major-19', type: 'journey', description: 'Through illusion emerges The Sun\'s clarity' },
  { from: 'major-19', to: 'major-20', type: 'journey', description: 'Joy leads to the reckoning of Judgement' },
  { from: 'major-20', to: 'major-21', type: 'journey', description: 'Judgement\'s rebirth completes The World' },
  { from: 'major-21', to: 'major-00', type: 'journey', description: 'The World completes the cycle — The Fool begins again' },

  // ═══════════════════════════════════════
  // SUIT PROGRESSIONS
  // ═══════════════════════════════════════
  // Wands
  ...Array.from({ length: 13 }, (_, i) => ({
    from: `wands-${String(i + 1).padStart(2, '0')}`,
    to: `wands-${String(i + 2).padStart(2, '0')}`,
    type: 'suit' as const,
    description: `Wands ${i + 1} → ${i + 2}: the fire's journey continues`,
  })),
  // Cups
  ...Array.from({ length: 13 }, (_, i) => ({
    from: `cups-${String(i + 1).padStart(2, '0')}`,
    to: `cups-${String(i + 2).padStart(2, '0')}`,
    type: 'suit' as const,
    description: `Cups ${i + 1} → ${i + 2}: the water flows onward`,
  })),
  // Swords
  ...Array.from({ length: 13 }, (_, i) => ({
    from: `swords-${String(i + 1).padStart(2, '0')}`,
    to: `swords-${String(i + 2).padStart(2, '0')}`,
    type: 'suit' as const,
    description: `Swords ${i + 1} → ${i + 2}: the mind cuts deeper`,
  })),
  // Pentacles
  ...Array.from({ length: 13 }, (_, i) => ({
    from: `pentacles-${String(i + 1).padStart(2, '0')}`,
    to: `pentacles-${String(i + 2).padStart(2, '0')}`,
    type: 'suit' as const,
    description: `Pentacles ${i + 1} → ${i + 2}: the earth builds further`,
  })),

  // ═══════════════════════════════════════
  // NUMERIC RESONANCE — Same number across suits
  // ═══════════════════════════════════════
  // Aces
  { from: 'wands-01', to: 'cups-01', type: 'numeric', description: 'Aces: creative fire meets emotional awakening' },
  { from: 'cups-01', to: 'swords-01', type: 'numeric', description: 'Aces: emotional opening meets mental clarity' },
  { from: 'swords-01', to: 'pentacles-01', type: 'numeric', description: 'Aces: mental breakthrough meets material opportunity' },
  { from: 'pentacles-01', to: 'wands-01', type: 'numeric', description: 'Aces: material seed feeds creative fire' },
  // Twos
  { from: 'wands-02', to: 'cups-02', type: 'numeric', description: 'Twos: planning meets partnership' },
  { from: 'cups-02', to: 'swords-02', type: 'numeric', description: 'Twos: connection meets indecision' },
  { from: 'swords-02', to: 'pentacles-02', type: 'numeric', description: 'Twos: indecision meets balance' },
  { from: 'pentacles-02', to: 'wands-02', type: 'numeric', description: 'Twos: juggling meets vision' },
  // Threes
  { from: 'wands-03', to: 'cups-03', type: 'numeric', description: 'Threes: expansion meets celebration' },
  { from: 'cups-03', to: 'swords-03', type: 'numeric', description: 'Threes: celebration meets heartbreak' },
  { from: 'swords-03', to: 'pentacles-03', type: 'numeric', description: 'Threes: heartbreak meets craftsmanship — pain creates art' },
  { from: 'pentacles-03', to: 'wands-03', type: 'numeric', description: 'Threes: teamwork fuels expansion' },
  // Fours
  { from: 'wands-04', to: 'cups-04', type: 'numeric', description: 'Fours: celebration meets contemplation' },
  { from: 'cups-04', to: 'swords-04', type: 'numeric', description: 'Fours: apathy meets rest — different forms of withdrawal' },
  { from: 'swords-04', to: 'pentacles-04', type: 'numeric', description: 'Fours: rest meets security — stability in all forms' },
  { from: 'pentacles-04', to: 'wands-04', type: 'numeric', description: 'Fours: hoarding meets celebration — what you hold vs. what you share' },
  // Fives
  { from: 'wands-05', to: 'cups-05', type: 'numeric', description: 'Fives: conflict meets grief — the many faces of struggle' },
  { from: 'cups-05', to: 'swords-05', type: 'numeric', description: 'Fives: grief meets defeat — emotional and mental suffering' },
  { from: 'swords-05', to: 'pentacles-05', type: 'numeric', description: 'Fives: defeat meets poverty — loss across all planes' },
  { from: 'pentacles-05', to: 'wands-05', type: 'numeric', description: 'Fives: hardship ignites competitive fire' },
  // Sixes
  { from: 'wands-06', to: 'cups-06', type: 'numeric', description: 'Sixes: victory meets nostalgia — different kinds of looking back' },
  { from: 'cups-06', to: 'swords-06', type: 'numeric', description: 'Sixes: innocence meets transition — leaving the past' },
  { from: 'swords-06', to: 'pentacles-06', type: 'numeric', description: 'Sixes: moving on meets generosity — giving and receiving' },
  { from: 'pentacles-06', to: 'wands-06', type: 'numeric', description: 'Sixes: charity meets triumph — rewards of generosity' },
  // Sevens
  { from: 'wands-07', to: 'cups-07', type: 'numeric', description: 'Sevens: standing ground meets fantasy — resolve vs. illusion' },
  { from: 'cups-07', to: 'swords-07', type: 'numeric', description: 'Sevens: fantasy meets deception — different veils' },
  { from: 'swords-07', to: 'pentacles-07', type: 'numeric', description: 'Sevens: stealth meets patience — strategic waiting' },
  { from: 'pentacles-07', to: 'wands-07', type: 'numeric', description: 'Sevens: assessment meets defense — evaluating what you\'ve built' },
  // Eights
  { from: 'wands-08', to: 'cups-08', type: 'numeric', description: 'Eights: swift movement meets walking away — different departures' },
  { from: 'cups-08', to: 'swords-08', type: 'numeric', description: 'Eights: leaving meets imprisonment — choosing to go vs. feeling trapped' },
  { from: 'swords-08', to: 'pentacles-08', type: 'numeric', description: 'Eights: restriction meets diligence — breaking free through work' },
  { from: 'pentacles-08', to: 'wands-08', type: 'numeric', description: 'Eights: mastery creates momentum' },
  // Nines
  { from: 'wands-09', to: 'cups-09', type: 'numeric', description: 'Nines: resilience meets satisfaction — persistence pays off' },
  { from: 'cups-09', to: 'swords-09', type: 'numeric', description: 'Nines: wishes fulfilled meets nightmares — light and shadow of desire' },
  { from: 'swords-09', to: 'pentacles-09', type: 'numeric', description: 'Nines: anxiety meets luxury — mental vs. material wealth' },
  { from: 'pentacles-09', to: 'wands-09', type: 'numeric', description: 'Nines: self-sufficiency through resilience' },
  // Tens
  { from: 'wands-10', to: 'cups-10', type: 'numeric', description: 'Tens: burden meets happiness — the weight and reward of completion' },
  { from: 'cups-10', to: 'swords-10', type: 'numeric', description: 'Tens: family joy meets rock bottom — extremes of fortune' },
  { from: 'swords-10', to: 'pentacles-10', type: 'numeric', description: 'Tens: painful ending meets legacy — death and inheritance' },
  { from: 'pentacles-10', to: 'wands-10', type: 'numeric', description: 'Tens: legacy carries its own burdens' },

  // ═══════════════════════════════════════
  // THEMATIC CONNECTIONS — Major to Minor
  // ═══════════════════════════════════════
  { from: 'major-00', to: 'wands-01', type: 'thematic', description: 'The Fool and Ace of Wands — both represent pure, unformed new energy' },
  { from: 'major-00', to: 'major-21', type: 'thematic', description: 'The Fool and The World — beginning and end of the great cycle' },
  { from: 'major-01', to: 'wands-01', type: 'thematic', description: 'The Magician channels the creative fire of the Ace of Wands' },
  { from: 'major-02', to: 'cups-01', type: 'thematic', description: 'The High Priestess resonates with the intuitive depth of Cups' },
  { from: 'major-03', to: 'pentacles-01', type: 'thematic', description: 'The Empress\'s abundance mirrors the material promise of Pentacles' },
  { from: 'major-04', to: 'pentacles-14', type: 'thematic', description: 'The Emperor and King of Pentacles — masters of the material world' },
  { from: 'major-05', to: 'pentacles-03', type: 'thematic', description: 'The Hierophant and Three of Pentacles — tradition and craftsmanship' },
  { from: 'major-06', to: 'cups-02', type: 'thematic', description: 'The Lovers and Two of Cups — sacred partnership' },
  { from: 'major-07', to: 'wands-06', type: 'thematic', description: 'The Chariot and Six of Wands — triumph and public victory' },
  { from: 'major-08', to: 'wands-09', type: 'thematic', description: 'Strength and Nine of Wands — courage and resilience' },
  { from: 'major-09', to: 'swords-04', type: 'thematic', description: 'The Hermit and Four of Swords — solitude and sacred rest' },
  { from: 'major-10', to: 'pentacles-10', type: 'thematic', description: 'Wheel of Fortune and Ten of Pentacles — cycles of fortune and legacy' },
  { from: 'major-11', to: 'swords-01', type: 'thematic', description: 'Justice and Ace of Swords — truth cuts clean' },
  { from: 'major-12', to: 'cups-08', type: 'thematic', description: 'The Hanged Man and Eight of Cups — letting go and walking away' },
  { from: 'major-13', to: 'swords-10', type: 'thematic', description: 'Death and Ten of Swords — transformation through painful endings' },
  { from: 'major-14', to: 'pentacles-02', type: 'thematic', description: 'Temperance and Two of Pentacles — the art of balance' },
  { from: 'major-15', to: 'swords-08', type: 'thematic', description: 'The Devil and Eight of Swords — bondage, real and imagined' },
  { from: 'major-16', to: 'swords-10', type: 'thematic', description: 'The Tower and Ten of Swords — sudden destruction and rock bottom' },
  { from: 'major-17', to: 'cups-01', type: 'thematic', description: 'The Star and Ace of Cups — hope pours from the emotional wellspring' },
  { from: 'major-18', to: 'cups-07', type: 'thematic', description: 'The Moon and Seven of Cups — illusion, dreams, and deception' },
  { from: 'major-19', to: 'wands-04', type: 'thematic', description: 'The Sun and Four of Wands — joy, celebration, and warmth' },
  { from: 'major-20', to: 'swords-06', type: 'thematic', description: 'Judgement and Six of Swords — rebirth and transition to new shores' },
  { from: 'major-21', to: 'pentacles-10', type: 'thematic', description: 'The World and Ten of Pentacles — completion and lasting legacy' },
];

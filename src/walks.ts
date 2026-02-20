export interface Walk {
  id: string;
  name: string;
  cardIds: string[];
}

export const walks: Walk[] = [
  {
    id: 'fools-journey',
    name: "The Fool's Journey",
    cardIds: Array.from({ length: 22 }, (_, i) => `major-${String(i).padStart(2, '0')}`),
  },
  {
    id: 'cups',
    name: 'The Suit of Cups',
    cardIds: Array.from({ length: 14 }, (_, i) => `cups-${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'wands',
    name: 'The Suit of Wands',
    cardIds: Array.from({ length: 14 }, (_, i) => `wands-${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'swords',
    name: 'The Suit of Swords',
    cardIds: Array.from({ length: 14 }, (_, i) => `swords-${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'pentacles',
    name: 'The Suit of Pentacles',
    cardIds: Array.from({ length: 14 }, (_, i) => `pentacles-${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'threes',
    name: 'The Threes',
    cardIds: ['wands-03', 'cups-03', 'swords-03', 'pentacles-03'],
  },
];

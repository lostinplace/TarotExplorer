import type { Suit } from '../types';

export function suitSymbol(suit: Suit | null): string {
  switch (suit) {
    case 'wands': return '🪄';
    case 'cups': return '🏆';
    case 'swords': return '⚔️';
    case 'pentacles': return '⭐';
    default: return '✨';
  }
}

export function suitLabel(suit: Suit | null): string {
  switch (suit) {
    case 'wands': return 'Wands';
    case 'cups': return 'Cups';
    case 'swords': return 'Swords';
    case 'pentacles': return 'Pentacles';
    default: return 'Major Arcana';
  }
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

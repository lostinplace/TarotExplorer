import type { Card as FSRSCard } from 'ts-fsrs';

export type Arcana = 'major' | 'minor';
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type Orientation = 'upright' | 'reversed' | 'both';
export type TrainingMode = 'name-to-meaning' | 'meaning-to-card';

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  suit: Suit | null;
  rank: number;
  uprightKeywords: string[];
  uprightDescription: string;
  reversedKeywords: string[];
  reversedDescription: string;
}

export interface CardState {
  cardId: string;
  mode: TrainingMode;
  orientation: 'upright' | 'reversed';
  fsrsCard: FSRSCard;
  log: unknown[];
}

export interface ReviewSession {
  reviewed: number;
  due: number;
}

export interface Settings {
  trainingMode: TrainingMode;
  orientation: Orientation;
  filterArcana: 'all' | 'major' | 'minor';
  filterSuits: Suit[];
  newCardsPerSession: number;
}

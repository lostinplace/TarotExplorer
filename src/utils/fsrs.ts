import { fsrs, createEmptyCard, generatorParameters, type Card as FSRSCard, Rating, type Grade } from 'ts-fsrs';
import type { CardState, TrainingMode } from '../types';

const params = generatorParameters();
const f = fsrs(params);

export { Rating };
export type { Grade };

const STORAGE_KEY = 'sr-tarot-fsrs-state';

function loadAllStates(): Record<string, CardState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllStates(states: Record<string, CardState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

function stateKey(cardId: string, mode: TrainingMode, orientation: 'upright' | 'reversed'): string {
  return `${cardId}:${mode}:${orientation}`;
}

export function getCardState(cardId: string, mode: TrainingMode, orientation: 'upright' | 'reversed'): CardState {
  const states = loadAllStates();
  const key = stateKey(cardId, mode, orientation);
  if (states[key]) return states[key];
  return {
    cardId,
    mode,
    orientation,
    fsrsCard: createEmptyCard() as unknown as FSRSCard,
    log: [],
  };
}

export function reviewCard(cardId: string, mode: TrainingMode, orientation: 'upright' | 'reversed', grade: Grade): CardState {
  const states = loadAllStates();
  const key = stateKey(cardId, mode, orientation);
  const current = states[key] || {
    cardId, mode, orientation,
    fsrsCard: createEmptyCard() as unknown as FSRSCard,
    log: [],
  };

  const now = new Date();
  const scheduling = f.repeat(current.fsrsCard as FSRSCard, now);
  const result = scheduling[grade];

  const updated: CardState = {
    ...current,
    fsrsCard: result.card as unknown as FSRSCard,
    log: [...current.log, result.log],
  };

  states[key] = updated;
  saveAllStates(states);
  return updated;
}

export function isDue(state: CardState): boolean {
  const card = state.fsrsCard as FSRSCard;
  if (!card.due) return true;
  return new Date(card.due) <= new Date();
}

export function isNew(state: CardState): boolean {
  const card = state.fsrsCard as FSRSCard;
  return card.reps === 0;
}

export function getAllStates(): Record<string, CardState> {
  return loadAllStates();
}

export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

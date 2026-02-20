export type { ViewState } from './types';
import type { ViewState } from './types';

const STORAGE_KEY = 'tarot-explorer-state';

const defaultState: ViewState = {
  lastPosition: [1800, 1200],
  zoom: 0,
};

export function loadState(): ViewState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaultState };
}

export function saveState(state: ViewState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): ViewState {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState };
}

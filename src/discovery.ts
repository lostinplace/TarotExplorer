export type { DiscoveryState } from './types';
import type { DiscoveryState } from './types';

const STORAGE_KEY = 'tarot-explorer-state';

const defaultState: DiscoveryState = {
  discovered: [],
  visitedEdges: [],
  lastPosition: [1800, 1200],
  zoom: 0,
};

export function loadState(): DiscoveryState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaultState };
}

export function saveState(state: DiscoveryState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function isDiscovered(state: DiscoveryState, cardId: string): boolean {
  return state.discovered.includes(cardId);
}

export function discoverCard(state: DiscoveryState, cardId: string): DiscoveryState {
  if (state.discovered.includes(cardId)) return state;
  const next = { ...state, discovered: [...state.discovered, cardId] };
  saveState(next);
  return next;
}

export function discoverEdge(state: DiscoveryState, from: string, to: string): DiscoveryState {
  const key = `${from}|${to}`;
  const keyRev = `${to}|${from}`;
  if (state.visitedEdges.includes(key) || state.visitedEdges.includes(keyRev)) return state;
  const next = { ...state, visitedEdges: [...state.visitedEdges, key] };
  saveState(next);
  return next;
}

export function resetState(): DiscoveryState {
  localStorage.removeItem(STORAGE_KEY);
  return { ...defaultState };
}

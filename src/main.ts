import './style.css';
import L from 'leaflet';
import { createMap } from './map';
import { cards } from './data/cards';
import { edges } from './data/edges';
import { createLandmarks, updateLandmark, LandmarkEntry } from './landmarks';
import { createPaths, updatePaths, highlightPath, clearHighlight, PathEntry } from './paths';
import { renderDetail, bindConnectionClicks } from './detail';
import { loadState, discoverCard, DiscoveryState } from './discovery';
import { walks } from './walks';
import { TarotCard } from './types';

// Fix Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// State
let state: DiscoveryState = loadState();
const cardMap = new Map<string, TarotCard>(cards.map(c => [c.id, c]));

// Init map
const map = createMap('map');

// Set initial view
map.setView(
  [state.lastPosition[1], state.lastPosition[0]],
  state.zoom || -1,
);

// Create landmarks & paths
let landmarkEntries: LandmarkEntry[] = createLandmarks(map, cards, state, onCardSelect);
let pathEntries: PathEntry[] = createPaths(map, edges, cardMap, state);

// UI elements
const counterEl = document.getElementById('counter-num')!;
const detailPanel = document.getElementById('detail-panel')!;
const detailContent = document.getElementById('detail-content')!;
const detailClose = document.getElementById('detail-close')!;
const walkSelect = document.getElementById('walk-select') as HTMLSelectElement;

updateCounter();

// Detail panel close
detailClose.addEventListener('click', closeDetail);
map.on('click', closeDetail);

// Save position on move
map.on('moveend', () => {
  const center = map.getCenter();
  state.lastPosition = [center.lng, center.lat];
  state.zoom = map.getZoom();
});

// Walk selector
walkSelect.addEventListener('change', () => {
  const walkId = walkSelect.value;
  if (!walkId) {
    clearHighlight(pathEntries, state);
    return;
  }
  const walk = walks.find(w => w.id === walkId);
  if (!walk) return;

  clearHighlight(pathEntries, state);
  highlightPath(pathEntries, walk.cardIds);

  // Pan to first card in walk
  const firstCard = cardMap.get(walk.cardIds[0]);
  if (firstCard) {
    map.flyTo([firstCard.position[1], firstCard.position[0]], -0.5, { duration: 1 });
  }
});

function onCardSelect(card: TarotCard) {
  // Discover the card
  const wasDiscovered = state.discovered.includes(card.id);
  state = discoverCard(state, card.id);

  if (!wasDiscovered) {
    // Update the landmark
    const entry = landmarkEntries.find(e => e.card.id === card.id);
    if (entry) updateLandmark(entry, true);
    // Update paths
    updatePaths(pathEntries, state);
    updateCounter();
  }

  // Show detail panel
  const html = renderDetail(card, edges, cardMap, state, navigateToCard);
  detailContent.innerHTML = html;
  bindConnectionClicks(detailContent, navigateToCard);
  detailPanel.classList.add('open');
}

function navigateToCard(cardId: string) {
  const card = cardMap.get(cardId);
  if (!card) return;
  map.flyTo([card.position[1], card.position[0]], 0, { duration: 0.8 });
  onCardSelect(card);
}

function closeDetail() {
  detailPanel.classList.remove('open');
}

function updateCounter() {
  counterEl.textContent = String(state.discovered.length);
}

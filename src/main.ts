import './style.css';
import L from 'leaflet';
import { createMap, configureMapBounds } from './map';
import { cards } from './data/cards';
import { edges } from './data/edges';
import { createLandmarks, updateLandmark, LandmarkEntry } from './landmarks';
import { createPaths, updatePaths, highlightPath, clearHighlight, PathEntry, EdgeRenderState } from './paths';
import { renderDetail, bindConnectionClicks } from './detail';
import { loadState, saveState } from './state';
import type { ViewState } from './types';
import { walks } from './data/walks';
import { renderWalkStep } from './walkPanel';
import { TarotCard, MapData, WalkData } from './types';
import { maps } from './data/maps';

// Fix Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// State
let viewState: ViewState = loadState();
const cardMap = new Map<string, TarotCard>(cards.map(c => [c.id, c]));

// Edge Render State
let edgeRenderState: EdgeRenderState = {
  activeLinkTypes: new Set(['journey', 'suit', 'numeric', 'thematic']),
  selectedCardId: null
};

// Map State
let currentMap: MapData = maps.find(m => m.id === 'fools-journey') || maps[0];

// Init map
const map = createMap('map');

// Create map regions and structural paths
const mapDecorationsLayer = L.layerGroup().addTo(map);

function renderMapDecorations() {
  mapDecorationsLayer.clearLayers();
  
  // Render region labels
  if (currentMap.regions) {
    currentMap.regions.forEach(region => {
      if (!region.center) return;

      const html = `<div class="region-label">${region.name}</div>`;
      const icon = L.divIcon({
        className: 'region-label-wrapper',
        html,
        iconSize: [0, 0], // Center exactly on coordinates
        iconAnchor: [0, 0],
      });

      L.marker([region.center[1], region.center[0]], { 
        icon,
        interactive: false,
        zIndexOffset: -1000 // Keep behind cards and paths
      }).addTo(mapDecorationsLayer);
    });
  }

  // Render structural paths
  if (currentMap.paths) {
    currentMap.paths.forEach(p => {
      // Basic structural lines... a full implementation could resolve region centers vs card positions,
      // but for V1 we just need to avoid crashing. 
    });
  }
}

function loadActiveMap() {
  renderMapDecorations();

  // Clear existing markers/paths
  if (landmarkEntries) {
    landmarkEntries.forEach(e => e.marker.remove());
  }
  if (pathEntries) {
    pathEntries.forEach(e => e.line.remove());
  }

  // Re-create landmarks & paths strictly for this map
  landmarkEntries = createLandmarks(map, cards, currentMap, onCardSelect);
  pathEntries = createPaths(map, edges, cardMap, currentMap, edgeRenderState);

  // Set bounds or view
  configureMapBounds(map, currentMap);
  map.setView([currentMap.canvas.height / 2, currentMap.canvas.width / 2], -1);
}

let landmarkEntries: LandmarkEntry[] = [];
let pathEntries: PathEntry[] = [];

// UI elements
const detailPanel = document.getElementById('detail-panel')!;
const detailContent = document.getElementById('detail-content')!;
const detailClose = document.getElementById('detail-close')!;
const walkSelect = document.getElementById('walk-select') as HTMLSelectElement;
const mapSelect = document.getElementById('map-select') as HTMLSelectElement;
const walkPanel = document.getElementById('walk-panel')!;
const walkClose = document.getElementById('walk-close')!;
const walkPrev = document.getElementById('walk-prev') as HTMLButtonElement;
const walkNext = document.getElementById('walk-next') as HTMLButtonElement;
const linkLegend = document.getElementById('link-legend')!;

let activeWalkState: { walk: WalkData | null; stepIndex: number } = { walk: null, stepIndex: 0 };

// Populate map select
maps.forEach(m => {
  const option = document.createElement('option');
  option.value = m.id;
  option.textContent = `\uD83C\uDF0F ${m.name}`; // 🌏
  if (m.id === currentMap.id) option.selected = true;
  mapSelect.appendChild(option);
});

// Populate walk select
walks.forEach(w => {
  const option = document.createElement('option');
  option.value = w.id;
  option.textContent = `\uD83E\uDDED ${w.name}`; // 🧭
  walkSelect.appendChild(option);
});

// Initial boot
loadActiveMap();

// Map Selection
mapSelect.addEventListener('change', () => {
  const m = maps.find(m => m.id === mapSelect.value);
  if (m) {
    currentMap = m;
    loadActiveMap();
  }
});

// Link Legend Toggles
document.querySelectorAll('#link-legend input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      edgeRenderState.activeLinkTypes.add(target.value);
    } else {
      edgeRenderState.activeLinkTypes.delete(target.value);
    }
    updatePaths(pathEntries, edgeRenderState);
  });
});

// Detail panel close
detailClose.addEventListener('click', closeDetail);
map.on('click', closeDetail);

// Save position on move
map.on('moveend', () => {
  const center = map.getCenter();
  viewState.lastPosition = [center.lng, center.lat];
  viewState.zoom = map.getZoom();
  saveState(viewState);
});

// Walk selector
walkSelect.addEventListener('change', () => {
  const walkId = walkSelect.value;
  if (!walkId) {
    closeWalkPanel();
    return;
  }
  const walk = walks.find(w => w.id === walkId);
  if (!walk) return;

  activeWalkState = { walk, stepIndex: 0 };
  openWalkPanel();
});

function openWalkPanel() {
  if (!activeWalkState.walk) return;
  walkPanel.dataset.open = 'true';
  linkLegend.dataset.walkOpen = 'true';
  updateWalkStep();
}

function closeWalkPanel() {
  walkPanel.dataset.open = 'false';
  linkLegend.dataset.walkOpen = 'false';
  activeWalkState.walk = null;
  clearHighlight(pathEntries, edgeRenderState);
  walkSelect.value = '';
}

function updateWalkStep() {
  const { walk, stepIndex } = activeWalkState;
  if (!walk || !walk.steps[stepIndex]) return;

  renderWalkStep(walk, stepIndex);
  
  const step = walk.steps[stepIndex];
  const activeCards = step.cards || [step.card];
  
  clearHighlight(pathEntries, edgeRenderState);
  highlightPath(pathEntries, activeCards);
  
  // Pan map to first active card
  const firstCard = cardMap.get(activeCards[0]);
  if (firstCard) {
    const pos = currentMap.cards[firstCard.id];
    if (pos) {
      map.flyTo([pos[1], pos[0]], -0.5, { duration: 1 });
    }
    // Also trigger the standard card selection UI for the right side panel
    onCardSelect(firstCard);
  }
}

walkClose.addEventListener('click', closeWalkPanel);

walkPrev.addEventListener('click', () => {
  if (activeWalkState.stepIndex > 0) {
    activeWalkState.stepIndex--;
    updateWalkStep();
  }
});

walkNext.addEventListener('click', () => {
  if (activeWalkState.walk && activeWalkState.stepIndex < activeWalkState.walk.steps.length - 1) {
    activeWalkState.stepIndex++;
    updateWalkStep();
  }
});

function onCardSelect(card: TarotCard) {
  // Update rendering state to show full starburst of connected paths
  edgeRenderState.selectedCardId = card.id;
  updatePaths(pathEntries, edgeRenderState);

  // Show detail panel
  const html = renderDetail(card, edges, cardMap, navigateToCard);
  detailContent.innerHTML = html;
  bindConnectionClicks(detailContent, navigateToCard);
  detailPanel.dataset.open = 'true';
}

function navigateToCard(cardId: string) {
  const card = cardMap.get(cardId);
  if (!card) return;
  const pos = currentMap.cards[card.id];
  if (pos) {
    map.flyTo([pos[1], pos[0]], 0, { duration: 0.8 });
  }
  onCardSelect(card);
}

function closeDetail() {
  detailPanel.dataset.open = 'false';
  edgeRenderState.selectedCardId = null;
  updatePaths(pathEntries, edgeRenderState);
}

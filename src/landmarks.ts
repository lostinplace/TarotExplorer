import L from 'leaflet';
import { TarotCard, MapData } from './types';

export interface LandmarkEntry {
  card: TarotCard;
  marker: L.Marker;
}

export function createLandmarks(
  map: L.Map,
  cards: TarotCard[],
  mapData: MapData,
  onSelect: (card: TarotCard) => void,
): LandmarkEntry[] {
  const entries: LandmarkEntry[] = [];
  
  for (const card of cards) {
    const position = mapData.cards[card.id];
    if (!position) continue;

    const suitClass = card.suit ? `suit-${card.suit}` : 'suit-major';
    const stateClass = 'discovered';

    const html = `
      <div class="card-landmark ${stateClass} ${suitClass}">
        <span>${card.symbol}</span>
        <div class="card-label">${card.name}</div>
      </div>
    `;

    const icon = L.divIcon({
      className: 'card-landmark-wrapper',
      html,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker([position[1], position[0]], { icon }).addTo(map);

    marker.on('click', () => onSelect(card));

    entries.push({ card, marker });
  }

  return entries;
}

export function updateLandmark(entry: LandmarkEntry): void {
  const card = entry.card;
  const suitClass = card.suit ? `suit-${card.suit}` : 'suit-major';
  const stateClass = 'discovered';

  const html = `
    <div class="card-landmark ${stateClass} ${suitClass}">
      <span>${card.symbol}</span>
      <div class="card-label">${card.name}</div>
    </div>
  `;

  const icon = L.divIcon({
    className: 'card-landmark-wrapper',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  entry.marker.setIcon(icon);
}

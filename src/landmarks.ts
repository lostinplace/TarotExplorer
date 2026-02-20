import L from 'leaflet';
import { TarotCard } from './types';
import { DiscoveryState, isDiscovered } from './discovery';

export interface LandmarkEntry {
  card: TarotCard;
  marker: L.Marker;
}

export function createLandmarks(
  map: L.Map,
  cards: TarotCard[],
  state: DiscoveryState,
  onSelect: (card: TarotCard) => void,
): LandmarkEntry[] {
  return cards.map(card => {
    const discovered = isDiscovered(state, card.id);
    const suitClass = card.suit ? `suit-${card.suit}` : 'suit-major';
    const stateClass = discovered ? 'discovered' : 'undiscovered';

    const html = `
      <div class="card-landmark ${stateClass} ${discovered ? suitClass : ''}">
        <span>${card.symbol}</span>
        ${discovered ? `<div class="card-label">${card.name}</div>` : ''}
      </div>
    `;

    const icon = L.divIcon({
      className: 'card-landmark-wrapper',
      html,
      iconSize: discovered ? [40, 40] : [28, 28],
      iconAnchor: discovered ? [20, 20] : [14, 14],
    });

    // Leaflet uses [lat, lng] which maps to [y, x] in CRS.Simple
    const marker = L.marker([card.position[1], card.position[0]], { icon }).addTo(map);

    marker.on('click', () => onSelect(card));

    return { card, marker };
  });
}

export function updateLandmark(entry: LandmarkEntry, discovered: boolean): void {
  const card = entry.card;
  const suitClass = card.suit ? `suit-${card.suit}` : 'suit-major';
  const stateClass = discovered ? 'discovered' : 'undiscovered';

  const html = `
    <div class="card-landmark ${stateClass} ${discovered ? suitClass : ''}">
      <span>${card.symbol}</span>
      ${discovered ? `<div class="card-label">${card.name}</div>` : ''}
    </div>
  `;

  const icon = L.divIcon({
    className: 'card-landmark-wrapper',
    html,
    iconSize: discovered ? [40, 40] : [28, 28],
    iconAnchor: discovered ? [20, 20] : [14, 14],
  });

  entry.marker.setIcon(icon);
}

import L from 'leaflet';
import { TarotCard, CardEdge } from './types';
import { DiscoveryState, isDiscovered } from './discovery';

export interface PathEntry {
  edge: CardEdge;
  line: L.Polyline;
}

const COLORS: Record<string, string> = {
  journey: '#ffd764',
  suit: '#888',
  numeric: '#666',
  thematic: '#a0522d',
};

const DASH: Record<string, string> = {
  journey: '',
  suit: '',
  numeric: '8 6',
  thematic: '4 8',
};

export function createPaths(
  map: L.Map,
  edges: CardEdge[],
  cardMap: Map<string, TarotCard>,
  state: DiscoveryState,
): PathEntry[] {
  return edges.map(edge => {
    const fromCard = cardMap.get(edge.from);
    const toCard = cardMap.get(edge.to);
    if (!fromCard || !toCard) {
      const line = L.polyline([], {}).addTo(map);
      return { edge, line };
    }

    const visible = isDiscovered(state, edge.from) && isDiscovered(state, edge.to);

    // Suit-specific colors for suit progression edges
    let color = COLORS[edge.type] || '#666';
    if (edge.type === 'suit' && fromCard.suit) {
      const suitColors: Record<string, string> = {
        wands: '#ff8c32',
        cups: '#50b4dc',
        swords: '#b4c8dc',
        pentacles: '#78b450',
      };
      color = suitColors[fromCard.suit] || color;
    }

    const line = L.polyline(
      [
        [fromCard.position[1], fromCard.position[0]],
        [toCard.position[1], toCard.position[0]],
      ],
      {
        color,
        weight: edge.type === 'journey' ? 3 : 1.5,
        opacity: visible ? (edge.type === 'journey' ? 0.6 : 0.3) : 0,
        dashArray: DASH[edge.type] || '',
        interactive: false,
      },
    ).addTo(map);

    return { edge, line };
  });
}

export function updatePaths(paths: PathEntry[], state: DiscoveryState): void {
  paths.forEach(p => {
    const visible = isDiscovered(state, p.edge.from) && isDiscovered(state, p.edge.to);
    p.line.setStyle({
      opacity: visible ? (p.edge.type === 'journey' ? 0.6 : 0.3) : 0,
    });
  });
}

export function highlightPath(paths: PathEntry[], cardIds: string[]): void {
  const idSet = new Set(cardIds);
  paths.forEach(p => {
    if (idSet.has(p.edge.from) && idSet.has(p.edge.to)) {
      p.line.setStyle({ opacity: 0.8, weight: 3 });
      p.line.bringToFront();
    }
  });
}

export function clearHighlight(paths: PathEntry[], state: DiscoveryState): void {
  updatePaths(paths, state);
}

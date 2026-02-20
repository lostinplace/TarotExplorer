import L from 'leaflet';
import { TarotCard, CardEdge, MapData } from './types';

export interface PathEntry {
  edge: CardEdge;
  line: L.Polyline;
}

export interface EdgeRenderState {
  activeLinkTypes: Set<string>;
  selectedCardId: string | null;
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
  mapData: MapData,
  renderState: EdgeRenderState,
): PathEntry[] {
  const entries: PathEntry[] = [];
  
  for (const edge of edges) {
    const fromCard = cardMap.get(edge.from);
    const toCard = cardMap.get(edge.to);
    const fromPos = mapData.cards[edge.from];
    const toPos = mapData.cards[edge.to];
    
    // Only draw paths if both endpoints are in the current map
    if (!fromCard || !toCard || !fromPos || !toPos) {
      continue;
    }

    // We show the path if it's connected to a selected card OR 
    // its type is active in the legend
    const isSelected = renderState.selectedCardId === edge.from || renderState.selectedCardId === edge.to;
    const isTypeActive = renderState.activeLinkTypes.has(edge.type);

    const visible = isSelected || isTypeActive;

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
        [fromPos[1], fromPos[0]],
        [toPos[1], toPos[0]],
      ],
      {
        color,
        weight: isSelected ? 3 : (edge.type === 'journey' ? 3 : 1.5),
        opacity: visible ? (isSelected ? 0.8 : (edge.type === 'journey' ? 0.6 : 0.4)) : 0,
        dashArray: DASH[edge.type] || '',
        interactive: false,
      },
    ).addTo(map);

    if (isSelected) line.bringToFront();

    entries.push({ edge, line });
  }

  return entries;
}

export function updatePaths(paths: PathEntry[], renderState: EdgeRenderState): void {
  paths.forEach(p => {
    const isSelected = renderState.selectedCardId === p.edge.from || renderState.selectedCardId === p.edge.to;
    const isTypeActive = renderState.activeLinkTypes.has(p.edge.type);

    const visible = isSelected || isTypeActive;

    p.line.setStyle({
      opacity: visible ? (isSelected ? 0.8 : (p.edge.type === 'journey' ? 0.6 : 0.4)) : 0,
      weight: isSelected ? 3 : (p.edge.type === 'journey' ? 3 : 1.5)
    });
    
    if (isSelected) p.line.bringToFront();
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

export function clearHighlight(paths: PathEntry[], renderState: EdgeRenderState): void {
  updatePaths(paths, renderState);
}

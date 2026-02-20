export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles' | null;
  rank: number;
  position: [number, number];
  image: string;
  symbol: string;
  uprightKeywords: string[];
  uprightDescription: string;
  reversedKeywords: string[];
  reversedDescription: string;
}

export interface CardEdge {
  from: string;
  to: string;
  type: 'suit' | 'numeric' | 'thematic' | 'journey';
  description: string;
}

export interface DiscoveryState {
  discovered: string[];
  visitedEdges: string[];
  lastPosition: [number, number];
  zoom: number;
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles' | null;
  rank: number;
  
  image: string;
  symbol: string;

  upright: {
    keywords: string[];
    meaning: string;
  };

  reversed: {
    keywords: string[];
    meaning: string;
  };

  personality?: {
    summary: string;
    elemental_dignity: string;
    as_a_person: string;
    as_an_energy: string;
    shadow: string;
  };

  imagery: {
    element: string;
    significance: string;
    tradition: string;
  }[];

  correspondences: {
    element: string | null;
    planet: string | null;
    zodiac: string | null;
    hebrew_letter: string | null;
    tree_of_life: string | null;
    numerology: string | null;
    colors: string[];
  };

  connections: {
    card: string;
    relationship: string;
    description: string;
  }[];

  themes: string[];
  questions: string[];

  references: {
    title: string;
    author: string;
    relevance: string;
    section: string | null;
  }[];
}

export interface CardEdge {
  from: string;
  to: string;
  type: 'suit' | 'numeric' | 'thematic' | 'journey';
  description: string;
}

export interface ViewState {
  lastPosition: [number, number];
  zoom: number;
}

export interface MapRegion {
  id: string;
  name: string;
  description: string;
  center?: [number, number];
  radius?: number;
  bounds?: [[number, number], [number, number]];
}

export interface MapPath {
  from: string;
  to: string;
  label: string | null;
  style: string | null;
}

export interface MapData {
  id: string;
  name: string;
  description: string;
  canvas: {
    width: number;
    height: number;
  };
  regions?: MapRegion[];
  paths?: MapPath[];
  cards: Record<string, [number, number]>;
}

export interface WalkConnection {
  walk: string;
  relationship: string;
  description: string;
}

export interface WalkStep {
  id: string;
  card: string;
  cards: string[] | null;
  title: string | null;
  narrative: string;
  transition: string | null;
  reflection: string | null;
  aside: string | null;
}

export interface WalkAct {
  id: string;
  name: string;
  description: string;
  steps: string[];
}

export interface WalkData {
  id: string;
  name: string;
  description: string;
  author: string | null;
  tradition: string | null;
  acts?: WalkAct[];
  steps: WalkStep[];
  connections?: WalkConnection[];
}


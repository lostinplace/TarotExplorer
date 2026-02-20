import { MapData } from '../types';

const yamlFiles = import.meta.glob('./maps/*.yaml', { eager: true, import: 'default' });

export const maps: MapData[] = Object.values(yamlFiles) as MapData[];

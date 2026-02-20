import { WalkData } from '../types';

const yamlFiles = import.meta.glob('./walks/*.yaml', { eager: true, import: 'default' });

export const walks: WalkData[] = Object.values(yamlFiles) as WalkData[];

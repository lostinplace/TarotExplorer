import { TarotCard } from '../types';

const yamlFiles = import.meta.glob('./cards/*.yaml', { eager: true, import: 'default' });

export const cards: TarotCard[] = Object.values(yamlFiles) as TarotCard[];

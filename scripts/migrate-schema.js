import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'yaml';

const dataDir = path.join(process.cwd(), 'src', 'data', 'cards');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.yaml'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const oldCard = parse(content);

  // Skip if already converted (check for upright object)
  if (oldCard.upright && typeof oldCard.upright === 'object') {
    continue;
  }

  const newCard = {
    id: oldCard.id,
    name: oldCard.name,
    arcana: oldCard.arcana,
    suit: oldCard.suit,
    rank: oldCard.rank,
    position: oldCard.position,
    image: oldCard.image,
    symbol: oldCard.symbol,
    
    upright: {
      keywords: oldCard.uprightKeywords || [],
      meaning: oldCard.uprightDescription || '',
    },
    
    reversed: {
      keywords: oldCard.reversedKeywords || [],
      meaning: oldCard.reversedDescription || '',
    },

    imagery: [],
    
    correspondences: {
      element: null,
      planet: null,
      zodiac: null,
      hebrew_letter: null,
      tree_of_life: null,
      numerology: null,
      colors: []
    },

    connections: [],
    themes: [],
    questions: [],
    references: []
  };

  fs.writeFileSync(filePath, stringify(newCard), 'utf-8');
  console.log(`Migrated ${file} to new schema.`);
}

console.log('Migration complete!');

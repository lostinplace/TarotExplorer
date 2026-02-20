import fs from 'fs';
import path from 'path';
import { stringify } from 'yaml';
import { cards } from '../src/data/cards.js';

const dataDir = path.join(process.cwd(), 'src', 'data', 'cards');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

for (const card of cards) {
  const filePath = path.join(dataDir, `${card.id}.yaml`);
  const yamlContent = stringify(card);
  fs.writeFileSync(filePath, yamlContent, 'utf-8');
  console.log(`Wrote ${card.id}.yaml`);
}

console.log('Conversion complete!');

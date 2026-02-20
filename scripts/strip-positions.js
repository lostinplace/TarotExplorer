import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'yaml';

const dataDir = path.join(process.cwd(), 'src', 'data', 'cards');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.yaml'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const card = parse(content);

  if ('position' in card) {
    delete card.position;
    fs.writeFileSync(filePath, stringify(card), 'utf-8');
    console.log(`Stripped position from ${file}`);
  }
}

console.log('Finished stripping positions.');

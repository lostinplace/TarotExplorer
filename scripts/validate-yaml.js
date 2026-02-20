import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.yaml')) {
      const full = path.join(dir, f);
      try {
        parse(fs.readFileSync(full, 'utf8'));
      } catch (e) {
        console.error(`ERROR IN ${full}: ${e.message}`);
      }
    }
  }
}

checkDir(path.join(process.cwd(), 'src', 'data', 'cards'));
checkDir(path.join(process.cwd(), 'src', 'data', 'maps'));

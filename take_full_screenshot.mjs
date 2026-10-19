import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/full-page-entire.png');

console.log('Capturing full webpage from top to footer...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,7600 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 20000 });
  if (fs.existsSync(outScreenshot)) {
    console.log('Full page captured, size:', fs.statSync(outScreenshot).size);
  }
} catch (err) {
  console.error('Error:', err);
}

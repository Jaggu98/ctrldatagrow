import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/bottom-half.png');

console.log('Capturing bottom half of webpage...');
// We can use a script that scrolls to #insights and takes a screenshot or window-size=1280,8200
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,8400 --screenshot="${outScreenshot}" http://localhost:3000/#insights`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 20000 });
  if (fs.existsSync(outScreenshot)) {
    console.log('Bottom half captured, size:', fs.statSync(outScreenshot).size);
  }
} catch (err) {
  console.error('Error:', err);
}

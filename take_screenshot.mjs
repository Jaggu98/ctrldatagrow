import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/full-page.png');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

console.log('Running Chrome to capture screenshot...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,3800 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 15000 });
  console.log('Finished exec. Checking if file exists...');
  if (fs.existsSync(outScreenshot)) {
    console.log('Screenshot successfully created at:', outScreenshot, 'Size:', fs.statSync(outScreenshot).size);
  } else {
    console.log('Screenshot not found at:', outScreenshot);
  }
} catch (err) {
  console.error('Error during Chrome screenshot:', err);
}

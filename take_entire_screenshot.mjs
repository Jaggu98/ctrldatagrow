import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/preview-entire-document.png');

console.log('Capturing entire document height...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,14000 --virtual-time-budget=6000 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 45000 });
  console.log('Capture finished successfully!');
} catch (err) {
  console.error('Error:', err);
}

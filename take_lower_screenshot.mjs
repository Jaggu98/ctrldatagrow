import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/preview-lower-half.png');

console.log('Capturing lower half sections...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,4500 --virtual-time-budget=6000 --screenshot="${outScreenshot}" http://localhost:3000/#resources`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 35000 });
  console.log('Done!');
} catch (err) {
  console.error('Error:', err);
}

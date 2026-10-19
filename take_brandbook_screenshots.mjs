import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/preview-brandbook.png');

console.log('Capturing brandbook sections with virtual-time-budget...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,3600 --virtual-time-budget=5000 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 35000 });
  console.log('Capture finished successfully!');
} catch (err) {
  console.error('Error:', err);
}

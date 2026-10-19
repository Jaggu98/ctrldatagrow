import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outScreenshot = path.resolve('./public/preview-ambassador-100zoom.png');

console.log('Capturing Ambassador Modal at 100% desktop zoom (1280x820)...');
const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1280,820 --virtual-time-budget=4000 --screenshot="${outScreenshot}" http://localhost:3000/`;

try {
  execSync(cmd, { stdio: 'inherit', timeout: 35000 });
  console.log('Captured modal successfully!');
} catch (err) {
  console.error('Error:', err);
}

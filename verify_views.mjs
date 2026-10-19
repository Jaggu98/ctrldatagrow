import { execSync } from 'child_process';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');

const viewports = [
  { name: 'tablet', width: 768, height: 2600 },
  { name: 'mobile', width: 390, height: 2600 },
];

for (const vp of viewports) {
  const outScreenshot = path.resolve(`./public/preview-${vp.name}.png`);
  console.log(`Capturing ${vp.name} view (${vp.width}x${vp.height})...`);
  const cmd = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=${vp.width},${vp.height} --screenshot="${outScreenshot}" http://localhost:3000/`;
  try {
    execSync(cmd, { stdio: 'inherit', timeout: 25000 });
  } catch (err) {
    console.error(`Error capturing ${vp.name}:`, err);
  }
}

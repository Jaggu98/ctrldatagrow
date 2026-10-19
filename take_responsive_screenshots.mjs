import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('./temp-chrome');
const outMobile = path.resolve('./public/mobile-preview.png');
const outTablet = path.resolve('./public/tablet-preview.png');

console.log('Capturing mobile view (390x2400)...');
execSync(`"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=390,2600 --screenshot="${outMobile}" http://localhost:3000/`, { stdio: 'inherit' });

console.log('Capturing tablet view (768x2400)...');
execSync(`"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=768,2600 --screenshot="${outTablet}" http://localhost:3000/`, { stdio: 'inherit' });

console.log('Mobile & tablet screenshots captured.');

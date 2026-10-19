import fs from 'fs';

console.log('founder-jagadeesh.png:', fs.existsSync('./public/images/founder-jagadeesh.png'), fs.statSync('./public/images/founder-jagadeesh.png').size);
console.log('hero-auditorium.png:', fs.existsSync('./public/images/hero-auditorium.png'), fs.statSync('./public/images/hero-auditorium.png').size);

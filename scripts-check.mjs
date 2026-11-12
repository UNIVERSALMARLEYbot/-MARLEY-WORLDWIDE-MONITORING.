import {readdir,readFile} from 'node:fs/promises';
const files=await readdir('api');for(const f of files.filter(x=>x.endsWith('.js'))){await import(`./api/${f}`)}
const pkg=JSON.parse(await readFile('package.json','utf8'));if(!pkg.scripts.build)throw Error('Build script missing');console.log('API modules imported; package validated.');

// Junta interface, motor, missões, fontes e ilustração num único arquivo HTML que funciona sem internet.
// Uso: node src/build.js  (gera versoes/v0.2/jogo/index.html e copia para jogo/index.html)
const fs = require('fs'), path = require('path');
const ler = f => fs.readFileSync(path.join(__dirname, f), 'utf8');
const iife = code => '(function(){\n' + code + '\n})();';
let html = ler('app.html');
const troca = (marca, txt) => { if (!html.includes(marca)) throw new Error('marca ausente: ' + marca); html = html.split(marca).join(txt); };
troca('/*FONTS*/', ler('fonts.css'));
troca('<!--SKYLINE-->', ler('skyline.html'));
troca('/*ENGINE*/', iife(ler('engine.js')));
troca('/*MISSOES*/', iife(ler('missoes.js')));
const raiz = path.join(__dirname, '..');
for (const destino of ['versoes/v0.2/jogo', 'jogo']) {
  fs.mkdirSync(path.join(raiz, destino), { recursive: true });
  fs.writeFileSync(path.join(raiz, destino, 'index.html'), html);
}
console.log('Gerado: ' + (html.length / 1024).toFixed(0) + ' KB em versoes/v0.2/jogo/ e jogo/');

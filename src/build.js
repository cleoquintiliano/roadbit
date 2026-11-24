// Junta interface, motor, missões, fontes e ilustração num único arquivo HTML que funciona sem internet.
// Uso: node src/build.js [versão]
// Sem versão, usa a versão "atual" de versoes.json. Gera versoes/v<versão>/jogo/index.html e copia para jogo/index.html.
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const versao = process.argv[2] || JSON.parse(fs.readFileSync(path.join(raiz, 'versoes.json'), 'utf8')).atual;
if (!/^\d+\.\d+(\.\d+)?$/.test(versao)) throw new Error('versão inválida: ' + versao);
const ler = f => fs.readFileSync(path.join(__dirname, f), 'utf8');
const iife = code => '(function(){\n' + code + '\n})();';
let html = ler('app.html');
const troca = (marca, txt) => { if (!html.includes(marca)) throw new Error('marca ausente: ' + marca); html = html.split(marca).join(txt); };
troca('/*FONTS*/', ler('fonts.css'));
troca('<!--SKYLINE-->', ler('skyline.html'));
troca('/*ENGINE*/', iife(ler('engine.js')));
troca('/*MISSOES*/', iife(ler('missoes.js')));
troca('/*VERSAO*/', versao);
const pasta = 'versoes/v' + versao + '/jogo';
for (const destino of [pasta, 'jogo']) {
  fs.mkdirSync(path.join(raiz, destino), { recursive: true });
  fs.writeFileSync(path.join(raiz, destino, 'index.html'), html);
}
console.log('Gerado: ' + (html.length / 1024).toFixed(0) + ' KB em ' + pasta + '/ e jogo/');

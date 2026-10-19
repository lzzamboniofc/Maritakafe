// Gera as ilustrações provisórias em SVG (src/ilustracoes).
// Elas ocupam os espaços das fotos reais até que o café envie as próprias imagens.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'src', 'ilustracoes');
mkdirSync(destino, { recursive: true });

const cor = {
  mata: '#1E3B2C',
  sombra: '#132A1F',
  musgo: '#2F5A3F',
  folha: '#4F7F3E',
  maritaca: '#7DB443',
  broto: '#B7D36B',
  luz: '#EFF2E6',
  sol: '#E9E3B0',
  bico: '#C9412F',
  bicoEscuro: '#9E2E22',
  grao: '#2B1E16',
  cafe: '#5A3A26',
  madeira: '#8A5A36',
  madeiraClara: '#B07A4C',
  papel: '#FBFAF4',
  chocolate: '#3B2216',
  creme: '#F3E7C9',
  laranja: '#E8962E',
  vidro: '#DCE8DA',
};

function sementes(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const textura = (id = 'grao', intensidade = 0.16) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="ruido"/>
    <feColorMatrix in="ruido" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${intensidade} 0" result="pontos"/>
    <feComposite in="pontos" in2="SourceGraphic" operator="in" result="grao"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="grao"/></feMerge>
  </filter>`;

function folha(x, y, tamanho, angulo, preenchimento, nervura = null) {
  const t = tamanho;
  const corpo = `<path d="M0 0 C ${t * 0.35} ${-t * 0.32}, ${t * 0.8} ${-t * 0.28}, ${t} 0 C ${t * 0.8} ${t * 0.28}, ${t * 0.35} ${t * 0.32}, 0 0 Z" fill="${preenchimento}"/>`;
  const linha = nervura ? `<path d="M${t * 0.05} 0 L ${t * 0.9} 0" stroke="${nervura}" stroke-width="${Math.max(1, t * 0.025)}" fill="none" stroke-linecap="round"/>` : '';
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angulo.toFixed(1)})">${corpo}${linha}</g>`;
}

function copa(rand, cx, cy, raio, quantidade, paleta, tamanhoBase) {
  let svg = '';
  for (let i = 0; i < quantidade; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * raio;
    const x = cx + Math.cos(a) * r * 1.35;
    const y = cy + Math.sin(a) * r * 0.75;
    const tamanho = tamanhoBase * (0.7 + rand() * 0.6);
    const cores = paleta[Math.floor(rand() * paleta.length)];
    svg += folha(x, y, tamanho, rand() * 360, cores);
  }
  return svg;
}

function bambu(x, topo, base, largura, corCaule, corNo, rand) {
  let svg = `<rect x="${x}" y="${topo}" width="${largura}" height="${base - topo}" fill="${corCaule}"/>`;
  let y = topo + 40 + rand() * 60;
  while (y < base - 20) {
    svg += `<rect x="${x - 2}" y="${y.toFixed(1)}" width="${largura + 4}" height="${Math.max(3, largura * 0.16)}" rx="2" fill="${corNo}"/>`;
    if (rand() > 0.55) {
      const lado = rand() > 0.5 ? 1 : -1;
      const fx = lado > 0 ? x + largura : x;
      svg += folha(fx, y, 60 + rand() * 50, lado > 0 ? -20 - rand() * 30 : 200 + rand() * 30, corNo);
    }
    y += 90 + rand() * 90;
  }
  return svg;
}

function xadrez(id, celula, corA, fundo = cor.papel) {
  return `
  <pattern id="${id}" width="${celula * 2}" height="${celula * 2}" patternUnits="userSpaceOnUse">
    <rect width="${celula * 2}" height="${celula * 2}" fill="${fundo}"/>
    <rect width="${celula}" height="${celula * 2}" fill="${corA}" opacity="0.55"/>
    <rect width="${celula * 2}" height="${celula}" fill="${corA}" opacity="0.55"/>
  </pattern>`;
}

function maritaca(x, y, escala = 1, espelhar = false) {
  const flip = espelhar ? -1 : 1;
  return `
  <g transform="translate(${x} ${y}) scale(${escala * flip} ${escala})">
    <path d="M-10 60 C -30 140, -40 210, -70 300 L -52 302 C -20 220, 0 150, 18 70 Z" fill="${cor.folha}"/>
    <path d="M-4 66 C -14 150, -18 220, -30 296 L -18 298 C -4 220, 6 150, 14 72 Z" fill="${cor.musgo}" opacity="0.7"/>
    <ellipse cx="0" cy="20" rx="58" ry="78" fill="${cor.maritaca}"/>
    <path d="M-40 -10 C -70 30, -60 90, -18 110 C -40 70, -40 30, -22 -6 Z" fill="${cor.folha}"/>
    <path d="M-52 20 C -66 50, -58 82, -36 100" stroke="${cor.musgo}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="-58" r="44" fill="${cor.maritaca}"/>
    <path d="M44 -74 C 74 -76, 82 -46, 66 -26 C 62 -38, 54 -44, 44 -44 Z" fill="${cor.creme}"/>
    <path d="M58 -40 C 62 -32, 62 -26, 66 -26 C 60 -24, 52 -30, 50 -38 Z" fill="${cor.grao}" opacity="0.5"/>
    <circle cx="26" cy="-66" r="13" fill="${cor.papel}"/>
    <circle cx="28" cy="-66" r="6.5" fill="${cor.grao}"/>
    <circle cx="30" cy="-68" r="2" fill="${cor.papel}"/>
    <path d="M-20 92 L -26 112 M 6 96 L 4 116" stroke="${cor.cafe}" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function xicara(x, y, escala = 1, vapor = true) {
  return `
  <g transform="translate(${x} ${y}) scale(${escala})">
    <ellipse cx="0" cy="40" rx="120" ry="30" fill="${cor.papel}"/>
    <ellipse cx="0" cy="38" rx="96" ry="20" fill="${cor.luz}"/>
    <path d="M-70 -40 L 70 -40 C 70 10, 50 36, 0 36 C -50 36, -70 10, -70 -40 Z" fill="${cor.papel}"/>
    <path d="M70 -24 C 106 -24, 106 16, 62 12" stroke="${cor.papel}" stroke-width="14" fill="none"/>
    <ellipse cx="0" cy="-40" rx="70" ry="16" fill="${cor.cafe}"/>
    <ellipse cx="-8" cy="-42" rx="34" ry="7" fill="${cor.madeiraClara}" opacity="0.7"/>
    ${vapor ? `<path d="M-20 -70 C -40 -100, 0 -120, -20 -160 M 18 -66 C 0 -96, 40 -118, 18 -150" stroke="${cor.papel}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.55"/>` : ''}
  </g>`;
}

function svg(largura, altura, defs, corpo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}">
  <defs>${textura()}${defs}</defs>
  <g filter="url(#grao)">${corpo}</g>
</svg>`;
}

const cenas = {};

cenas.jardim = (() => {
  const rand = sementes(11);
  const L = 1800, A = 1200;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.mata}"/>`;
  corpo += `<ellipse cx="1180" cy="260" rx="520" ry="300" fill="${cor.sol}" opacity="0.16"/>`;
  corpo += `<ellipse cx="1320" cy="200" rx="260" ry="160" fill="${cor.sol}" opacity="0.18"/>`;
  for (let i = 0; i < 9; i++) {
    const x = 980 + i * 95 + rand() * 30;
    corpo += bambu(x, -20, 900, 22 + rand() * 10, i % 2 ? cor.musgo : cor.folha, cor.mata, rand);
  }
  corpo += `<path d="M150 1200 C 170 900, 120 600, 210 0 L 330 0 C 260 600, 320 900, 300 1200 Z" fill="${cor.sombra}"/>`;
  corpo += `<path d="M610 1200 C 640 950, 560 640, 680 320 C 700 260, 760 200, 820 0 L 880 0 C 820 220, 760 300, 744 360 C 660 640, 740 950, 720 1200 Z" fill="${cor.sombra}" opacity="0.85"/>`;
  corpo += `<path d="M240 420 C 380 380, 520 300, 700 300" stroke="${cor.sombra}" stroke-width="26" fill="none" stroke-linecap="round"/>`;
  corpo += copa(rand, 320, 120, 340, 260, [cor.musgo, cor.folha, cor.sombra, cor.musgo], 80);
  corpo += copa(rand, 900, 70, 300, 200, [cor.folha, cor.maritaca, cor.musgo], 70);
  corpo += copa(rand, 1500, 60, 340, 220, [cor.musgo, cor.folha, cor.broto], 64);
  corpo += maritaca(560, 220, 0.62, true);
  corpo += `<rect x="0" y="930" width="${L}" height="270" fill="${cor.sombra}" opacity="0.6"/>`;
  corpo += `<path d="M960 820 L 1700 820 L 1780 1000 L 880 1000 Z" fill="url(#toalha)"/>`;
  corpo += `<path d="M880 1000 L 1780 1000 L 1780 1040 L 880 1040 Z" fill="${cor.bicoEscuro}" opacity="0.5"/>`;
  corpo += `<rect x="930" y="1040" width="34" height="160" fill="${cor.madeira}"/><rect x="1700" y="1040" width="34" height="160" fill="${cor.madeira}"/>`;
  corpo += xicara(1180, 860, 0.9);
  corpo += `<ellipse cx="1470" cy="900" rx="120" ry="30" fill="${cor.papel}"/><path d="M1380 880 C 1400 840, 1540 840, 1560 880 C 1520 900, 1420 900, 1380 880 Z" fill="${cor.chocolate}"/><circle cx="1470" cy="848" r="38" fill="${cor.creme}"/>`;
  corpo += copa(rand, 120, 1120, 160, 70, [cor.folha, cor.musgo, cor.sombra], 70);
  return svg(L, A, xadrez('toalha', 26, cor.bico), corpo);
})();

cenas.mesa = (() => {
  const L = 1200, A = 1500;
  let corpo = `<rect width="${L}" height="${A}" fill="url(#toalha)"/>`;
  corpo += `<rect x="0" y="0" width="${L}" height="${A}" fill="${cor.mata}" opacity="0.06"/>`;
  corpo += `<g transform="translate(420 560)"><circle r="230" fill="${cor.papel}"/><circle r="186" fill="${cor.luz}"/><circle r="150" fill="${cor.papel}"/><circle r="120" fill="${cor.cafe}"/><circle r="120" fill="none" stroke="${cor.madeiraClara}" stroke-width="10" opacity="0.6"/><ellipse cx="-30" cy="-30" rx="50" ry="22" fill="${cor.madeiraClara}" opacity="0.5" transform="rotate(-25)"/><path d="M140 60 C 230 70, 240 160, 150 150" stroke="${cor.papel}" stroke-width="30" fill="none"/></g>`;
  corpo += `<g transform="translate(860 1020) rotate(-18)"><ellipse rx="250" ry="200" fill="${cor.papel}"/>
    <path d="M-170 20 C -150 -90, 150 -110, 180 10 C 120 60, -110 70, -170 20 Z" fill="${cor.laranja}"/>
    <path d="M-120 0 C -100 -60, -40 -80, -20 -40 M -20 -40 C 10 -90, 70 -80, 80 -30 M 80 -30 C 110 -60, 150 -30, 140 0" stroke="${cor.madeira}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M-160 22 C -100 50, 110 50, 176 14" stroke="${cor.madeira}" stroke-width="8" fill="none" opacity="0.6"/></g>`;
  corpo += `<g transform="translate(900 380)"><circle r="120" fill="${cor.vidro}" opacity="0.9"/><circle r="100" fill="${cor.laranja}"/><circle r="100" fill="none" stroke="${cor.papel}" stroke-width="10" opacity="0.6"/><circle cx="-30" cy="-30" r="22" fill="${cor.papel}" opacity="0.35"/></g>`;
  corpo += `<g transform="translate(300 1180) rotate(30)"><rect x="-14" y="-220" width="28" height="440" rx="14" fill="${cor.cafe}"/><rect x="-10" y="-220" width="6" height="440" fill="${cor.madeiraClara}" opacity="0.6"/></g>`;
  corpo += `<g transform="translate(180 260)">${folha(0, 0, 160, 20, cor.folha, cor.broto)}${folha(10, 10, 130, 80, cor.musgo, cor.folha)}${folha(0, 0, 120, -40, cor.maritaca, cor.folha)}</g>`;
  return svg(L, A, xadrez('toalha', 60, cor.bico), corpo);
})();

cenas.chocotaka = (() => {
  const L = 1200, A = 1200;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.musgo}"/>`;
  corpo += `<rect y="760" width="${L}" height="440" fill="${cor.madeira}"/>`;
  for (let i = 0; i < 6; i++) corpo += `<path d="M0 ${800 + i * 70} C 400 ${780 + i * 70}, 800 ${830 + i * 70}, 1200 ${800 + i * 70}" stroke="${cor.cafe}" stroke-width="4" fill="none" opacity="0.5"/>`;
  corpo += `<ellipse cx="600" cy="860" rx="420" ry="90" fill="${cor.sombra}" opacity="0.35"/>`;
  corpo += `<path d="M200 720 C 220 900, 980 900, 1000 720 Z" fill="${cor.papel}"/><ellipse cx="600" cy="720" rx="400" ry="70" fill="${cor.luz}"/>`;
  corpo += `<path d="M370 720 L 420 560 L 800 560 L 830 720 Z" fill="${cor.chocolate}"/><path d="M420 560 L 800 560 L 770 520 L 450 520 Z" fill="#4A2C1C"/>`;
  corpo += `<circle cx="610" cy="470" r="120" fill="${cor.creme}"/><path d="M500 510 C 530 560, 700 570, 730 500" fill="${cor.creme}"/>`;
  corpo += `<path d="M480 430 C 520 380, 700 370, 740 440 C 760 480, 720 470, 724 520 C 700 500, 690 560, 664 520 C 640 590, 610 520, 590 560 C 560 500, 540 560, 520 500 C 500 540, 470 500, 480 430 Z" fill="${cor.chocolate}"/>`;
  corpo += `<path d="M420 640 C 410 700, 440 720, 430 770 M 790 620 C 800 680, 780 700, 790 760" stroke="${cor.chocolate}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  corpo += `<ellipse cx="560" cy="420" rx="40" ry="12" fill="${cor.madeiraClara}" opacity="0.5" transform="rotate(-15 560 420)"/>`;
  corpo += `<g transform="translate(980 300)">${folha(0, 0, 200, 150, cor.folha, cor.musgo)}${folha(0, 0, 170, 200, cor.maritaca, cor.folha)}</g>`;
  return svg(L, A, '', corpo);
})();

cenas.sucos = (() => {
  const L = 1200, A = 1200;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.luz}"/>`;
  corpo += `<rect y="820" width="${L}" height="380" fill="url(#toalha)"/>`;
  const copos = [
    { x: 300, suco: cor.laranja, fruta: cor.laranja },
    { x: 600, suco: cor.maritaca, fruta: cor.broto },
    { x: 900, suco: cor.bico, fruta: '#E46A5A' },
  ];
  for (const c of copos) {
    corpo += `<g transform="translate(${c.x} 0)">
      <ellipse cx="0" cy="860" rx="130" ry="26" fill="${cor.mata}" opacity="0.18"/>
      <path d="M-110 300 L 110 300 L 90 850 L -90 850 Z" fill="${cor.vidro}" opacity="0.85"/>
      <path d="M-102 380 L 102 380 L 90 840 L -90 840 Z" fill="${c.suco}"/>
      <path d="M-80 400 L -64 820" stroke="${cor.papel}" stroke-width="12" opacity="0.45" stroke-linecap="round"/>
      <rect x="20" y="140" width="18" height="460" rx="9" fill="${cor.papel}" transform="rotate(8 29 370)"/>
      <circle cx="-60" cy="300" r="70" fill="${c.fruta}"/><circle cx="-60" cy="300" r="52" fill="${cor.papel}" opacity="0.45"/>
      <path d="M-60 250 L -60 350 M -110 300 L -10 300 M -95 265 L -25 335 M -95 335 L -25 265" stroke="${c.fruta}" stroke-width="5"/>
    </g>`;
  }
  corpo += folha(600, 250, 120, -60, cor.folha, cor.broto) + folha(610, 250, 100, -110, cor.musgo, cor.folha);
  return svg(L, A, xadrez('toalha', 40, cor.maritaca), corpo);
})();

cenas.maritaca = (() => {
  const rand = sementes(5);
  const L = 1200, A = 1500;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.mata}"/>`;
  corpo += `<ellipse cx="760" cy="420" rx="420" ry="380" fill="${cor.sol}" opacity="0.12"/>`;
  corpo += copa(rand, 300, 300, 300, 160, [cor.musgo, cor.folha, cor.sombra], 90);
  corpo += copa(rand, 980, 1200, 260, 120, [cor.musgo, cor.folha, cor.sombra], 90);
  corpo += `<path d="M-20 900 C 300 860, 700 920, 1220 820" stroke="${cor.cafe}" stroke-width="44" fill="none" stroke-linecap="round"/>`;
  corpo += `<path d="M700 900 C 820 860, 900 760, 960 700" stroke="${cor.cafe}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  corpo += folha(960, 700, 160, -40, cor.folha, cor.broto) + folha(960, 700, 140, 10, cor.maritaca, cor.folha);
  corpo += maritaca(560, 700, 1.9);
  return svg(L, A, '', corpo);
})();

cenas.bambus = (() => {
  const rand = sementes(23);
  const L = 1600, A = 1100;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.musgo}"/>`;
  corpo += `<ellipse cx="830" cy="420" rx="360" ry="260" fill="${cor.sol}" opacity="0.14"/>`;
  for (let i = 0; i < 16; i++) {
    const lado = i < 8 ? 0 : 1;
    const x = lado ? 900 + (i - 8) * 90 + rand() * 30 : 40 + i * 85 + rand() * 30;
    const perto = lado ? (i - 8) / 8 : 1 - i / 8;
    const largura = 18 + perto * 30;
    corpo += bambu(x, -20, 1120, largura, perto > 0.5 ? cor.mata : cor.folha, perto > 0.5 ? cor.sombra : cor.musgo, rand);
  }
  corpo += `<rect y="1000" width="${L}" height="100" fill="${cor.sombra}" opacity="0.4"/>`;
  return svg(L, A, '', corpo);
})();

cenas.paes = (() => {
  const rand = sementes(3);
  const L = 1200, A = 1200;
  let corpo = `<rect width="${L}" height="${A}" fill="${cor.bico}"/>`;
  corpo += `<rect width="${L}" height="${A}" fill="url(#toalha)" opacity="0.9"/>`;
  corpo += `<ellipse cx="600" cy="640" rx="430" ry="360" fill="${cor.madeira}"/><ellipse cx="600" cy="620" rx="380" ry="310" fill="${cor.madeiraClara}"/>`;
  for (let i = 0; i < 10; i++) corpo += `<path d="M${260 + i * 70} 340 C ${250 + i * 70} 600, ${250 + i * 70} 700, ${270 + i * 70} 920" stroke="${cor.madeira}" stroke-width="6" fill="none" opacity="0.5"/>`;
  corpo += `<rect x="300" y="420" width="600" height="420" rx="40" fill="${cor.papel}" transform="rotate(-6 600 630)"/>`;
  const posicoes = [[460, 520], [620, 500], [760, 560], [520, 680], [690, 690], [600, 820], [430, 800], [800, 760]];
  for (const [x, y] of posicoes) {
    const r = 70 + rand() * 14;
    corpo += `<circle cx="${x}" cy="${y}" r="${r}" fill="#E3B567"/><circle cx="${x - r * 0.25}" cy="${y - r * 0.25}" r="${r * 0.55}" fill="#F0CC86"/><circle cx="${x + r * 0.2}" cy="${y + r * 0.1}" r="${r * 0.12}" fill="#C98F3E"/>`;
  }
  return svg(L, A, xadrez('toalha', 50, cor.papel, cor.bico), corpo);
})();

for (const [nome, conteudo] of Object.entries(cenas)) {
  writeFileSync(join(destino, `${nome}.svg`), conteudo);
}
console.log(`Ilustrações geradas: ${Object.keys(cenas).join(', ')}`);

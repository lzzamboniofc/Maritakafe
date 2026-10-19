import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as config from './config.mjs';
import { esc, demonstracao, marca } from './partials/util.mjs';
import * as s from './partials/secoes.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (caminho) => readFileSync(join(raiz, caminho), 'utf8');
const gravar = (caminho, conteudo) => {
  mkdirSync(dirname(join(raiz, caminho)), { recursive: true });
  writeFileSync(join(raiz, caminho), conteudo);
};

const minificarCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

const versao = Date.now().toString(36);

const css = minificarCss(['src/styles/base.css', 'src/styles/secoes.css'].map(ler).join('\n'));
gravar('assets/css/site.css', css);
gravar('assets/js/site.js', ler('src/scripts/site.js'));

const secoes = [
  { id: 'casa', rotulo: 'A casa', html: s.casa() },
  { id: 'cardapio', rotulo: 'Cardápio', html: s.cardapio() },
  { id: 'eventos', rotulo: 'Eventos', html: s.eventos() },
  { id: 'sospeso', rotulo: 'Café sospeso', html: s.sospeso() },
  { id: 'fotos', rotulo: 'Fotos', html: s.fotos() },
  { id: 'avaliacoes', rotulo: 'Avaliações', html: s.avaliacoes() },
  { id: 'duvidas', rotulo: 'Dúvidas', html: s.duvidas() },
  { id: 'visite', rotulo: 'Visite', html: s.visite() },
];
const ativas = secoes.filter((x) => x.html);
const navegacao = ativas.filter((x) => !['casa', 'avaliacoes', 'duvidas'].includes(x.id));

function dadosEstruturados() {
  const { contato, negocio, horarios } = config;
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: negocio.nome.valor,
    description: negocio.bio,
    url: config.site.url,
    image: config.site.url + config.site.imagemCompartilhamento,
    logo: config.site.url + negocio.logotipo.arquivo,
    sameAs: [contato.instagram.url, contato.linktree.url],
    address: {
      '@type': 'PostalAddress',
      streetAddress: contato.endereco.rua,
      addressLocality: negocio.cidade,
      addressRegion: negocio.estado,
      addressCountry: 'BR',
      ...(contato.bairroCep.confirmado ? { postalCode: contato.bairroCep.cep } : {}),
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contato.mapa.busca)}`,
  };
  if (contato.whatsapp.confirmado) dados.telephone = `+${contato.whatsapp.valor}`;
  if (horarios.confirmado && horarios.especificacao) dados.openingHoursSpecification = horarios.especificacao;
  const eventos = config.eventos.filter((e) => e.confirmado && e.data >= new Date().toISOString().slice(0, 10));
  const grafo = [dados, ...eventos.map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${e.titulo}${e.detalhe ? ` (${e.detalhe.toLowerCase()})` : ''} na ${negocio.nome.valor}`,
    startDate: e.data,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: negocio.nome.valor, address: dados.address },
    url: e.link,
  }))];
  return JSON.stringify(grafo.length === 1 ? dados : grafo).replaceAll('<', '\\u003c');
}

function cabeca({ titulo, descricao, canonica, indexar = true }) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
${indexar && !demonstracao ? '' : '<meta name="robots" content="noindex">'}
<link rel="canonical" href="${canonica}">
<meta name="theme-color" content="#E9DFCB">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="MaritaKafé">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${canonica}">
<meta property="og:image" content="${config.site.url}${config.site.imagemCompartilhamento}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preload" href="assets/fonts/lora-latin.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="assets/css/site.css?v=${versao}">`;
}

const index = `<!doctype html>
<html lang="pt-BR">
<head>
${cabeca({ titulo: config.site.titulo, descricao: config.site.descricao, canonica: config.site.url })}
<link rel="preload" as="image" href="${config.imagens.tosta.arquivo}">
<script type="application/ld+json">${dadosEstruturados()}</script>
</head>
<body class="${demonstracao ? 'modo-demo' : 'modo-publico'}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${s.cabecalho(navegacao)}
<main id="conteudo">
${s.abertura()}
${ativas.map((x) => x.html).join('\n')}
</main>
${s.rodape(navegacao)}
${s.botaoFlutuante()}
${s.avisoModo()}
<script src="assets/js/site.js?v=${versao}" defer></script>
</body>
</html>
`;
gravar('index.html', index);

function paginaSimples({ arquivo, titulo, descricao, conteudo, indexar = true }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
${cabeca({ titulo, descricao, canonica: config.site.url + arquivo, indexar })}
</head>
<body class="pagina-simples">
<header class="topo topo--solido"><div class="topo__barra"><a class="topo__marca" href="./">${marca}<span>MaritaKafé</span></a></div></header>
<main class="texto-corrido">${conteudo}</main>
</body>
</html>
`;
}

gravar(
  '404.html',
  `<!doctype html>
<html lang="pt-BR">
<head>
<script>(function(){var p=location.pathname.split('/')[1];var b=location.hostname.endsWith('github.io')&&p?'/'+p+'/':'/';var e=document.createElement('base');e.href=b;document.head.appendChild(e);})();</script>
${cabeca({ titulo: 'Página não encontrada | MaritaKafé', descricao: 'Este endereço não existe no site da MaritaKafé.', canonica: config.site.url + '404.html', indexar: false })}

</head>
<body class="pagina-erro">
<main class="erro">
  <img src="assets/img/ave.webp" width="148" height="148" alt="Desenho da maritaca do logotipo da MaritaKafé.">
  <div>
    <h1>A maritaca voou com essa página</h1>
    <p>O endereço que você abriu não existe aqui. O cardápio, os eventos e o caminho até a casa estão na página inicial.</p>
    <a class="botao botao--principal" href="./">Voltar para o início</a>
  </div>
</main>
</body>
</html>
`
);

gravar(
  'politica-de-privacidade.html',
  paginaSimples({
    arquivo: 'politica-de-privacidade.html',
    titulo: 'Política de privacidade | MaritaKafé',
    descricao: 'Como o site da MaritaKafé trata dados de quem visita.',
    conteudo: `<h1>Política de privacidade</h1>
<p>Este site é uma página de apresentação da MaritaKafé. Ele não tem formulários, não pede cadastro e não usa cookies de publicidade ou de análise.</p>
<h2>O que acontece quando você usa o site</h2>
<p>A hospedagem (GitHub Pages) registra dados técnicos de acesso, como endereço IP e navegador, para segurança e funcionamento do serviço. A MaritaKafé não recebe nem guarda esses dados.</p>
<p>O mapa do Google só é carregado se você clicar em “Mostrar mapa”. A partir daí, o Google pode usar cookies próprios, conforme a política de privacidade dele.</p>
<p>Os botões de WhatsApp e Instagram abrem esses aplicativos. A conversa segue as regras de privacidade de cada um, e as mensagens que você enviar chegam à casa.</p>
<h2>Seus direitos</h2>
<p>Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir informações sobre dados seus que a casa tenha recebido por mensagem e pedir que sejam apagados. Faça o pedido pelo mesmo canal em que conversou com a casa.</p>
<p class="texto-corrido__data">Atualizada em outubro de 2026.</p>
<p><a class="botao botao--principal" href="./">Voltar para o início</a></p>`,
  })
);

gravar(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${config.site.url}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>${config.site.url}politica-de-privacidade.html</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
</urlset>
`
);
gravar('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${config.site.url}sitemap.xml\n`);
gravar('.nojekyll', '');

console.log(`Site gerado em modo ${config.modo}. Seções: ${ativas.map((x) => x.id).join(', ')}.`);

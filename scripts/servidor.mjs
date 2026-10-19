// Servidor local simples para conferir o site em http://localhost:4173
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(fileURLToPath(new URL('..', import.meta.url)));
const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain' };
const porta = Number(process.env.PORT) || 4173;

createServer(async (req, res) => {
  const caminho = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const arquivo = join(raiz, caminho.endsWith('/') ? caminho + 'index.html' : caminho);
  try {
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { 'content-type': tipos[extname(arquivo)] || 'application/octet-stream' });
    res.end(conteudo);
  } catch {
    res.writeHead(404, { 'content-type': tipos['.html'] });
    res.end(await readFile(join(raiz, '404.html')));
  }
}).listen(porta, () => console.log(`Site em http://localhost:${porta}`));

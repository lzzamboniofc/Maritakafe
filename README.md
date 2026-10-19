# MaritaKafé — site

Site da MaritaKafé, cafeteria em Itu (SP). HTML estático gerado com Node.js, sem dependências, publicado pelo GitHub Pages a partir da branch `main`, pasta raiz.

## Como editar

1. Todo o conteúdo fica em `src/config.mjs`: contato, horários, cardápio, textos, perguntas, imagens e avaliações.
2. Marque `confirmado: true` em cada item validado com o café.
3. Rode `npm run build` para gerar `index.html`, `404.html`, `politica-de-privacidade.html`, CSS, JS, `sitemap.xml` e `robots.txt` na raiz.
4. Rode `npm run pendencias` para ver o que ainda falta confirmar ou trocar.
5. `npm run dev` abre o site em `http://localhost:4173`.

Requer Node.js 18 ou mais recente. Não há pacotes para instalar.

## Modo demonstração e modo público

Em `src/config.mjs`, `modo` aceita:

- `'demonstracao'`: mostra itens não confirmados com o selo “A confirmar”. A página leva `noindex`.
- `'publico'`: esconde tudo o que não foi confirmado e as seções sem conteúdo real.

Eventos com data (`eventos` no config) somem sozinhos depois do dia, tanto no build quanto no navegador.

O menu se ajusta às seções que ficaram visíveis.

## Trocar as fotos

As fotos atuais são recortes do print do Instagram, em baixa resolução. Para trocar:

1. Exporte a foto original em WebP (1200 px de largura é suficiente) e salve em `assets/img/`.
2. Em `imagens`, no `src/config.mjs`, ajuste `arquivo`, `largura`, `altura`, `alt` e `fonte`.
3. Para mostrar a galeria “Do nosso Instagram”, coloque as chaves das novas fotos em `galeria`.

Fotos de banco de imagem precisam de licença comercial, ficam com `provisoria: true` e devem ser registradas em `CREDITOS-IMAGENS.md`.

## Estrutura

```
src/config.mjs          conteúdo e chaves de confirmação
src/build.mjs           gera as páginas na raiz
src/partials/           componentes (seções) e utilidades
src/styles/             CSS (cores em variáveis no topo de base.css)
src/scripts/site.js     menu, galeria ampliada, eventos vencidos, mapa sob demanda
scripts/pendencias.mjs  lista do que falta confirmar
assets/                 arquivos publicados (css, js, fontes, imagens)
```

## Publicação

GitHub → Settings → Pages → Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`. Os caminhos são relativos, então o site funciona em `usuario.github.io/Maritakafe/`. Se o endereço mudar (domínio próprio), atualize `site.url` em `src/config.mjs` e rode o build.

## Fontes

Lora (SIL Open Font License 1.1), servida localmente em `assets/fonts/`.

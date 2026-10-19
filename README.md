# Maritakafé — site

Site do Maritakafé (Joaquim Egídio, Campinas – SP). HTML estático gerado com Node.js, sem dependências, publicado pelo GitHub Pages a partir da branch `main`, pasta raiz.

## Como editar

1. Todo o conteúdo fica em `src/config.mjs`: contato, horários, cardápio, textos, perguntas, imagens e avaliações.
2. Marque `confirmado: true` em cada item validado com o café.
3. Rode `npm run build` para gerar `index.html`, `404.html`, `politica-de-privacidade.html`, CSS, JS, `sitemap.xml` e `robots.txt` na raiz.
4. Rode `npm run pendencias` para ver o que ainda falta confirmar ou trocar.
5. `npm run dev` abre o site em `http://localhost:4173`.

Requer Node.js 18 ou mais recente. Não há pacotes para instalar.

## Modo demonstração e modo público

Em `src/config.mjs`, `modo` aceita:

- `'demonstracao'`: mostra itens não confirmados com o selo “A confirmar” e as ilustrações provisórias (inclusive na galeria, com o selo “Imagem ilustrativa”). A página leva `noindex`.
- `'publico'`: esconde tudo o que não foi confirmado e as seções sem conteúdo real. A galeria só aparece com fotos reais. Se o WhatsApp não estiver confirmado, os botões passam a abrir o Direct do Instagram.

O menu se ajusta às seções que ficaram visíveis.

## Trocar as imagens provisórias

As imagens atuais são ilustrações feitas para o projeto (fontes em `src/ilustracoes`, geradas por `npm run ilustracoes`). Para trocar por fotos reais:

1. Exporte a foto em WebP nas larguras listadas em `larguras` (ex.: `jardim-720.webp`, `jardim-1200.webp`, `jardim-2400.webp`) e salve em `assets/img/`. Pode ser outro nome; basta ajustar `arquivo`.
2. Ajuste `proporcao` se o enquadramento for diferente.
3. Marque `provisoria: false`, preencha `alt` e `fonte`.
4. Para a galeria, adicione objetos ao array `galeria`.

Fotos de banco de imagem precisam de licença comercial e devem ser registradas em `CREDITOS-IMAGENS.md`.

## Estrutura

```
src/config.mjs          conteúdo e chaves de confirmação
src/build.mjs           gera as páginas na raiz
src/partials/           componentes (seções) e utilidades
src/styles/             CSS (cores em variáveis no topo de base.css)
src/scripts/site.js     menu, galeria ampliada, mapa sob demanda
scripts/pendencias.mjs  lista do que falta confirmar
assets/                 arquivos publicados (css, js, fontes, imagens)
```

## Publicação

GitHub → Settings → Pages → Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`. Os caminhos são relativos, então o site funciona em `usuario.github.io/Maritakafe/`. Se o endereço mudar (domínio próprio), atualize `site.url` em `src/config.mjs` e rode o build.

## Fontes

Lora (SIL Open Font License 1.1), servida localmente em `assets/fonts/`.

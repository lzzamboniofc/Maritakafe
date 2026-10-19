import * as config from '../config.mjs';
import { esc, visivel, selo, imagem, linkCanal, linkRota, linkMapa, icone, marca, demonstracao } from './util.mjs';

const canal = linkCanal();

function botaoCanal(classe = 'botao botao--principal') {
  return `<a class="${classe}" href="${canal.href}" target="_blank" rel="noopener">${icone[canal.tipo]}<span>${canal.rotulo}</span></a>`;
}

export function cabecalho(navegacao) {
  const links = navegacao.map((n) => `<li><a href="#${n.id}">${n.rotulo}</a></li>`).join('');
  return `<header class="topo" data-topo>
  <div class="topo__barra">
    <a class="topo__marca" href="#inicio" aria-label="Café Maritaka, voltar ao início">${marca}<span>Café Maritaka</span></a>
    <nav class="topo__nav" id="menu" aria-label="Seções do site">
      <ul>${links}</ul>
      <a class="botao botao--principal topo__acao" href="${canal.href}" target="_blank" rel="noopener">${icone[canal.tipo]}<span>${canal.curto}</span></a>
    </nav>
    <button class="topo__abrir" type="button" aria-expanded="false" aria-controls="menu" data-abrir-menu>
      <span class="topo__abrir-linhas" aria-hidden="true"></span><span class="visualmente-oculto">Abrir menu</span>
    </button>
  </div>
</header>`;
}

export function hero() {
  const img = config.imagens.hero;
  return `<section class="abertura" id="inicio" aria-labelledby="titulo-abertura">
  <div class="abertura__imagem">${imagem(img, { tamanhos: '100vw', carregamento: 'eager', prioridade: true })}</div>
  <div class="abertura__texto">
    <p class="abertura__lugar">${esc(config.negocio.bairro)}, ${esc(config.negocio.cidade)}</p>
    <h1 id="titulo-abertura">Café da manhã no jardim, debaixo das árvores</h1>
    <p class="abertura__apoio">Mesas de madeira entre bambus, Chocotaka de sobremesa e o cachorro junto. Na rua principal de Joaquim Egídio.</p>
    <div class="abertura__acoes">
      ${botaoCanal()}
      ${config.cardapio.some((g) => g.itens.some(visivel)) ? '<a class="botao botao--linha" href="#cardapio">Ver o cardápio</a>' : '<a class="botao botao--linha" href="#visite">Como chegar</a>'}
    </div>
  </div>
</section>`;
}

export function casa() {
  const h = config.historia;
  const usarHistoria = visivel(h);
  const paragrafos = (usarHistoria ? h.paragrafos : h.textoNeutro).map((p) => `<p>${esc(p)}</p>`).join('');
  return `<section class="casa" id="casa" aria-labelledby="titulo-casa">
  <div class="casa__imagem">${imagem(config.imagens.sobre, { tamanhos: '(min-width: 900px) 42vw, 92vw' })}</div>
  <div class="casa__texto">
    <h2 id="titulo-casa">${usarHistoria ? 'Na frente da antiga fazenda de café' : 'Na rua principal de Joaquim Egídio'}</h2>
    ${paragrafos}${usarHistoria ? selo(h) : ''}
    <p class="casa__nota">Café da manhã, brunch e almoço. Doces, sucos e cafés o dia todo.</p>
  </div>
</section>`;
}

export function cardapio() {
  const grupos = config.cardapio
    .map((g) => ({ ...g, itens: g.itens.filter(visivel) }))
    .filter((g) => g.itens.length);
  if (!grupos.length) return '';
  const destaque = grupos.flatMap((g) => g.itens).find((i) => i.destaque);

  const lista = grupos
    .map(
      (g) => `<div class="menu__grupo">
      <h3>${esc(g.grupo)}</h3>
      <ul>${g.itens
        .map(
          (i) => `<li class="menu__item${i.destaque ? ' menu__item--destaque' : ''}">
          <span class="menu__nome">${esc(i.nome)}</span>${i.preco && i.confirmado ? `<span class="menu__preco">${esc(i.preco)}</span>` : ''}
          ${i.descricao ? `<span class="menu__descricao">${esc(i.descricao)}</span>` : ''}${selo(i)}
        </li>`
        )
        .join('')}</ul>
    </div>`
    )
    .join('');

  const completo = visivel(config.cardapioCompleto) && config.cardapioCompleto.url
    ? `<a class="botao botao--escuro" href="${config.cardapioCompleto.url}" target="_blank" rel="noopener">Ver o cardápio completo</a>`
    : '';

  return `<section class="toalha" id="cardapio" aria-labelledby="titulo-cardapio">
  <div class="menu">
    <header class="menu__cabeca">
      <h2 id="titulo-cardapio">O que vai para a mesa</h2>
      <p>Alguns pedidos que voltam sempre. Doces e sucos variam com o dia, então vale perguntar o que tem antes de sair de casa.</p>
    </header>
    <div class="menu__colunas">${lista}</div>
    <div class="menu__rodape">${completo}${botaoCanal('botao botao--escuro')}</div>
  </div>
  ${destaque ? `<aside class="menu__foto" aria-label="${esc(destaque.nome)}">
    ${imagem(config.imagens.chocotaka, { tamanhos: '(min-width: 900px) 26vw, 70vw' })}
    <p><strong>${esc(destaque.nome)}.</strong> ${esc(destaque.descricao || '')}</p>
  </aside>` : ''}
</section>`;
}

export function jardim() {
  const blocos = config.jardim.blocos.filter(visivel);
  if (!blocos.length) return '';
  return `<section class="jardim" id="jardim" aria-labelledby="titulo-jardim">
  <div class="jardim__texto">
    <h2 id="titulo-jardim">${esc(config.jardim.titulo)}</h2>
    ${blocos.map((b) => `<p>${esc(b.texto)}${selo(b)}</p>`).join('')}
  </div>
  <div class="jardim__ave">${imagem(config.imagens.jardimMaritaca, { tamanhos: '(min-width: 900px) 34vw, 80vw' })}</div>
  <div class="jardim__bambus">${imagem(config.imagens.jardimBambus, { tamanhos: '(min-width: 900px) 64vw, 100vw' })}</div>
</section>`;
}

export function fotos() {
  const itens = config.galeria.filter((f) => demonstracao || !f.provisoria);
  if (!itens.length) return '';
  const cards = itens
    .map(
      (f, indice) => `<li class="fotos__item fotos__item--${f.proporcao.replace(/\s|\//g, '')}">
      <button type="button" class="fotos__abrir" data-foto="${indice}" aria-label="Ampliar: ${esc(f.alt)}">
        ${imagem(f, { tamanhos: '(min-width: 900px) 33vw, 50vw', rotuloIlustrativo: true })}
      </button>
    </li>`
    )
    .join('');
  const dados = itens.map((f) => ({ src: `${f.arquivo}-${Math.max(...f.larguras)}.webp`, alt: f.alt, ilustrativa: !!f.provisoria }));
  return `<section class="fotos" id="fotos" aria-labelledby="titulo-fotos">
  <div class="fotos__cabeca">
    <h2 id="titulo-fotos">Fotos do café</h2>
    <a class="link-sublinhado" href="${config.contato.instagram.url}" target="_blank" rel="noopener">Mais fotos no Instagram @${esc(config.contato.instagram.usuario)}</a>
  </div>
  <ul class="fotos__grade">${cards}</ul>
  <script type="application/json" id="dados-fotos">${JSON.stringify(dados).replaceAll('<', '\\u003c')}</script>
  <dialog class="ampliada" aria-label="Foto ampliada" data-ampliada>
    <figure class="ampliada__quadro"><img alt="" data-ampliada-img><figcaption data-ampliada-legenda></figcaption></figure>
    <button type="button" class="ampliada__fechar" data-ampliada-fechar aria-label="Fechar">×</button>
    <button type="button" class="ampliada__seta ampliada__seta--anterior" data-ampliada-anterior aria-label="Foto anterior">‹</button>
    <button type="button" class="ampliada__seta ampliada__seta--proxima" data-ampliada-proxima aria-label="Próxima foto">›</button>
  </dialog>
</section>`;
}

export function avaliacoes() {
  const itens = config.avaliacoes.itens.filter((a) => a.confirmado === true);
  if (!itens.length) return '';
  return `<section class="avaliacoes" id="avaliacoes" aria-labelledby="titulo-avaliacoes">
  <h2 id="titulo-avaliacoes">Quem já sentou no jardim</h2>
  <ul>${itens
    .map(
      (a) => `<li><blockquote><p>${esc(a.texto)}</p></blockquote><p class="avaliacoes__autor">${esc(a.nome)}, nota ${esc(a.nota)} de 5 no ${esc(a.origem)}</p></li>`
    )
    .join('')}</ul>
  ${config.avaliacoes.fonteUrl ? `<a class="link-sublinhado" href="${config.avaliacoes.fonteUrl}" target="_blank" rel="noopener">Ver todas as avaliações</a>` : ''}
</section>`;
}

export function duvidas() {
  const itens = config.perguntas.filter((p) => visivel(p) && (p.resposta || demonstracao));
  if (!itens.length) return '';
  return `<section class="duvidas" id="duvidas" aria-labelledby="titulo-duvidas">
  <h2 id="titulo-duvidas">Antes de vir</h2>
  <div class="duvidas__lista">${itens
    .map(
      (p) => `<details class="duvida">
      <summary><span>${esc(p.pergunta)}</span><span class="duvida__sinal" aria-hidden="true"></span></summary>
      <div class="duvida__resposta"><p>${p.resposta ? esc(p.resposta) : 'Resposta a combinar com o café.'}${selo(p)}</p></div>
    </details>`
    )
    .join('')}</div>
</section>`;
}

export function visite() {
  const { contato, horarios } = config;
  const endereco = visivel(contato.endereco) ? contato.endereco : null;
  const tabelaHorarios = visivel(horarios)
    ? `<div class="visite__horarios">
      <h3>Horários ${selo(horarios)}</h3>
      <dl>${horarios.dias.map((d) => `<div><dt>${esc(d.dia)}</dt><dd>${esc(d.horario)}</dd></div>`).join('')}</dl>
      ${horarios.observacao ? `<p class="visite__obs">${esc(horarios.observacao)}</p>` : ''}
    </div>`
    : `<div class="visite__horarios"><h3>Horários</h3><p>Confira os dias de funcionamento pelo ${canal.tipo === 'whatsapp' ? 'WhatsApp' : 'Instagram'} antes de vir.</p></div>`;

  const telefone = visivel(contato.whatsapp)
    ? `<p class="visite__fone"><a href="https://wa.me/${contato.whatsapp.valor}" target="_blank" rel="noopener">${esc(contato.whatsapp.exibicao)}</a> ${selo(contato.whatsapp)}</p>`
    : '';

  return `<section class="visite" id="visite" aria-labelledby="titulo-visite">
  <div class="visite__info">
    <h2 id="titulo-visite">Visite</h2>
    ${endereco ? `<address class="visite__endereco"><span>${esc(endereco.rua)}</span><span>${esc(endereco.bairro)}, ${esc(config.negocio.cidade)} – ${esc(config.negocio.estado)}</span><span>CEP ${esc(endereco.cep)}</span></address>` : ''}
    ${telefone}
    <div class="visite__acoes">
      ${endereco ? `<a class="botao botao--principal" href="${linkRota()}" target="_blank" rel="noopener">${icone.rota}<span>Como chegar</span></a>` : ''}
      ${botaoCanal('botao botao--linha-clara')}
    </div>
    ${tabelaHorarios}
  </div>
  ${endereco && contato.mapa.confirmado ? `<div class="visite__mapa" data-mapa data-busca="${esc(contato.mapa.busca)}">
    <div class="visite__mapa-capa">
      <p>O mapa é carregado do Google Maps só quando você pedir.</p>
      <button type="button" class="botao botao--principal" data-carregar-mapa>Mostrar mapa</button>
      <a class="link-sublinhado" href="${linkMapa()}" target="_blank" rel="noopener">Abrir no Google Maps</a>
    </div>
  </div>` : ''}
</section>`;
}

export function rodape(navegacao) {
  const { contato } = config;
  return `<footer class="rodape">
  <div class="rodape__marca">
    <a class="topo__marca" href="#inicio">${marca}<span>Café Maritaka</span></a>
    <p>Café da manhã, brunch e almoço no jardim, em Joaquim Egídio, Campinas.</p>
  </div>
  <nav class="rodape__nav" aria-label="Rodapé">
    <ul>${navegacao.map((n) => `<li><a href="#${n.id}">${n.rotulo}</a></li>`).join('')}</ul>
  </nav>
  <div class="rodape__contato">
    ${visivel(contato.endereco) ? `<p>${esc(contato.endereco.rua)}<br>${esc(contato.endereco.bairro)}, ${esc(config.negocio.cidade)}</p>` : ''}
    <p><a class="link-sublinhado" href="${contato.instagram.url}" target="_blank" rel="noopener">@${esc(contato.instagram.usuario)} no Instagram</a></p>
    <p><a class="link-sublinhado" href="${canal.href}" target="_blank" rel="noopener">${canal.rotulo}</a></p>
  </div>
  <div class="rodape__base">
    <a href="politica-de-privacidade.html">Política de privacidade</a>
    ${config.site.credito ? `<span>${esc(config.site.credito)}</span>` : ''}
  </div>
</footer>`;
}

export function botaoFlutuante() {
  return `<a class="flutuante" href="${canal.href}" target="_blank" rel="noopener" data-flutuante>${icone[canal.tipo]}<span>${canal.curto}</span></a>`;
}

export function avisoModo() {
  return demonstracao
    ? '<p class="aviso-demo" role="note">Versão de demonstração. Itens marcados com “A confirmar” e as ilustrações serão trocados por informações e fotos do café.</p>'
    : '';
}

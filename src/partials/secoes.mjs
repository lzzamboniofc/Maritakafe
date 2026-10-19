import * as config from '../config.mjs';
import { esc, visivel, selo, imagem, linkCanal, linkRota, linkMapa, linkEvento, icone, marca, demonstracao } from './util.mjs';

const canal = linkCanal();
const hoje = new Date().toISOString().slice(0, 10);

function botaoCanal(classe = 'botao botao--principal') {
  return `<a class="${classe}" href="${canal.href}" target="_blank" rel="noopener">${icone[canal.tipo]}<span>${canal.rotulo}</span></a>`;
}

const temCardapio = () => config.cardapio.some(visivel);

export function cabecalho(navegacao) {
  const links = navegacao.map((n) => `<li><a href="#${n.id}">${n.rotulo}</a></li>`).join('');
  return `<header class="topo" data-topo>
  <div class="topo__barra">
    <a class="topo__marca" href="#inicio" aria-label="MaritaKafé, voltar ao início">${marca}<span>MaritaKafé</span></a>
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

export function abertura() {
  const { contato } = config;
  return `<section class="abertura" id="inicio" aria-labelledby="titulo-abertura">
  <div class="abertura__prato" aria-hidden="false">
    <div class="prato">${imagem('tosta', { tamanhos: '(min-width: 960px) 30vw, 62vw', carregamento: 'eager', prioridade: true })}</div>
    <div class="abertura__xicara">${imagem('diaDoCafe', { tamanhos: '(min-width: 960px) 16vw, 34vw', carregamento: 'eager' })}</div>
  </div>
  <div class="abertura__texto">
    <p class="abertura__lugar">${esc(contato.endereco.rua)}, ${esc(config.negocio.cidade)}</p>
    <h1 id="titulo-abertura">O único pão de queijo Waffle Canastra de Itu</h1>
    <p class="abertura__apoio">${esc(config.negocio.bio)} Combo Arara, waffle, ovos mexidos, café e oficinas de vez em quando.</p>
    <div class="abertura__acoes">
      ${botaoCanal()}
      <a class="botao botao--linha" href="${temCardapio() ? '#cardapio' : '#visite'}">${temCardapio() ? 'Ver o cardápio' : 'Como chegar'}</a>
    </div>
  </div>
</section>`;
}

export function casa() {
  return `<section class="casa" id="casa" aria-labelledby="titulo-casa">
  <div class="casa__foto">${imagem('equipe', { tamanhos: '(min-width: 900px) 30vw, 80vw' })}</div>
  <div class="casa__texto">
    <h2 id="titulo-casa">A maritaca pousada no K</h2>
    <p>É ela que aparece no logotipo, em cima do K de MaritaKafé, e assina num cantinho as fotos dos pratos.</p>
    <p>Na Rua Hélio Tomba, a casa serve waffle, ovos mexidos, frutas, café e o pão de queijo que virou a marca do lugar. Entre um café e outro, abre espaço para oficinas e eventos.</p>
    <a class="link-sublinhado" href="${config.contato.instagram.url}" target="_blank" rel="noopener">A história do nome está no post “Por que Maritakafé?”</a>
  </div>
</section>`;
}

export function cardapio() {
  const itens = config.cardapio.filter(visivel);
  if (!itens.length) return '';
  const destaque = itens.find((i) => i.destaque);
  const comFoto = itens.filter((i) => !i.destaque);
  const completo = visivel(config.cardapioCompleto)
    ? `<a class="botao botao--principal" href="${config.cardapioCompleto.url}" target="_blank" rel="noopener">${icone.instagram}<span>${esc(config.cardapioCompleto.rotulo)}</span></a>`
    : '';
  const preco = (i) => (i.preco && i.confirmado ? `<span class="prato-item__preco">${esc(i.preco)}</span>` : '');

  return `<section class="listras" id="cardapio" aria-labelledby="titulo-cardapio">
  <div class="cardapio">
    <h2 id="titulo-cardapio">Na mesa</h2>
    ${destaque ? `<div class="cardapio__destaque">
      <h3>${esc(destaque.nome)}${preco(destaque)}</h3>
      <p>${esc(destaque.descricao)}${selo(destaque)}</p>
    </div>` : ''}
    <ul class="cardapio__itens">${comFoto
      .map(
        (i) => `<li class="prato-item">
        ${i.imagem ? imagem(i.imagem, { tamanhos: '(min-width: 720px) 22rem, 86vw', classe: 'prato-item__foto' }) : ''}
        <h3>${esc(i.nome)}${preco(i)}</h3>
        <p>${esc(i.descricao)}${selo(i)}</p>
      </li>`
      )
      .join('')}</ul>
    <div class="cardapio__rodape">
      ${completo}
      ${config.cardapioCompleto.observacao ? `<p>${esc(config.cardapioCompleto.observacao)}</p>` : ''}
    </div>
  </div>
</section>`;
}

export function eventos() {
  const futuros = config.eventos.filter((e) => visivel(e) && (!e.data || e.data >= hoje));
  const passado = visivel(config.eventosPassados) ? config.eventosPassados : null;
  return `<section class="eventos" id="eventos" aria-labelledby="titulo-eventos">
  <div class="eventos__cabeca">
    <h2 id="titulo-eventos">Oficinas e eventos</h2>
    <p>A casa recebe oficinas e reserva espaço para comemorações. Para o seu evento, a reserva é pelo WhatsApp.</p>
    <a class="botao botao--escuro" href="${linkEvento()}" target="_blank" rel="noopener">${icone.whatsapp}<span>Reservar para o meu evento</span></a>
  </div>
  <div class="eventos__lista" data-eventos>
    ${futuros
      .map(
        (e) => `<article class="evento" data-ate="${esc(e.data || '')}">
        ${e.imagem ? imagem(e.imagem, { tamanhos: '(min-width: 900px) 24rem, 90vw', classe: 'evento__foto' }) : ''}
        <div class="evento__texto">
          <p class="evento__data"><time datetime="${esc(e.data)}">${esc(e.dataExibicao)}</time></p>
          <h3>${esc(e.titulo)}</h3>
          ${e.detalhe ? `<p class="evento__detalhe">${esc(e.detalhe)}</p>` : ''}
          <p>${esc(e.descricao)}${selo(e)}</p>
          ${e.link ? `<a class="link-sublinhado" href="${e.link}" target="_blank" rel="noopener">Ver no Instagram</a>` : ''}
        </div>
      </article>`
      )
      .join('')}
    <p class="eventos__vazio"${futuros.length ? ' hidden' : ''}>As próximas datas saem primeiro no <a class="link-sublinhado" href="${config.contato.instagram.url}" target="_blank" rel="noopener">Instagram</a>.</p>
  </div>
  ${passado ? `<aside class="eventos__passado">
    ${passado.imagem ? imagem(passado.imagem, { tamanhos: '10rem', classe: 'eventos__passado-foto' }) : ''}
    <p>${esc(passado.texto)}</p>
  </aside>` : ''}
</section>`;
}

export function sospeso() {
  const s = config.sospeso;
  if (!visivel(s)) return '';
  return `<section class="sospeso" id="sospeso" aria-labelledby="titulo-sospeso">
  <div class="sospeso__foto">${imagem('sospeso', { tamanhos: '(min-width: 900px) 30vw, 90vw' })}</div>
  <div class="sospeso__texto">
    <h2 id="titulo-sospeso">${esc(s.titulo)}</h2>
    ${s.texto.map((p, i) => `<p>${esc(p)}${i === s.texto.length - 1 ? selo(s) : ''}</p>`).join('')}
  </div>
</section>`;
}

export function fotos() {
  const itens = config.galeria.map((c) => config.imagens[c]).filter((f) => f && (demonstracao || !f.provisoria));
  if (!itens.length) return '';
  const cards = itens
    .map(
      (f, indice) => `<li class="fotos__item">
      <button type="button" class="fotos__abrir" data-foto="${indice}" aria-label="Ampliar: ${esc(f.alt)}">
        ${imagem(f, { tamanhos: '(min-width: 900px) 30vw, 46vw' })}
      </button>
    </li>`
    )
    .join('');
  const dados = itens.map((f) => ({ src: f.arquivo, alt: f.alt, ilustrativa: !!f.provisoria }));
  return `<section class="fotos" id="fotos" aria-labelledby="titulo-fotos">
  <div class="fotos__cabeca">
    <h2 id="titulo-fotos">Do nosso Instagram</h2>
    <a class="link-sublinhado" href="${config.contato.instagram.url}" target="_blank" rel="noopener">Seguir @${esc(config.contato.instagram.usuario)}</a>
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
  <h2 id="titulo-avaliacoes">Quem já passou por aqui</h2>
  <ul>${itens
    .map((a) => `<li><blockquote><p>${esc(a.texto)}</p></blockquote><p class="avaliacoes__autor">${esc(a.nome)}, nota ${esc(a.nota)} de 5 no ${esc(a.origem)}</p></li>`)
    .join('')}</ul>
  ${config.avaliacoes.fonteUrl ? `<a class="link-sublinhado" href="${config.avaliacoes.fonteUrl}" target="_blank" rel="noopener">Ver todas as avaliações</a>` : ''}
</section>`;
}

export function duvidas() {
  const itens = config.perguntas.filter((p) => visivel(p) && (p.resposta || demonstracao));
  if (!itens.length) return '';
  const extra = (p) => (p.acao === 'evento' ? ` <a class="link-sublinhado" href="${linkEvento()}" target="_blank" rel="noopener">Chamar no WhatsApp</a>` : '');
  return `<section class="duvidas" id="duvidas" aria-labelledby="titulo-duvidas">
  <h2 id="titulo-duvidas">Antes de vir</h2>
  <div class="duvidas__lista">${itens
    .map(
      (p) => `<details class="duvida">
      <summary><span>${esc(p.pergunta)}</span><span class="duvida__sinal" aria-hidden="true"></span></summary>
      <div class="duvida__resposta"><p>${p.resposta ? esc(p.resposta) : 'Resposta a combinar com a casa.'}${extra(p)}${selo(p)}</p></div>
    </details>`
    )
    .join('')}</div>
</section>`;
}

export function visite() {
  const { contato, horarios } = config;
  const complemento = visivel(contato.bairroCep)
    ? `<span>${esc(contato.bairroCep.bairro)}, ${esc(config.negocio.cidade)} – ${esc(config.negocio.estado)}${selo(contato.bairroCep)}</span><span>CEP ${esc(contato.bairroCep.cep)}</span>`
    : `<span>${esc(config.negocio.cidade)} – ${esc(config.negocio.estado)}</span>`;

  const listaHorarios = visivel(horarios) && horarios.dias.length
    ? `<dl>${horarios.dias.map((d) => `<div><dt>${esc(d.dia)}</dt><dd>${esc(d.horario)}</dd></div>`).join('')}</dl>${selo(horarios)}`
    : `<p>Os horários atualizados ficam no destaque “Horario” do <a class="link-sublinhado" href="${contato.instagram.url}" target="_blank" rel="noopener">Instagram</a>.</p>`;

  return `<section class="visite" id="visite" aria-labelledby="titulo-visite">
  <div class="visite__info">
    <h2 id="titulo-visite">Visite</h2>
    <address class="visite__endereco"><span>${esc(contato.endereco.rua)}</span>${complemento}</address>
    ${visivel(contato.whatsapp) ? `<p class="visite__fone">WhatsApp <a href="https://wa.me/${contato.whatsapp.valor}" target="_blank" rel="noopener">${esc(contato.whatsapp.exibicao)}</a>${selo(contato.whatsapp)}</p>` : ''}
    <div class="visite__acoes">
      <a class="botao botao--claro" href="${linkRota()}" target="_blank" rel="noopener">${icone.rota}<span>Como chegar</span></a>
      ${botaoCanal('botao botao--linha-clara')}
    </div>
    <div class="visite__horarios"><h3>Horários</h3>${listaHorarios}</div>
  </div>
  <div class="visite__mapa" data-mapa data-busca="${esc(contato.mapa.busca)}">
    <div class="visite__mapa-capa">
      <p>O mapa é carregado do Google Maps só quando você pedir.</p>
      <button type="button" class="botao botao--claro" data-carregar-mapa>Mostrar mapa</button>
      <a class="link-sublinhado" href="${linkMapa()}" target="_blank" rel="noopener">Abrir no Google Maps</a>
    </div>
  </div>
</section>`;
}

export function rodape(navegacao) {
  const { contato } = config;
  return `<footer class="rodape">
  <div class="rodape__marca">
    <img class="rodape__ave" src="assets/img/ave.webp" width="148" height="148" alt="">
    <p><strong>MaritaKafé</strong><br>${esc(config.negocio.bio)}</p>
  </div>
  <nav class="rodape__nav" aria-label="Rodapé">
    <ul>${navegacao.map((n) => `<li><a href="#${n.id}">${n.rotulo}</a></li>`).join('')}</ul>
  </nav>
  <div class="rodape__contato">
    <p>${esc(contato.endereco.rua)}<br>${esc(config.negocio.cidade)} – ${esc(config.negocio.estado)}</p>
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
    ? '<p class="aviso-demo" role="note">Versão de demonstração. Itens marcados com “A confirmar” ainda serão validados com a MaritaKafé.</p>'
    : '';
}

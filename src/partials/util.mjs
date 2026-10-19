import * as config from '../config.mjs';

export const demonstracao = config.modo === 'demonstracao';

export function esc(texto = '') {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// No modo público, só passa o que foi confirmado.
export function visivel(item) {
  if (!item) return false;
  return demonstracao || item.confirmado === true;
}

export function selo(item) {
  return demonstracao && item && item.confirmado === false
    ? '<span class="selo-pendente" title="Informação ainda não confirmada pelo café">A confirmar</span>'
    : '';
}

export function imagem(chave, { tamanhos = '100vw', carregamento = 'lazy', classe = '', prioridade = false } = {}) {
  const img = typeof chave === 'string' ? config.imagens[chave] : chave;
  const rotulo = img.provisoria && demonstracao ? '<span class="selo-ilustrativo">Imagem ilustrativa</span>' : '';
  return `<figure class="quadro ${classe}" style="--proporcao:${img.largura} / ${img.altura}">
    <img src="${img.arquivo}" width="${img.largura}" height="${img.altura}" sizes="${tamanhos}" alt="${esc(img.alt)}" loading="${carregamento}" decoding="async"${prioridade ? ' fetchpriority="high"' : ''}>
    ${rotulo}
  </figure>`;
}

export function linkCanal() {
  const { contato, canal } = config;
  const usarWhatsapp = canal.preferido === 'whatsapp' && visivel(contato.whatsapp) && contato.whatsapp.valor;
  if (usarWhatsapp) {
    return {
      href: `https://wa.me/${contato.whatsapp.valor}?text=${encodeURIComponent(canal.mensagemWhatsapp)}`,
      rotulo: 'Chamar no WhatsApp',
      curto: 'WhatsApp',
      tipo: 'whatsapp',
    };
  }
  return { href: contato.instagram.direct, rotulo: 'Mandar mensagem no Instagram', curto: 'Mensagem', tipo: 'instagram' };
}

export function linkMapa() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.contato.mapa.busca)}`;
}

export function linkEvento() {
  return `https://wa.me/${config.contato.whatsapp.valor}?text=${encodeURIComponent(config.canal.mensagemEvento)}`;
}

export function linkRota() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.contato.mapa.busca)}`;
}

export const icone = {
  whatsapp: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>',
  instagram: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  rota: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
};

export const marca = `<img class="marca-logo" src="${config.negocio.logotipo.arquivo}" width="164" height="164" alt="">`;

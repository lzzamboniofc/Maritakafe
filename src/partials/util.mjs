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

export function imagem(img, { tamanhos = '100vw', carregamento = 'lazy', classe = '', prioridade = false, rotuloIlustrativo = false } = {}) {
  const maior = Math.max(...img.larguras);
  const srcset = img.larguras.map((l) => `${img.arquivo}-${l}.webp ${l}w`).join(', ');
  const [w, h] = img.proporcao.split('/').map((n) => Number(n.trim()));
  const altura = Math.round((maior * h) / w);
  const rotulo = rotuloIlustrativo && img.provisoria ? '<span class="selo-ilustrativo">Imagem ilustrativa</span>' : '';
  return `<figure class="quadro ${classe}" style="--proporcao:${img.proporcao}">
    <img src="${img.arquivo}-${maior}.webp" srcset="${srcset}" sizes="${tamanhos}" width="${maior}" height="${altura}" alt="${esc(img.alt)}" loading="${carregamento}" decoding="async"${prioridade ? ' fetchpriority="high"' : ''}>
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

export function linkRota() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.contato.mapa.busca)}`;
}

export const icone = {
  whatsapp: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>',
  instagram: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  rota: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
};

export const marca = `<svg class="marca-ave" aria-hidden="true" viewBox="0 0 64 64" width="34" height="34"><path d="M24 40c-3 8-6 14-11 20h4c5-5 8-11 10-19Z" fill="currentColor" opacity=".55"/><ellipse cx="29" cy="34" rx="12" ry="15" fill="currentColor"/><circle cx="34" cy="19" r="10" fill="currentColor"/><path d="M41 14c7 0 9 7 5 11-1-3-3-4-5-4Z" fill="var(--cor-bico-ave, #F3E7C9)"/><circle cx="36" cy="17" r="3" fill="var(--cor-olho-ave, #FBFAF4)"/><circle cx="36.5" cy="17" r="1.4" fill="#2B1E16"/></svg>`;

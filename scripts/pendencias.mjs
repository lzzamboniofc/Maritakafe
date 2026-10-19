// Lista o que ainda precisa ser confirmado ou trocado antes de publicar no modo público.
import * as config from '../src/config.mjs';

const pendentes = [];
const anotar = (grupo, texto, detalhe) => pendentes.push({ grupo, texto, detalhe });

const { negocio, contato, horarios, historia, cardapio, cardapioCompleto, jardim, imagens, galeria, avaliacoes, perguntas } = config;

if (!negocio.logotipo.confirmado) anotar('Marca', 'Logotipo oficial', negocio.logotipo.observacao);
if (!negocio.paleta.confirmado) anotar('Marca', 'Cores oficiais', negocio.paleta.observacao);
for (const [chave, item] of Object.entries(contato)) {
  if (item && item.confirmado === false) anotar('Contato', chave, item.fonte || 'Sem dado');
}
if (!horarios.confirmado) anotar('Horários', 'Dias e horários de funcionamento', horarios.fonte);
if (!historia.confirmado) anotar('Sobre', 'História da casa (fundação, nomes)', historia.fonte);
for (const grupo of cardapio) {
  for (const item of grupo.itens) {
    if (!item.confirmado) anotar('Cardápio', `${grupo.grupo}: ${item.nome}`, 'Confirmar se continua no cardápio e o preço');
  }
}
if (!cardapioCompleto.confirmado) anotar('Cardápio', 'Link do cardápio completo', 'Opcional');
for (const bloco of jardim.blocos) if (!bloco.confirmado) anotar('Jardim', bloco.texto, bloco.fonte);
for (const p of perguntas) if (!p.confirmado || !p.resposta) anotar('Dúvidas', p.pergunta, p.resposta ? 'Confirmar resposta' : 'Sem resposta');
if (!avaliacoes.itens.length) anotar('Avaliações', 'Nenhuma avaliação real cadastrada', 'Seção fica oculta até receber avaliações do Google');

const provisorias = [
  ...Object.entries(imagens).filter(([, i]) => i.provisoria).map(([nome, i]) => ({ nome, i })),
  ...galeria.filter((i) => i.provisoria).map((i, n) => ({ nome: `galeria[${n}]`, i })),
];
for (const { nome, i } of provisorias) anotar('Imagens provisórias', `${nome}: ${i.arquivo}-*.webp`, i.alt);
for (const extra of config.pendenciasExtras) anotar('Outros', extra, '');

const porGrupo = Object.groupBy ? Object.groupBy(pendentes, (p) => p.grupo) : pendentes.reduce((acc, p) => ((acc[p.grupo] ??= []).push(p), acc), {});
console.log(`\nModo atual: ${config.modo}\nPendências: ${pendentes.length}\n`);
for (const [grupo, itens] of Object.entries(porGrupo)) {
  console.log(`■ ${grupo} (${itens.length})`);
  for (const p of itens) console.log(`  - ${p.texto}${p.detalhe ? `\n      ${p.detalhe}` : ''}`);
  console.log('');
}

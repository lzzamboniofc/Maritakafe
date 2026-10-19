// Lista o que ainda precisa ser confirmado ou trocado antes de publicar no modo público.
import * as config from '../src/config.mjs';

const pendentes = [];
const anotar = (grupo, texto, detalhe = '') => pendentes.push({ grupo, texto, detalhe });
const hoje = new Date().toISOString().slice(0, 10);

const { contato, horarios, cardapio, eventos, sospeso, imagens, avaliacoes, perguntas } = config;

for (const [chave, item] of Object.entries(contato)) {
  if (item && item.confirmado === false) anotar('Contato', chave, item.fonte || 'Sem dado');
}
if (!horarios.confirmado || !horarios.dias.length) anotar('Horários', 'Dias e horários de funcionamento', horarios.fonte);
for (const item of cardapio) if (!item.confirmado) anotar('Cardápio', item.nome, item.fonte);
for (const item of cardapio) if (!item.preco) anotar('Cardápio', `Preço: ${item.nome}`, 'Opcional');
for (const e of eventos) {
  if (!e.confirmado) anotar('Eventos', e.titulo, 'Confirmar data e detalhes');
  if (e.data && e.data < hoje) anotar('Eventos', `${e.titulo} já passou (${e.data})`, 'Remover ou trocar pelo próximo evento');
}
if (!sospeso.confirmado) anotar('Café sospeso', 'Como funciona na casa', sospeso.fonte);
for (const p of perguntas) if (!p.confirmado || !p.resposta) anotar('Dúvidas', p.pergunta, p.resposta ? 'Confirmar resposta' : 'Sem resposta');
if (!avaliacoes.itens.length) anotar('Avaliações', 'Nenhuma avaliação real cadastrada', 'A seção fica oculta até receber avaliações do Google');

for (const [nome, img] of Object.entries(imagens)) {
  if (img.provisoria) anotar('Imagens provisórias', `${nome}: ${img.arquivo}`, img.alt);
  else if (img.largura < 800) anotar('Imagens em baixa resolução', `${nome}: ${img.arquivo} (${img.largura} px)`, 'Trocar pelo original em alta');
}
for (const extra of config.pendenciasExtras) anotar('Outros', extra);

const porGrupo = pendentes.reduce((acc, p) => ((acc[p.grupo] ??= []).push(p), acc), {});
console.log(`\nModo atual: ${config.modo}\nPendências: ${pendentes.length}\n`);
for (const [grupo, itens] of Object.entries(porGrupo)) {
  console.log(`■ ${grupo} (${itens.length})`);
  for (const p of itens) console.log(`  - ${p.texto}${p.detalhe ? `\n      ${p.detalhe}` : ''}`);
  console.log('');
}

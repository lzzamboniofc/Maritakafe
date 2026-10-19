// Configuração central do site da MaritaKafé.
// Tudo o que aparece para o visitante sai daqui. Itens com `confirmado: false`
// aparecem com o selo "A confirmar" no modo demonstração e somem no modo público.
// Depois de editar, rode `npm run build` e `npm run pendencias`.

export const modo = 'demonstracao'; // 'demonstracao' | 'publico'

export const site = {
  url: 'https://lzzamboniofc.github.io/Maritakafe/',
  titulo: 'MaritaKafé | Cafeteria em Itu com pão de queijo Waffle Canastra',
  descricao:
    'Cafeteria em Itu com comida afetiva, gostosa e saudável. Pão de queijo Waffle Canastra, Combo Arara, oficinas e café sospeso. Rua Hélio Tomba, 100.',
  imagemCompartilhamento: 'assets/img/compartilhar.png',
  credito: null, // ex.: 'Site por Seu Nome'
};

export const negocio = {
  nome: { valor: 'MaritaKafé', confirmado: true, fonte: 'Perfil @maritakafe' },
  segmento: 'Cafeteria',
  cidade: 'Itu',
  estado: 'SP',
  bio: 'Cafeteria com comida afetiva, gostosa e saudável.',
  logotipo: {
    arquivo: 'assets/img/logo.webp',
    confirmado: true,
    observacao: 'Recortado do print do perfil (164 px). Pedir o arquivo original em alta (SVG ou PNG).',
  },
};

export const contato = {
  endereco: {
    rua: 'Rua Hélio Tomba, 100',
    confirmado: true,
    fonte: 'Perfil @maritakafe',
  },
  bairroCep: {
    bairro: 'Itu Novo Centro',
    cep: '13303-542',
    confirmado: false,
    fonte: 'Base pública de CEP para a Rua Hélio Tomba. Confirmar com a casa.',
  },
  whatsapp: {
    valor: '5511945257494',
    exibicao: '(11) 94525-7494',
    confirmado: true,
    fonte: 'Linktree oficial (linktr.ee/maritakafe)',
  },
  instagram: {
    usuario: 'maritakafe',
    url: 'https://www.instagram.com/maritakafe/',
    direct: 'https://ig.me/m/maritakafe',
    confirmado: true,
  },
  linktree: { url: 'https://linktr.ee/maritakafe', confirmado: true },
  email: { valor: null, confirmado: false },
  mapa: { busca: 'MaritaKafé, Rua Hélio Tomba, 100, Itu - SP', confirmado: true },
};

export const canal = {
  preferido: 'whatsapp',
  mensagemWhatsapp: 'Oi! Vi o site da MaritaKafé e queria uma informação.',
  mensagemEvento: 'Oii, quero fazer uma reserva para o meu evento aí na Maritakafé!',
};

// Os horários estão no destaque "Horario" do Instagram. Copie-os aqui e marque confirmado.
export const horarios = {
  confirmado: false,
  fonte: 'Destaque "Horario" do Instagram (não lido).',
  dias: [
    // { dia: 'Terça a sexta', horario: '8h às 18h' },
  ],
};

// O cardápio completo está no destaque "Cardápio" do Instagram.
// Preço só aparece quando `preco` estiver preenchido e o item confirmado.
export const cardapio = [
  {
    nome: 'Pão de queijo Waffle Canastra',
    descricao: 'O pão de queijo que a casa diz ser o único de Itu.',
    preco: null,
    confirmado: true,
    fonte: 'Bio do Instagram',
    destaque: true,
  },
  {
    nome: 'Combo Arara',
    descricao: 'Waffle, ovos mexidos, taça de frutas e café com leite.',
    preco: null,
    confirmado: false,
    fonte: 'Post "O que vem no Combo Arara?". Composição deduzida da foto.',
    imagem: 'comboArara',
  },
  {
    nome: 'Torrada com morangos',
    descricao: 'Pão tostado coberto de morango picado.',
    preco: null,
    confirmado: false,
    fonte: 'Foto do Instagram. Confirmar o nome do prato.',
    imagem: 'tosta',
  },
];

export const cardapioCompleto = {
  url: 'https://www.instagram.com/maritakafe/',
  rotulo: 'Ver o cardápio no Instagram',
  observacao: 'O cardápio completo fica no destaque “Cardápio” do perfil.',
  confirmado: true,
};

// Eventos com data deixam de aparecer depois do dia (no build e no navegador).
export const eventos = [
  {
    titulo: 'Oficina de bandtape',
    detalhe: 'Segunda edição',
    data: '2026-10-22',
    dataExibicao: '22 de outubro',
    descricao: 'Detalhes e inscrição no post fixado do Instagram.',
    link: 'https://www.instagram.com/maritakafe/',
    imagem: 'oficina',
    confirmado: true,
  },
];

export const eventosPassados = {
  texto: 'No 1º de outubro, Dia do Café, a casa resolveu comemorar o mês inteiro, do jeito italiano.',
  imagem: 'diaDoCafe',
  confirmado: true,
};

export const sospeso = {
  titulo: 'Café sospeso',
  texto: [
    'O costume vem de Nápoles: quem pode paga um café a mais, e ele fica “suspenso” para alguém que chegar depois.',
    'A MaritaKafé adotou a ideia. Pergunte no balcão como deixar o seu.',
  ],
  confirmado: false,
  fonte: 'Vídeo "café sospenso" no Instagram. Confirmar como funciona na casa.',
};

// Imagens recortadas do print do perfil. Peça os originais em alta para trocar.
const recorte = 'Instagram @maritakafe (recorte do print do perfil, baixa resolução)';
export const imagens = {
  tosta: { arquivo: 'assets/img/tosta-morangos.webp', largura: 352, altura: 386, alt: 'Duas torradas cobertas de morango picado num prato listrado de verde e branco.', provisoria: false, fonte: recorte },
  comboArara: { arquivo: 'assets/img/combo-arara.webp', largura: 356, altura: 314, alt: 'Combo Arara: waffle, ovos mexidos, taça de frutas e café com leite.', provisoria: false, fonte: recorte },
  diaDoCafe: { arquivo: 'assets/img/dia-do-cafe.webp', largura: 356, altura: 285, alt: 'Cappuccino na xícara com o logotipo da MaritaKafé, grãos de café e o cartão “Não faço questão, faço cafés”.', provisoria: false, fonte: recorte },
  equipe: { arquivo: 'assets/img/equipe.webp', largura: 355, altura: 319, alt: 'Duas pessoas da MaritaKafé sorrindo com bebidas geladas, uma de avental com o logotipo da casa.', provisoria: false, fonte: recorte },
  sospeso: { arquivo: 'assets/img/cafe-sospeso.webp', largura: 355, altura: 246, alt: 'Mulher falando sobre o café sospeso, com parede de azulejos verdes ao fundo.', provisoria: false, fonte: recorte },
  oficina: { arquivo: 'assets/img/oficina-bandtape.webp', largura: 355, altura: 282, alt: 'Duas mulheres sorrindo com xícaras decoradas na oficina de bandtape.', provisoria: false, fonte: recorte },
};

// Galeria "Do nosso Instagram". Fica oculta enquanto só houver as fotos já usadas nas outras seções.
// Adicione novas chaves de `imagens` aqui quando a casa enviar mais fotos.
export const galeria = [];

export const avaliacoes = {
  fonteUrl: null,
  itens: [
    // { nome: 'Nome como aparece no Google', nota: 5, texto: '...', origem: 'Google', confirmado: true },
  ],
};

export const perguntas = [
  {
    pergunta: 'Dá para reservar a casa para um evento?',
    resposta: 'Dá. A reserva é feita pelo WhatsApp.',
    acao: 'evento',
    confirmado: true,
  },
  {
    pergunta: 'Que horas a MaritaKafé abre?',
    resposta: 'Os horários estão no destaque “Horario” do Instagram.',
    confirmado: true,
  },
  {
    pergunta: 'O que é o pão de queijo Waffle Canastra?',
    resposta: 'É pão de queijo assado na máquina de waffle, feito com queijo canastra.',
    confirmado: false,
  },
  {
    pergunta: 'Tem opções saudáveis?',
    resposta: 'A proposta da casa é comida afetiva, gostosa e saudável. Pergunte pelas opções do dia.',
    confirmado: true,
  },
  { pergunta: 'Quais formas de pagamento são aceitas?', resposta: null, confirmado: false },
  { pergunta: 'Tem estacionamento?', resposta: null, confirmado: false },
];

export const pendenciasExtras = [
  'Fotos: as atuais são recortes do print do Instagram (cerca de 350 px). Pedir os originais em alta.',
  'Logotipo em alta resolução (SVG ou PNG transparente).',
  'Nome e papel das pessoas que aparecem nas fotos, caso a casa queira uma seção de equipe.',
  'A história do nome (post "Por que Maritakafé?") para a seção A casa.',
  'Política de privacidade: confirmar um e-mail ou canal para pedidos sobre dados.',
];

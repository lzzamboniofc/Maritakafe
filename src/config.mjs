// Configuração central do site do Maritakafé.
// Tudo o que aparece para o visitante sai daqui. Itens com `confirmado: false`
// aparecem com o selo "A confirmar" no modo demonstração e somem no modo público.
// Depois de editar, rode `npm run build` e `npm run pendencias`.

export const modo = 'demonstracao'; // 'demonstracao' | 'publico'

export const site = {
  url: 'https://lzzamboniofc.github.io/Maritakafe/',
  idioma: 'pt-BR',
  titulo: 'Maritakafé | Café da manhã, brunch e almoço em Joaquim Egídio, Campinas',
  descricao:
    'Café da manhã, brunch e almoço no jardim, entre árvores antigas e bambus, na rua principal de Joaquim Egídio, em Campinas. Pode levar o pet.',
  imagemCompartilhamento: 'assets/img/compartilhar.png',
  credito: null, // ex.: 'Site por Seu Nome'
};

export const negocio = {
  nome: { valor: 'Maritakafé', confirmado: true, fonte: 'Informado pelo cliente (perfil @maritakafe)' },
  segmento: 'Cafeteria',
  bairro: 'Joaquim Egídio',
  cidade: 'Campinas',
  estado: 'SP',
  logotipo: {
    valor: null,
    confirmado: false,
    observacao: 'Logotipo oficial não obtido. O site usa a marca nominativa em Lora como provisória.',
  },
  paleta: {
    confirmado: false,
    observacao: 'Cores provisórias tiradas da maritaca e do jardim. Ajustar com as cores do Instagram/logotipo.',
  },
};

export const contato = {
  endereco: {
    valor: 'R. Dr. Heitor Penteado, 1580 – Joaquim Egídio, Campinas – SP, 13108-002',
    rua: 'R. Dr. Heitor Penteado, 1580',
    bairro: 'Joaquim Egídio',
    cep: '13108-002',
    confirmado: true,
    fonte: 'Cadastro do CNPJ na Receita Federal e guias de Campinas',
  },
  whatsapp: {
    valor: '5519991550038',
    exibicao: '(19) 99155-0038',
    confirmado: false,
    fonte: 'Matéria "Os Melhores da Gastronomia" (2022) e listagens públicas. Confirmar se ainda é o número de atendimento.',
  },
  instagram: {
    usuario: 'maritakafe',
    url: 'https://www.instagram.com/maritakafe/',
    direct: 'https://ig.me/m/maritakafe',
    confirmado: true,
    fonte: 'Enviado pelo cliente',
  },
  email: { valor: null, confirmado: false },
  mapa: {
    busca: 'R. Dr. Heitor Penteado, 1580 - Joaquim Egídio, Campinas - SP, 13108-002',
    confirmado: true,
  },
};

// Canal principal de conversão. Enquanto o WhatsApp não for confirmado,
// o modo público usa o Direct do Instagram automaticamente.
export const canal = {
  preferido: 'whatsapp',
  mensagemWhatsapp: 'Olá! Vi o site do Maritakafé e queria uma informação.',
};

export const horarios = {
  confirmado: false,
  fonte: 'Guias on-line divergem entre si. Confirmar com o café antes de publicar.',
  observacao: 'Horários vistos em guias on-line. Feriados podem mudar.',
  dias: [
    { dia: 'Segunda a quarta', horario: 'Fechado' },
    { dia: 'Quinta e sexta', horario: '12h30 às 19h' },
    { dia: 'Sábado e domingo', horario: '8h às 19h' },
  ],
};

export const historia = {
  confirmado: false,
  fonte: 'Matéria "Os Melhores da Gastronomia" (março de 2022). Confirmar nomes e datas com o café.',
  paragrafos: [
    'O Maritakafé abriu em frente à antiga sede da fazenda de café de Joaquim Egídio. A ideia de Liliana Barretto era simples: mesas no jardim, café da manhã sem pressa e espaço para quem chega com o cachorro.',
    'Desde 2020 a cozinha está com o chef Pedro Patrone Barretto, sobrinho de Liliana, que frequenta o café desde criança. Vieram pratos novos e outros métodos de preparo de café, e o jardim continuou do mesmo jeito.',
  ],
  textoNeutro: [
    'O Maritakafé fica na rua principal de Joaquim Egídio, com mesas espalhadas pelo jardim e sombra das árvores e dos bambus.',
  ],
};

// Itens citados por clientes e pela imprensa. O cardápio muda com a estação;
// confirme o que está valendo antes de marcar `confirmado: true`.
// Preço só aparece quando `preco` estiver preenchido e confirmado.
export const cardapio = [
  {
    grupo: 'Para começar o dia',
    itens: [
      { nome: 'Ciabatta com ovos mexidos e bacon', descricao: null, preco: null, confirmado: false },
      { nome: 'Pão de milho com queijo', descricao: 'Queijo quente no pão de milho.', preco: null, confirmado: false },
      { nome: 'Croissant com brie e geleia de figo', descricao: null, preco: null, confirmado: false },
      { nome: 'Pão de queijo', descricao: null, preco: null, confirmado: false },
    ],
  },
  {
    grupo: 'Doces da casa',
    itens: [
      { nome: 'Chocotaka', descricao: 'Brownie com calda de chocolate quente e sorvete de creme.', preco: null, confirmado: false, destaque: true },
      { nome: 'Torta de pera', descricao: 'Servida com calda de amora e sorvete.', preco: null, confirmado: false },
      { nome: 'Queijada', descricao: null, preco: null, confirmado: false },
    ],
  },
  {
    grupo: 'Sucos e bebidas',
    itens: [
      { nome: 'Limão-cravo', descricao: null, preco: null, confirmado: false },
      { nome: 'Morango com manjericão', descricao: null, preco: null, confirmado: false },
      { nome: 'Açaí com laranja', descricao: null, preco: null, confirmado: false },
      { nome: 'Suco verde', descricao: 'Couve, hortelã e laranja.', preco: null, confirmado: false },
      { nome: 'Cappuccino', descricao: null, preco: null, confirmado: false },
      { nome: 'Chocolate quente', descricao: null, preco: null, confirmado: false },
    ],
  },
];

export const cardapioCompleto = {
  url: null, // link do cardápio oficial (PDF, Goomer, etc.), quando houver
  confirmado: false,
};

export const jardim = {
  titulo: 'Debaixo das árvores, com visita das maritacas',
  blocos: [
    {
      texto: 'As mesas de madeira ficam no jardim, entre árvores antigas e bambus. Tem parte coberta para os dias de chuva.',
      confirmado: true,
      fonte: 'Guia da Semana e avaliações públicas',
    },
    {
      texto: 'Cachorro é bem-vindo. Muita gente vem com o pet e fica a manhã inteira.',
      confirmado: true,
      fonte: 'Avaliações públicas e imprensa',
    },
    {
      texto: 'Maritacas, araras, esquilos e às vezes um macaquinho passam pelas árvores enquanto a mesa é servida. O nome da casa veio daí.',
      confirmado: false,
      fonte: 'Relatos de visitantes e imprensa. Confirmar a origem do nome.',
    },
  ],
};

// Todas as imagens do site. Troque `arquivo` pela foto real (mesmo nome em .webp)
// e marque `provisoria: false`.
export const imagens = {
  hero: {
    arquivo: 'assets/img/jardim',
    larguras: [720, 1200, 2400],
    proporcao: '3 / 2',
    alt: 'Ilustração de uma mesa com toalha xadrez no jardim, entre árvores e bambus, com uma maritaca no galho.',
    provisoria: true,
    fonte: 'Ilustração própria do projeto (provisória)',
  },
  sobre: {
    arquivo: 'assets/img/mesa',
    larguras: [720, 1200],
    proporcao: '4 / 5',
    alt: 'Ilustração vista de cima: xícara de café, croissant e suco de laranja sobre toalha xadrez vermelha.',
    provisoria: true,
    fonte: 'Ilustração própria do projeto (provisória)',
  },
  chocotaka: {
    arquivo: 'assets/img/chocotaka',
    larguras: [720, 1200],
    proporcao: '1 / 1',
    alt: 'Ilustração de brownie com bola de sorvete de creme e calda de chocolate escorrendo.',
    provisoria: true,
    fonte: 'Ilustração própria do projeto (provisória)',
  },
  jardimMaritaca: {
    arquivo: 'assets/img/maritaca',
    larguras: [720, 1200],
    proporcao: '4 / 5',
    alt: 'Ilustração de uma maritaca verde pousada num galho entre folhas.',
    provisoria: true,
    fonte: 'Ilustração própria do projeto (provisória)',
  },
  jardimBambus: {
    arquivo: 'assets/img/bambus',
    larguras: [900, 1600],
    proporcao: '16 / 11',
    alt: 'Ilustração de um bambuzal com luz entrando pelo meio.',
    provisoria: true,
    fonte: 'Ilustração própria do projeto (provisória)',
  },
};

// Galeria: só fotos reais no modo público.
export const galeria = [
  { arquivo: 'assets/img/jardim', larguras: [720, 1200], proporcao: '3 / 2', alt: 'Ilustração do jardim com mesa posta.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
  { arquivo: 'assets/img/paes', larguras: [720, 1200], proporcao: '1 / 1', alt: 'Ilustração de cesta com pães de queijo sobre toalha xadrez.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
  { arquivo: 'assets/img/sucos', larguras: [720, 1200], proporcao: '1 / 1', alt: 'Ilustração de três copos de suco: laranja, verde e vermelho.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
  { arquivo: 'assets/img/maritaca', larguras: [720, 1200], proporcao: '4 / 5', alt: 'Ilustração de maritaca no galho.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
  { arquivo: 'assets/img/chocotaka', larguras: [720, 1200], proporcao: '1 / 1', alt: 'Ilustração da Chocotaka.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
  { arquivo: 'assets/img/bambus', larguras: [900, 1600], proporcao: '16 / 11', alt: 'Ilustração do bambuzal.', provisoria: true, fonte: 'Ilustração própria (provisória)' },
];

// Avaliações: só com texto, nome e nota exatamente como aparecem no Google.
export const avaliacoes = {
  fonteUrl: null,
  itens: [
    // { nome: 'Nome como aparece no Google', nota: 5, texto: '...', origem: 'Google', confirmado: true },
  ],
};

export const perguntas = [
  {
    pergunta: 'Posso levar meu cachorro?',
    resposta: 'Pode. O jardim recebe pets, e muita gente vem acompanhada.',
    confirmado: true,
  },
  {
    pergunta: 'Em que dias o café abre?',
    resposta: 'Os horários atualizados estão na seção Visite. Em feriados, vale confirmar antes pelo canal de atendimento.',
    confirmado: false,
  },
  {
    pergunta: 'Precisa reservar mesa?',
    resposta: null,
    confirmado: false,
  },
  {
    pergunta: 'Tem opção de almoço?',
    resposta: 'Além do café da manhã e do brunch, a casa serve almoço. Pergunte qual é o prato do dia.',
    confirmado: false,
  },
  {
    pergunta: 'Dá para fazer evento ou casamento no jardim?',
    resposta: null,
    confirmado: false,
  },
  {
    pergunta: 'Quais formas de pagamento são aceitas?',
    resposta: null,
    confirmado: false,
  },
];

export const pendenciasExtras = [
  'Unidade em Itu: um cadastro público cita endereço na Praça da Independência, 31 (Centro, Itu). Confirmar se existe outra unidade e se deve aparecer no site.',
  'Arroba do Instagram: uma matéria de 2022 cita @cafemaritaka; o cliente enviou @maritakafe. Confirmar o perfil atual.',
  'Política de privacidade: confirmar o responsável e um e-mail de contato para solicitações de dados.',
];

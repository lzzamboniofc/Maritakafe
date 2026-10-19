(() => {
  const topo = document.querySelector('[data-topo]');
  const abrirMenu = document.querySelector('[data-abrir-menu]');
  const abertura = document.querySelector('.abertura');
  const flutuante = document.querySelector('[data-flutuante]');

  if (topo) {
    const atualizar = () => {
      topo.classList.toggle('topo--rolado', scrollY > 24);
      if (flutuante && abertura) flutuante.classList.toggle('flutuante--visivel', abertura.getBoundingClientRect().bottom < 0);
    };
    addEventListener('scroll', atualizar, { passive: true });
    atualizar();
  }

  if (topo && abrirMenu) {
    const fechar = () => {
      topo.classList.remove('topo--menu-aberto');
      abrirMenu.setAttribute('aria-expanded', 'false');
      abrirMenu.querySelector('.visualmente-oculto').textContent = 'Abrir menu';
    };
    abrirMenu.addEventListener('click', () => {
      const aberto = topo.classList.toggle('topo--menu-aberto');
      abrirMenu.setAttribute('aria-expanded', String(aberto));
      abrirMenu.querySelector('.visualmente-oculto').textContent = aberto ? 'Fechar menu' : 'Abrir menu';
    });
    topo.querySelectorAll('.topo__nav a').forEach((link) => link.addEventListener('click', fechar));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && topo.classList.contains('topo--menu-aberto')) {
        fechar();
        abrirMenu.focus();
      }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', fechar);
  }

  const dialogo = document.querySelector('[data-ampliada]');
  const dadosFotos = document.getElementById('dados-fotos');
  if (dialogo && dadosFotos) {
    const fotos = JSON.parse(dadosFotos.textContent);
    const img = dialogo.querySelector('[data-ampliada-img]');
    const legenda = dialogo.querySelector('[data-ampliada-legenda]');
    let atual = 0;
    let origem = null;

    const mostrar = (indice) => {
      atual = (indice + fotos.length) % fotos.length;
      const foto = fotos[atual];
      img.src = foto.src;
      img.alt = foto.alt;
      legenda.textContent = foto.ilustrativa ? `${foto.alt} (imagem ilustrativa)` : foto.alt;
    };

    document.querySelectorAll('[data-foto]').forEach((botao) =>
      botao.addEventListener('click', () => {
        origem = botao;
        mostrar(Number(botao.dataset.foto));
        dialogo.showModal();
      })
    );
    dialogo.querySelector('[data-ampliada-fechar]').addEventListener('click', () => dialogo.close());
    dialogo.querySelector('[data-ampliada-anterior]').addEventListener('click', () => mostrar(atual - 1));
    dialogo.querySelector('[data-ampliada-proxima]').addEventListener('click', () => mostrar(atual + 1));
    dialogo.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') mostrar(atual - 1);
      if (e.key === 'ArrowRight') mostrar(atual + 1);
    });
    dialogo.addEventListener('click', (e) => {
      if (e.target === dialogo) dialogo.close();
    });
    dialogo.addEventListener('close', () => origem && origem.focus());

    let inicioX = null;
    dialogo.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
    dialogo.addEventListener('touchend', (e) => {
      if (inicioX === null) return;
      const distancia = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(distancia) > 45) mostrar(atual + (distancia < 0 ? 1 : -1));
      inicioX = null;
    });
  }

  const mapa = document.querySelector('[data-mapa]');
  if (mapa) {
    mapa.querySelector('[data-carregar-mapa]').addEventListener('click', () => {
      const quadro = document.createElement('iframe');
      quadro.src = `https://www.google.com/maps?q=${encodeURIComponent(mapa.dataset.busca)}&output=embed`;
      quadro.title = 'Mapa com a localização do Café Maritaka';
      quadro.loading = 'lazy';
      quadro.referrerPolicy = 'no-referrer-when-downgrade';
      mapa.querySelector('.visite__mapa-capa').remove();
      mapa.appendChild(quadro);
      quadro.focus();
    });
  }
})();

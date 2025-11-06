document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const indicators = document.querySelectorAll("#indicators span");
  const totalSlides = carousel.children.length;
  let currentIndex = 0;
  const intervalTime = 4000; 
  let autoSlide;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    indicators.forEach((dot, index) => {
      dot.style.opacity = index === currentIndex ? "0.8" : "0.4";
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  document.getElementById("next").addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
  });

  document.getElementById("prev").addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
  });

  indicators.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
      restartAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, intervalTime);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();
  
  const slideWidth = getSlideWidth();
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  
  function getSlideWidth() {
    const firstSlide = carousel.children[0];
    const style = getComputedStyle(carousel);
    const gap = parseFloat(style.gap) || 0; 
    return firstSlide.offsetWidth + gap;
  }
  
});

const btnCultural = document.getElementById('btnCultural');
const btnHistorico = document.getElementById('btnHistorico');
const btnNatural = document.getElementById('btnNatural');

const titulo = document.getElementById('titulo');
const infos = document.getElementById('infos');
const imagem = document.getElementById('imagem');

const conteudos = {
  cultural: {
    titulo: "Pontos Turisticos Culturais",
    infos: [
      "<strong>Quilombo do Mandira</strong> – tradição, culinária e cultura caiçara viva.<br><br><strong>Comunidade Ariri</strong> – comunidade tradicional preservando costumes e artesanato local.<br><br><strong>Comunidade Maruja</strong> – local com manifestações culturais típicas e vida caiçara ativa.<br><br><strong>Passeio de Barco Caiçara</strong> – experiência cultural que mostra a vida tradicional dos pescadores e a história local através dos rios e canais da cidade.<br><br><strong>Museu Municipal de Cananéia</strong> – objetos históricos e culturais da formação da cidade."
    ],
    imagens: [
      "src/img/cananeia-fazenda-de-ostras-quilombo-Mandira.jpg",
      "src/img/ariri.png",
      "src/img/maruja.jpg",
      "src/img/barco.jpg",
      "src/img/museu.jpg",
    ]
  },
  historico: {
    titulo: "Pontos Turisticos Históricos",
    infos: [
      "<strong>Centro Histórico de Cananéia</strong> – casarões coloniais e ruas de pedra, preservando a arquitetura original.<br><br><strong>Igreja de São João Batista</strong> – uma das mais antigas do Brasil (1650), marco histórico da cidade.<br><br><strong>Marco do Tratado de Tordesilhas</strong> – local simbólico relacionado à divisão territorial entre Portugal e Espanha.<br><br><strong>Museu Municipal de Cananéia</strong> – objetos históricos e culturais da formação da cidade.<br><br><strong>Casarões Coloniais do Centro</strong> – exemplares de arquitetura portuguesa preservados na cidade."
    ],
    imagens: [
      "src/img/centro.jpg",
      "src/img/igreja.jpg",
      "src/img/marco-tordesilhas.jpg",
      "src/img/museu.jpg",
      "src/img/casas-coloniais.jpg",
    ]
  },
  natural: {
    titulo: "Pontos Turisticos Naturais",
    infos: ["<strong>Ilha do Cardoso</strong> – parque estadual com trilhas, cachoeiras e praias preservadas. <br><br><strong>Baía dos Golfinhos</strong> – passeio de barco onde é possível verbotos-cinza.<br><br><strong>Praia da Laje</strong> – local tranquilo com águas claras e vista incrível.<br><br><Strong>Ilha do Bom Abrigo</strong> – refúgio natural com praias tranquilas, vegetação preservada e ótimas oportunidades para observação de aves.<br><br><strong>Cachoeira do Rio das Minas</strong> – cachoeira com águas cristalinas, rodeada por mata nativa, ideal para trilhas e momentos de contemplação da natureza."
    ],
    imagens: [
      "src/img/ilha-do-cardoso.jpg",
      "src/img/golfinhos.jpg",
      "src/img/praia-laje.png",
      "src/img/bom-abrigo.jpg",
      "src/img/rio-das-minas.jpg",
    ]
  }
};

function mostrarConteudo(tipo) {
  const dados = conteudos[tipo];
  titulo.textContent = dados.titulo;

  infos.innerHTML = `<ul class="list-disc list-inside space-y-2">
    ${dados.infos.map(item => `<li>${item}</li>`).join('')}
  </ul>`;

  let index = 0;
  imagem.src = dados.imagens[index];

  clearInterval(imagem.intervalo);

  imagem.intervalo = setInterval(() => {
    index = (index + 1) % dados.imagens.length;
    imagem.classList.add("opacity-0");
    setTimeout(() => {
      imagem.src = dados.imagens[index];
      imagem.classList.remove("opacity-0");
    }, 500);
  }, 3000);
}

window.addEventListener("DOMContentLoaded", () => {
  mostrarConteudo('natural');
  
  btnCultural.addEventListener('click', () => mostrarConteudo('cultural'));
  btnHistorico.addEventListener('click', () => mostrarConteudo('historico'));
  btnNatural.addEventListener('click', () => mostrarConteudo('natural'));
  
  
});


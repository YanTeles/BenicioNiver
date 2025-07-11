document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.horizontal-timeline', {
        // Optional parameters
        loop: false,
        spaceBetween: 16,
        slidesPerView: 1,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    const familySwiper = new Swiper('.family-gallery-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 50,
            modifier: 0.8,
            slideShadows: true,
        },
        pagination: {
            el: '.family-gallery-swiper .swiper-pagination',
        },
        navigation: {
            nextEl: '.family-gallery-swiper .swiper-button-next',
            prevEl: '.family-gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    });

    const benicioSwiper = new Swiper('.benicio-gallery-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 50,
            modifier: 0.8,
            slideShadows: true,
        },
        pagination: {
            el: '.benicio-gallery-swiper .swiper-pagination',
        },
        navigation: {
            nextEl: '.benicio-gallery-swiper .swiper-button-next',
            prevEl: '.benicio-gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 5,
            }
        }
    });

    // Press Start button scroll functionality
    // const pressStartButton = document.querySelector('.press-start-button');
    // if (pressStartButton) {
    //     pressStartButton.addEventListener('click', () => {
    //         // Add click effect
    //         pressStartButton.style.transform = 'scale(0.95)';
    //         setTimeout(() => {
    //             pressStartButton.style.transform = '';
    //         }, 150);
    //         
    //         const timelineSection = document.getElementById('timeline');
    //         timelineSection.scrollIntoView({ 
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     });
    // }

    // --- Lightbox para ampliar fotos ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    // Função para abrir o lightbox
    function openLightbox(src, alt) {
      lightbox.style.display = 'flex';
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      document.body.style.overflow = 'hidden';
    }

    // Função para fechar o lightbox
    function closeLightbox() {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    // Adiciona evento de clique nas imagens das galerias
    document.querySelectorAll('.gallery-item img, .photo-placeholder img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox(this.src, this.alt);
      });
    });

    // Fecha ao clicar no X ou fora da imagem
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Fecha ao apertar ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });

    // --- Mensagens (Guestbook) ---

    const mensagensList = document.getElementById('mensagens-list');
    const mensagemForm = document.getElementById('mensagem-form');

    // Função para renderizar mensagens
    function renderMensagens(mensagens) {
        mensagensList.innerHTML = '';
        mensagens.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'mensagem-item';
            div.innerHTML = `<strong>${msg.nome}</strong><br>${msg.mensagem}`;
            mensagensList.appendChild(div);
        });
    }

    // Buscar mensagens do backend
    async function fetchMensagens() {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            renderMensagens(data);
        } catch (err) {
            mensagensList.innerHTML = '<div style="color:red">Erro ao carregar mensagens.</div>';
        }
    }

    // Enviar nova mensagem
    mensagemForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        if (!nome || !mensagem) return;
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, mensagem })
            });
            if (res.ok) {
                document.getElementById('nome').value = '';
                document.getElementById('mensagem').value = '';
                fetchMensagens();
            } else {
                alert('Erro ao enviar mensagem.');
            }
        } catch (err) {
            alert('Erro ao enviar mensagem.');
        }
    });

    // Carregar mensagens ao abrir a página
    fetchMensagens();
});

// --- Contador de visitas simples ---
document.addEventListener('DOMContentLoaded', function () {
  const contadorNum = document.getElementById('contador-num');
  if (contadorNum) {
    let visitas = localStorage.getItem('contadorBenicioNiver');
    if (!visitas) visitas = 0;
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('contadorBenicioNiver', visitas);
    contadorNum.textContent = visitas;
  }
});

// --- Cronômetro de tempo na página ---
document.addEventListener('DOMContentLoaded', function () {
  const cronometro = document.getElementById('cronometro');
  if (cronometro) {
    let segundos = 0;
    function formatarTempo(seg) {
      const h = String(Math.floor(seg / 3600)).padStart(2, '0');
      const m = String(Math.floor((seg % 3600) / 60)).padStart(2, '0');
      const s = String(seg % 60).padStart(2, '0');
      return `${h}:${m}:${s}`;
    }
    setInterval(() => {
      segundos++;
      cronometro.textContent = formatarTempo(segundos);
    }, 1000);
  }
});

// --- Contagem regressiva para o próximo aniversário ---
document.addEventListener('DOMContentLoaded', function () {
  const countdown = document.getElementById('countdown');
  if (countdown) {
    // Defina a data do próximo aniversário (exemplo: 21 de junho do próximo ano)
    const hoje = new Date();
    let anoAlvo = hoje.getFullYear();
    const mesAlvo = 5; // Junho (0=Jan, 5=Jun)
    const diaAlvo = 21;
    // Se já passou, pega o próximo ano
    if (hoje.getMonth() > mesAlvo || (hoje.getMonth() === mesAlvo && hoje.getDate() > diaAlvo)) {
      anoAlvo++;
    }
    const dataAlvo = new Date(anoAlvo, mesAlvo, diaAlvo, 0, 0, 0);

    function atualizarCountdown() {
      const agora = new Date();
      let diff = Math.floor((dataAlvo - agora) / 1000);
      if (diff < 0) diff = 0;
      const dias = Math.floor(diff / 86400);
      const horas = Math.floor((diff % 86400) / 3600);
      const minutos = Math.floor((diff % 3600) / 60);
      const segundos = diff % 60;
      countdown.textContent = `${dias}d ${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    }
    atualizarCountdown();
    setInterval(atualizarCountdown, 1000);
  }
});

// --- Contagem regressiva para 19/07 ---
document.addEventListener('DOMContentLoaded', function () {
  const countdown2 = document.getElementById('countdown-2');
  if (countdown2) {
    // Defina a data alvo: 19 de julho do ano atual ou próximo
    const hoje = new Date();
    let anoAlvo = hoje.getFullYear();
    const mesAlvo = 6; // Julho (0=Jan, 6=Jul)
    const diaAlvo = 19;
    // Se já passou, pega o próximo ano
    if (hoje.getMonth() > mesAlvo || (hoje.getMonth() === mesAlvo && hoje.getDate() > diaAlvo)) {
      anoAlvo++;
    }
    const dataAlvo = new Date(anoAlvo, mesAlvo, diaAlvo, 0, 0, 0);

    function atualizarCountdown2() {
      const agora = new Date();
      let diff = Math.floor((dataAlvo - agora) / 1000);
      if (diff < 0) diff = 0;
      const dias = Math.floor(diff / 86400);
      const horas = Math.floor((diff % 86400) / 3600);
      const minutos = Math.floor((diff % 3600) / 60);
      const segundos = diff % 60;
      countdown2.textContent = `${dias}d ${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
    }
    atualizarCountdown2();
    setInterval(atualizarCountdown2, 1000);
  }
});

window.addEventListener('DOMContentLoaded', function() {
  // --- Animação de céu estrelado, fundo limpo e poucas estrelas ---
  (function() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    let stars = [];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }

    function createStars(count) {
      stars = [];
      for (let i = 0; i < count; i++) {
        const isBig = Math.random() < 0.10;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: isBig ? Math.random() * 2.2 + 1.2 : Math.random() * 1.1 + 0.2,
          alpha: isBig ? Math.random() * 0.3 + 0.7 : Math.random() * 0.5 + 0.5,
          speed: Math.random() * 0.025 + 0.01, // twinkle mais suave
          twinkle: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * (isBig ? 0.06 : 0.03), // movimento bem sutil
          vy: (Math.random() - 0.5) * (isBig ? 0.06 : 0.03)
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, w, h);
      for (let star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.twinkle));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = star.r * 4;
        ctx.fill();
        ctx.restore();

        // Twinkle
        star.twinkle += star.speed;
        if (star.twinkle > Math.PI * 2) star.twinkle -= Math.PI * 2;

        // Movimento sutil
        star.x += star.vx;
        star.y += star.vy;

        // Loop nas bordas
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;
      }
    }

    function animate() {
      drawStars();
      requestAnimationFrame(animate);
    }

    function init() {
      resize();
      createStars(Math.floor(w * h / 3500)); // MENOS estrelas, mais limpo
      animate();
    }

    window.addEventListener('resize', () => {
      resize();
      createStars(Math.floor(w * h / 3500));
    });

    init();
  })();
});

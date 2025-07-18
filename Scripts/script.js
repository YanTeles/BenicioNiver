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

    const telesFamilySwiper = new Swiper('.teles-family-gallery-swiper', {
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
            el: '.teles-family-gallery-swiper .swiper-pagination',
        },
        navigation: {
            nextEl: '.teles-family-gallery-swiper .swiper-button-next',
            prevEl: '.teles-family-gallery-swiper .swiper-button-prev',
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

    // (nenhum bloco de função ou objeto deve ficar aberto após a remoção dos contadores)
});

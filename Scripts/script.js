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

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imagesToEnlarge = document.querySelectorAll('.timeline-slide-content .photo-placeholder img, .gallery-item .photo-placeholder img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const pressStartButton = document.querySelector('.press-start-button');

    // Press Start button scroll functionality
    pressStartButton.addEventListener('click', () => {
        // Add click effect
        pressStartButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            pressStartButton.style.transform = '';
        }, 150);
        
        const timelineSection = document.getElementById('timeline');
        timelineSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    imagesToEnlarge.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    const close = () => {
        lightbox.style.display = 'none';
    }

    closeLightbox.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            close();
        }
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

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
});

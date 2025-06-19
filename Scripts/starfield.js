const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 500;
const speed = 0.5; // Ajuste a velocidade aqui

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * speed + 0.1
        });
    }
}

function updateStars() {
    for (let i = 0; i < numStars; i++) {
        stars[i].y += stars[i].speed;
        if (stars[i].y > canvas.height) {
            stars[i].y = 0;
            stars[i].x = Math.random() * canvas.width;
        }
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numStars; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
    }
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    stars = []; // Limpa e recria as estrelas para o novo tamanho
    createStars();
});

resizeCanvas();
createStars();
animate(); 
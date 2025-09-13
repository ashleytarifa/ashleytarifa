const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Canvas setup
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';

// Star configuration
const MAX_STARS = 150; // Set your desired maximum number of stars
const STAR_CREATION_INTERVAL = 150; // ms between star creation attempts

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];

function createStar() {
  // Only create a new star if we're below the limit
  if (stars.length >= MAX_STARS) return;

  const fromTop = Math.random() < 0.5; // 50% chance to come from top or right

  let x, y;
  if (fromTop) {
    x = Math.random() * canvas.width;
    y = -10; 
  } else {
    x = canvas.width + 10; 
    y = Math.random() * canvas.height;
  }

  const size = Math.random() * 2 + 1.5;
  const speed = size * 0.5 + Math.random();
  const opacitySpeed = Math.random() * 0.02 + 0.01;
  
  stars.push({ 
    x, 
    y, 
    size, 
    speed, 
    opacity: 1, 
    opacityDir: -1, 
    opacitySpeed 
  });
}

function drawStar(x, y, size, opacity, points = 5) {
  const outerRadius = size;
  const innerRadius = size / 2;
  const step = Math.PI / points;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.beginPath();
  for (let i = 0; i < 2 * points; i++) {
    const radius = (i % 2 === 0) ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const sx = x + radius * Math.cos(angle);
    const sy = y + radius * Math.sin(angle);
    ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fillStyle = '#fff7db';
  ctx.fill();
  ctx.restore();
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw stars
  for (let star of stars) {
    star.x -= star.speed * 0.5;
    star.y += star.speed;

    star.opacity += star.opacitySpeed * star.opacityDir;
    if (star.opacity <= 0.3 || star.opacity >= 1) {
      star.opacityDir *= -1;
    }

    drawStar(star.x, star.y, star.size, star.opacity);
  }

  // Remove stars that are off-screen
  for (let i = stars.length - 1; i >= 0; i--) {
    if (stars[i].y > canvas.height || stars[i].x < 0) {
      stars.splice(i, 1);
    }
  }

  requestAnimationFrame(animateStars);
}

// Create stars at regular intervals (but only if under limit)
setInterval(createStar, STAR_CREATION_INTERVAL);
animateStars();
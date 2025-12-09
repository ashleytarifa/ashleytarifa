const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();


const particles = [];
const total = 200; // rain particles quantity

for (let i = 0; i < total; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff40"; // rain color

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function update() {
  for (let p of particles) {
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -5;
      p.x = Math.random() * canvas.width;
    }
  }
}

function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();
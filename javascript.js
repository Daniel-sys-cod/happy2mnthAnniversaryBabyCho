const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const words = [
  "I love you",
  "I love cho",
  "I love Cho Hay Thi Chan",
  "Happy 2 month anniversary baby"
];

const particles = [];

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

for (let i = 0; i < 30; i++) {
  particles.push({
    text: words[Math.floor(Math.random() * words.length)],
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 1 + Math.random() * 2,
    size: 20 + Math.random() * 15
  });
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((word) => {
    word.y += word.speed;

    let dx = mouse.x - word.x;
    let dy = mouse.y - word.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      word.x -= dx / distance * 3;
      word.y -= dy / distance * 3;
    }

    if (word.y > canvas.height + 50) {
      word.y = -50;
      word.x = Math.random() * canvas.width;
    }

    ctx.font = `${word.size}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(word.text, word.x, word.y);
  });

  requestAnimationFrame(animate);
}

animate();
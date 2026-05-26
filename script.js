// ==========================================
// Background Music
// ==========================================

window.addEventListener('click', () => {

  const music = document.getElementById('bgMusic');

  music.play();

}, { once: true });


// ==========================================
// Countdown Timer
// ==========================================

const weddingDate =
  new Date("December 13, 2026 11:50:00").getTime();

const timer = setInterval(() => {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours =
    Math.floor((distance %
      (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60));

  const minutes =
    Math.floor((distance %
      (1000 * 60 * 60)) /
      (1000 * 60));

  const seconds =
    Math.floor((distance %
      (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;

  document.getElementById("hours").innerHTML = hours;

  document.getElementById("minutes").innerHTML = minutes;

  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {

    clearInterval(timer);

    document.querySelector(".countdown-container").innerHTML = `
      <h2 style="
        color:#b38b2d;
        font-family:Cinzel, serif;
      ">
        We Are Married ❤️
      </h2>
    `;
  }

}, 1000);


// ==========================================
// Fireworks Animation
// ==========================================

const canvas =
  document.getElementById('fireworks');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let fireworks = [];

class Firework {

  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.radius = 2;

    this.color =
      `hsl(${Math.random() * 50 + 30},
      100%,70%)`;

    this.velocity = {

      x: (Math.random() - 0.5) * 6,

      y: (Math.random() - 0.5) * 6
    };

    this.alpha = 1;
  }

  draw() {

    ctx.save();

    ctx.globalAlpha = this.alpha;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = this.color;

    ctx.fill();

    ctx.restore();
  }

  update() {

    this.x += this.velocity.x;

    this.y += this.velocity.y;

    this.alpha -= 0.01;

    this.draw();
  }
}

function createFireworks() {

  const x =
    Math.random() * canvas.width;

  const y =
    Math.random() * canvas.height / 2;

  for (let i = 0; i < 40; i++) {

    fireworks.push(new Firework(x, y));
  }
}

function animateFireworks() {

  requestAnimationFrame(animateFireworks);

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  fireworks.forEach((firework, index) => {

    if (firework.alpha <= 0) {

      fireworks.splice(index, 1);

    } else {

      firework.update();
    }
  });
}

setInterval(createFireworks, 2500);

animateFireworks();


// ==========================================
// Resize Canvas
// ==========================================

window.addEventListener('resize', () => {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;
});

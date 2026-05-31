// ==========================================
// ENTRY SCREEN & AUDIO CONTROLS
// ==========================================

const entryScreen = document.getElementById('entry-screen');
const mainContent = document.getElementById('main-content');
const enterBtn = document.getElementById('enter-btn');
const musicToggle = document.getElementById('music-toggle');
const music = document.getElementById('bgMusic');

let isMusicPlaying = false;

enterBtn.addEventListener('click', () => {
  // Fade out entry screen
  entryScreen.style.opacity = '0';
  
  setTimeout(() => {
    entryScreen.style.display = 'none';
    mainContent.style.opacity = '1';
    musicToggle.style.display = 'flex'; // Show music control
  }, 1000);

  // Play music
  music.play().then(() => {
    isMusicPlaying = true;
    musicToggle.innerText = '🔊';
  }).catch((error) => {
    // Browsers sometimes block autoplay, handle gracefully
    console.log("Audio autoplay was prevented by browser.", error);
    isMusicPlaying = false;
    musicToggle.innerText = '🔇';
  });
});

// Toggle music on click
musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    music.pause();
    musicToggle.innerText = '🔇';
  } else {
    music.play();
    musicToggle.innerText = '🔊';
  }
  isMusicPlaying = !isMusicPlaying;
});

// ==========================================
// REVEAL ANIMATION
// ==========================================

function revealSections() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    const revealPoint = 120;
    
    if (revealTop < windowHeight - revealPoint) {
      section.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealSections);
revealSections();

// ==========================================
// COUNTDOWN TIMER
// ==========================================

const weddingDate = new Date("December 13, 2026 11:50:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}, 1000);

// ==========================================
// FIREWORKS
// ==========================================

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 50 + 30}, 100%, 70%)`;
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
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
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
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  
  for (let i = 0; i < 40; i++) {
    fireworks.push(new Firework(x, y));
  }
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
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
// RESIZE CANVAS
// ==========================================

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

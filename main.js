/* ===== ĐẾM THỜI GIAN ===== */
const loveDate = new Date("2024-03-18T00:00:00");

function updateCounter() {
  const now = new Date();
  const diff = now - loveDate;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = d;
  document.getElementById("time").innerText =
    `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
}
setInterval(updateCounter, 1000);
updateCounter();

/* ===== NHẠC NỀN & VIỀN PHÁT SÁNG ===== */
const songs = [
  "assets/music/HonCaYeu.mp3",
  "assets/music/NgayDauTien.mp3",
  "assets/music/YesIdo.mp3",
];
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const mainCard = document.querySelector(".main-card"); // Lấy thẻ card

bgMusic.src = songs[Math.floor(Math.random() * songs.length)];

// Hàm bật hiệu ứng
function enableGlow() {
  musicBtn.classList.add("playing");
  musicBtn.innerText = "🎵";
  mainCard.classList.add("playing-glow");
}

// Hàm tắt hiệu ứng
function disableGlow() {
  musicBtn.classList.remove("playing");
  musicBtn.innerText = "🔇";
  mainCard.classList.remove("playing-glow");
}

document.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        enableGlow();
      });
    }
  },
  { once: true },
);

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bgMusic.paused) {
    bgMusic.play();
    enableGlow();
  } else {
    bgMusic.pause();
    disableGlow();
  }
});

/* ===== GIỮ NGUYÊN PHẦN TUYẾT RƠI ===== */
/* ===== TUYẾT RƠI (CANVAS) ===== */
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Snow {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 40; i++) particles.push(new Snow());
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* ===== ĐẾM THỜI GIAN ===== */
const loveDate = new Date("2024-01-20T00:00:00");

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
  { name: "Hơn Cả Yêu", path: "assets/music/HonCaYeu.mp3" },
  { name: "Ngày Đầu Tiên", path: "assets/music/NgayDauTien.mp3" },
  { name: "Yes I Do", path: "assets/music/YesIdo.mp3" },
];

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const songNameDisplay = document.getElementById("songName");
const mainCard = document.querySelector(".main-card");

const randomSong = songs[Math.floor(Math.random() * songs.length)];
bgMusic.src = randomSong.path;

function enableGlow() {
  musicBtn.classList.add("playing");
  musicBtn.innerText = "🎵";
  mainCard.classList.add("playing-glow");
  songNameDisplay.innerText = "♪ " + randomSong.name;
  songNameDisplay.style.opacity = "1";
}

function disableGlow() {
  musicBtn.classList.remove("playing");
  musicBtn.innerText = "🔇";
  mainCard.classList.remove("playing-glow");
  songNameDisplay.style.opacity = "0";
}

document.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => enableGlow());
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

/* ===== XỬ LÝ MỞ THƯ, TIM BAY & ALBUM ===== */
const envelope = document.querySelector(".envelope-wrapper");
const albumBtn = document.getElementById("albumBtn");
const albumModal = document.getElementById("albumModal");
const closeModal = document.querySelector(".close-modal");

// 1. Hàm tạo trái tim bay
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerText = "❤️";

  const section = document.querySelector(".envelope-section");
  section.appendChild(heart);

  const tx = (Math.random() - 0.5) * 300 + "px";
  const ty = -(Math.random() * 200 + 100) + "px";
  const tr = Math.random() * 360 + "deg";

  heart.style.setProperty("--tx", tx);
  heart.style.setProperty("--ty", ty);
  heart.style.setProperty("--tr", tr);

  heart.style.left = "50%";
  heart.style.top = "50%";

  setTimeout(() => {
    heart.remove();
  }, 1500);
}

// 2. Sự kiện click vào phong thư để MỞ/ĐÓNG
envelope.addEventListener("click", (e) => {
  // Nếu bấm vào nút Album thì không đóng phong thư
  if (e.target.closest("#albumBtn")) return;

  const isOpen = envelope.classList.contains("open");
  envelope.classList.toggle("open");

  // Nếu là hành động MỞ, thì bắn tim
  if (!isOpen) {
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 50);
    }
  }
});

const container = document.querySelector(".timeline-container");
const progressBar = document.querySelector(".progress-bar");
const totalItems = document.querySelectorAll(".timeline-item").length;

container.addEventListener("scroll", () => {
  const scrollLeft = container.scrollLeft;
  const width = container.clientWidth;

  // Tính toán phần trăm đã xem
  const progress = ((scrollLeft + width) / (width * totalItems)) * 100;
  progressBar.style.width = progress + "%";
});

// Sửa lại hàm mở Album trong JS cũ của bạn
albumBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  albumModal.style.display = "block";
  document.body.style.overflow = "hidden"; // Khóa cuộn trang chính
  container.scrollLeft = 0; // Reset về ảnh đầu
  progressBar.style.width = 100 / totalItems + "%"; // Thanh tiến trình ban đầu
});

// 4. Sự kiện đóng Modal khi bấm nút X hoặc bấm ra ngoài ảnh
closeModal.addEventListener("click", () => {
  albumModal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target == albumModal) {
    albumModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
albumBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  albumModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Tự động cuộn về đầu timeline
  const container = document.querySelector(".timeline-container");
  container.scrollLeft = 0;
});

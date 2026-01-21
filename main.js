/* ===== LOVE DAY ===== */
const loveDate = new Date("2024-01-20");

function updateDays() {
  const now = new Date();
  const diff = now - loveDate;
  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));
}

function updateTime() {
  const n = new Date();
  document.getElementById("time").innerText =
    String(n.getHours()).padStart(2, "0") + " : " +
    String(n.getMinutes()).padStart(2, "0") + " : " +
    String(n.getSeconds()).padStart(2, "0");
}

updateDays();
setInterval(updateTime, 1000);

/* ===== RANDOM MUSIC ===== */
const musicList = [
  "assets/music/HonCaYeu.mp3",
  "assets/music/NgayDauTien.mp3",
  "assets/music/YesIdo.mp3"
];

const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

audio.src = musicList[Math.floor(Math.random() * musicList.length)];
audio.volume = 0.8;

let isPlaying = false;

/* iOS / Mobile: auto play sau lần chạm đầu */
document.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      musicBtn.classList.remove("off");
    }).catch(() => {});
  }
}, { once: true });

/* Toggle 🎵 */
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    musicBtn.classList.remove("off");
  } else {
    audio.pause();
    isPlaying = false;
    musicBtn.classList.add("off");
  }
});


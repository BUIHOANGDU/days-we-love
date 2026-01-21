/* ===== LOVE DAY ===== */
const loveDate = new Date("2024-03-18");

function updateDays() {
  const now = new Date();
  const diff = now - loveDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("days").innerText = days;
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

/* ===== AUTO MUSIC ===== */
const songs = [
  "assets/music/HonCaYeu.mp3",
  "assets/music/NgayDauTien.mp3",
  "assets/music/YesIdo.mp3"
];

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

bgMusic.src = songs[Math.floor(Math.random() * songs.length)];
bgMusic.volume = 0.8;

let isPlaying = false;

/* iOS: play after first touch */
document.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.remove("off");
    }).catch(() => {});
  }
}, { once: true });

/* Toggle */
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bgMusic.paused) {
    bgMusic.play();
    isPlaying = true;
    musicBtn.classList.remove("off");
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.classList.add("off");
  }
});

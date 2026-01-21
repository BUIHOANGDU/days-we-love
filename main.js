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
/* ===== RANDOM MUSIC ===== */
const musicList = [
  "assets/music/HonCaYeu.mp3",
  "assets/music/NgayDauTien.mp3",
  "assets/music/YesIdo.mp3"
];

const bgMusic = document.getElementById("bgMusic");
const randomIndex = Math.floor(Math.random() * musicList.length);
bgMusic.src = musicList[randomIndex];

// iOS cần user interaction
document.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });



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
/* ===== RANDOM MUSIC + TOGGLE ===== */
const musicList = [
  "assets/music/love1.mp3",
  "assets/music/love2.mp3",
  "assets/music/love3.mp3"
];

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

// chọn nhạc ngẫu nhiên
const randomIndex = Math.floor(Math.random() * musicList.length);
bgMusic.src = musicList[randomIndex];

let isPlaying = false;

// iOS: cần user interaction lần đầu
document.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.remove("off");
    }).catch(() => {});
  }
}, { once: true });

// bật / tắt bằng nút 🎵
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // không trigger click toàn trang

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




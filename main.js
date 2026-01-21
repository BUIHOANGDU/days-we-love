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
/* ===== MUSIC PLAYER LOGIC ===== */
const songs = [
  {
    title: "Hơn cả yêu",
    artist: "Đức Phúc",
    src: "assets/music/HonCaYeu.mp3"
  },
  {
    title: "Ngày đầu tiên",
    artist: "Đức Phúc",
    src: "assets/music/NgayDauTien.mp3"
  },
  {
    title: "Yes I Do",
    artist: "Đức Phúc",
    src: "assets/music/YesIdo.mp3"
  }
];


const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const titleEl = document.getElementById("songTitle");
const artistEl = document.getElementById("songArtist");

let currentIndex = Math.floor(Math.random() * songs.length);
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
}

function playSong() {
  audio.play().then(() => {
    isPlaying = true;
    playBtn.textContent = "⏸️";
  }).catch(() => {});
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

function formatTime(time) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/* iOS: tự chạy sau lần chạm đầu */
document.addEventListener("click", () => {
  if (!isPlaying) playSong();
}, { once: true });

loadSong(currentIndex);






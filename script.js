const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

const bg = document.getElementById("bg");

const scenes = [
  { text: "Город провожал слепящее небо. Облако исчезло с последней страницей главы."},
  { text: "Где-то вдалеке зажглись огни. Сама жизнь наполнилась любопытством."},
  { text: "Игра, отвага, взгляд..."},
  { text: "РАСПРОДАЖА ЕЛКИ СКИДКИ 25%"},

  // Дополнительные сцены после основной части — просто добавляйте дальше:
  // { text: "Новая сцена после финала…", bg: "images/bg_04.jpg" },
];

let sceneIndex = 0;
let isTyping = false;

const welcomeScreen = document.getElementById("welcome");
const novelScreen = document.getElementById("novel");
const textBlock = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

// Фон приветственного экрана (по желанию)
setBackground("images/bg_welcome.jpg");

startBtn.onclick = () => {
  welcomeScreen.classList.remove("active");
  novelScreen.classList.add("active");
  sceneIndex = 0;
  showScene();
};

nextBtn.onclick = () => {
  if (isTyping) return;

  sceneIndex++;
  if (sceneIndex < scenes.length) {
    showScene();
  } else {
    nextBtn.disabled = true;
    typeText("— Конец пролога. Новая глава начинается сейчас.");
  }
};

function showScene() {
  nextBtn.disabled = true;

  const scene = scenes[sceneIndex];
  setBackground(scene.bg);

  typeText(scene.text, () => {
    nextBtn.disabled = false;
  });
}

function setBackground(url) {
  // Плавная смена
  bg.style.transition = "opacity 200ms ease";
  bg.style.opacity = "0";
  setTimeout(() => {
    bg.style.backgroundImage = `url("${url}")`;
    bg.style.opacity = "1";
  }, 200);
}

function typeText(text, callback) {
  isTyping = true;
  textBlock.textContent = "";
  let i = 0;

  const interval = setInterval(() => {
    textBlock.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      isTyping = false;
      if (callback) callback();
    }
  }, 28);
}


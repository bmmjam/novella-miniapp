const tg = window.Telegram?.WebApp;
if (tg) tg.expand();

const bg = document.getElementById("bg");
const fxVideo = document.getElementById("fxVideo");

const welcomeScreen = document.getElementById("welcome");
const novelScreen = document.getElementById("novel");
const textBlock = document.getElementById("text");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const scenes = [
  { text: "Город провожал слепящее небо. Облако исчезло с последней страницей главы."},
  { text: "Где-то вдалеке зажглись огни. Снова и снова."},
  { text: "Отвага, интерес, мир..."},
  { text: "С новым годом!", bg: "images/Back.jpg"},
  { text: "Интересно получилось, правда?", bg: "images/back_Yan.jpg"},
  { text: "Стоит добавить больше фаворитов", bg: "images/back_boris.jpg"},
  { text: "Надеюсь, они мне не приснятся...", bg: "images/back_dima.jpg"},
  { text: "Картинки крутые", bg: "images/back_golod.jpg"},
  { text: "Как-то так)", fireworks: true },
];


let sceneIndex = 0;
let isTyping = false;

// Фон приветственного экрана
setBackground("images/bg_welcome.jpg");
// На welcome фейерверки выключены
setFireworks(false);

startBtn.onclick = async () => {
  // Переход на экран новеллы
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
    setFireworks(false);
  }
};

function showScene() {
  nextBtn.disabled = true;

  const scene = scenes[sceneIndex];

  // 1) фон
  setBackground(scene.bg);

  // 2) видео-фейерверки по флагу
  setFireworks(!!scene.fireworks);

  // 3) текст с печатью
  typeText(scene.text, () => {
    nextBtn.disabled = false;
  });
}

function setBackground(url) {
  bg.style.transition = "opacity 200ms ease";
  bg.style.opacity = "0";
  setTimeout(() => {
    bg.style.backgroundImage = `url("${url}")`;
    bg.style.opacity = "1";
  }, 200);
}

/**
 * Включает/выключает видео-оверлей.
 * Важно: autoplay срабатывает, т.к. muted + playsinline.
 */
function setFireworks(enabled) {
  fxVideo.classList.toggle("fx-hidden", !enabled);

  if (enabled) {
    fxVideo.currentTime = 0;
    fxVideo.play().catch(() => {
      // Если вдруг webview запретил — останется скрытым/неиграющим,
      // но в Telegram обычно работает из-за muted.
    });
  } else {
    fxVideo.pause();
  }
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


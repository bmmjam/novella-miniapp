const tg = window.Telegram.WebApp;
tg.expand();

// Текст сцен (ваша новелла)
const scenes = [
    "В ту ночь город был особенно тих. Казалось, сама судьба затаила дыхание.",
    "Часы пробили полночь. Где-то вдалеке зажглись огни, и история сделала шаг вперёд.",
    "Ты ещё не знала, что именно этот год изменит всё."
];

let sceneIndex = 0;
let isTyping = false;

const welcomeScreen = document.getElementById("welcome");
const novelScreen = document.getElementById("novel");
const textBlock = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

startBtn.onclick = () => {
    welcomeScreen.classList.remove("active");
    novelScreen.classList.add("active");
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
    typeText(scenes[sceneIndex], () => {
        nextBtn.disabled = false;
    });
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
    }, 35);
}


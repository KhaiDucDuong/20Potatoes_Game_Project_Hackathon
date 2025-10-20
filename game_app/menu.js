const startBtn = document.getElementById("start-btn");
const howtoBtn = document.getElementById("howto-btn");
const creditsBtn = document.getElementById("credits-btn");
const backBtn = document.getElementById("back-btn");
const cancelBtn = document.getElementById("cancel-btn");
const aboutBackBtn = document.getElementById("about-back-btn");

const menuScreen = document.getElementById("menu-screen");
const howtoScreen = document.getElementById("howto-screen");
const playtimeScreen = document.getElementById("playtime-screen");
const aboutScreen = document.getElementById("about-screen");

const timeButtons = document.querySelectorAll(".time-btn");
let selectedTime = 60;

// --- Menu Navigation ---
startBtn.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  playtimeScreen.classList.remove("hidden");
});

howtoBtn.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  howtoScreen.classList.remove("hidden");
});

creditsBtn.addEventListener("click", () => {
  menuScreen.classList.add("hidden");
  aboutScreen.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
  howtoScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
});

aboutBackBtn.addEventListener("click", () => {
  aboutScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  playtimeScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
});

// --- Playtime Select ---
timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    timeButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedTime = parseInt(btn.dataset.time);
    playtimeScreen.classList.add("hidden");
    startGame(selectedTime);
  });
});

function startGame(duration) {
  console.log(`🎮 Starting game for ${duration} seconds...`);
  // integrate your game logic here
}

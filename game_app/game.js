// ====== GAME STATE ======
let currentScreen = "menu";
let raindropCount = 0;
let trashCount = 0;
let gameSpeed = 2;
let spawnRate = 0.02;
let gameLoop;
let player, gameArea, objects = [];
let playerX = 400; // Center of the larger game area
let playerSpeed = 8;
let gameTime = 0;
let maxGameTime = 60; // Default 60 seconds
let gameSpeedIncrease = 0.02;
let spawnRateIncrease = 0.0005;

// ====== SCREEN MANAGEMENT ======
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });
  const targetScreen = document.getElementById(id);
  if (targetScreen) {
    targetScreen.classList.remove("hidden");
    targetScreen.classList.add("active");
  }
  currentScreen = id;
}

function startGame() {
  // Reset all game state
  raindropCount = 0;
  trashCount = 0;
  gameSpeed = 2;
  spawnRate = 0.02;
  playerX = 400; // Center of the larger game area
  objects = [];
  gameTime = 0;
  
  // Reset movement keys
  keys.left = false;
  keys.right = false;

  // Update display
  document.querySelector("#raindrops .info-value").innerText = raindropCount;
  document.querySelector("#trash .info-value").innerText = trashCount;
  document.querySelector("#time .info-value").innerText = maxGameTime + "s";
  
  // Show game screen and initialize
  showScreen("game-screen");
  
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initGame();
  }, 100);
}

// ====== RESULTS SYSTEM ======
const resultCategories = [
  {
    name: "Water Guardian",
    condition: (raindrops, trash) => raindrops >= 20 && trash <= 5,
    image: "assets/water_guardian.jpg",
    title: "🌊 Water Guardian",
    quote: "You're a true water guardian! Your dedication to collecting clean water while avoiding pollution shows your commitment to environmental protection."
  },
  {
    name: "Clean Water Champion",
    condition: (raindrops, trash) => raindrops >= 15 && trash <= 10,
    image: "assets/clean_water_champion.jpg", 
    title: "💧 Clean Water Champion",
    quote: "Excellent work! You've shown great skill in collecting clean water. Every drop you save helps protect our precious water resources."
  },
  {
    name: "Water Warrior",
    condition: (raindrops, trash) => raindrops >= 10 && trash <= 15,
    image: "assets/water_warrior.jpg",
    title: "⚔️ Water Warrior", 
    quote: "You're fighting the good fight for clean water! Your efforts to collect more raindrops than trash show your environmental awareness."
  },
  {
    name: "Learning Water Protector",
    condition: (raindrops, trash) => raindrops >= 5,
    image: "assets/learning_protector.jpg",
    title: "🌱 Learning Water Protector",
    quote: "You're on your way to becoming a water protector! Remember: every clean raindrop collected makes a difference in our fight against water pollution."
  },
  {
    name: "Pollution Fighter",
    condition: (raindrops, trash) => trash > raindrops,
    image: "assets/pollution_fighter.jpg",
    title: "🗑️ Pollution Fighter",
    quote: "You've encountered some pollution, but that's part of the challenge! Keep fighting for clean water - every effort counts in protecting our environment."
  },
  {
    name: "Water Explorer",
    condition: (raindrops, trash) => true, // Default fallback
    image: "assets/water_explorer.jpg",
    title: "🌍 Water Explorer",
    quote: "Your journey in water conservation has begun! Every step towards understanding water pollution helps us protect our planet's most precious resource."
  }
];

function getResultCategory(raindrops, trash) {
  for (let category of resultCategories) {
    if (category.condition(raindrops, trash)) {
      return category;
    }
  }
  return resultCategories[resultCategories.length - 1]; // Fallback to last category
}

function endGame() {
  const result = getResultCategory(raindropCount, trashCount);
  
  // Update the results screen
  document.getElementById("result-image").src = result.image;
  document.getElementById("result-image").alt = result.name;
  document.getElementById("result-title").innerText = result.title;
  document.getElementById("result-quote").innerText = result.quote;
  document.getElementById("final-raindrops").innerText = raindropCount;
  document.getElementById("final-trash").innerText = trashCount;
  
  showScreen("results-screen");
}

function goToMenu() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  
  // Clear all existing objects
  objects.forEach(obj => {
    if (obj && obj.remove) obj.remove();
  });
  objects = [];
  
  // Restart the game
  startGame();
}

function goToMainMenu() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  
  // Clear all existing objects
  objects.forEach(obj => {
    if (obj && obj.remove) obj.remove();
  });
  objects = [];
  
  // Redirect to main menu
  window.location.href = 'index.html';
}

// ====== GAME INITIALIZATION ======
function initGame() {
  player = document.getElementById("player");
  gameArea = document.getElementById("game-area");
  
  // Safety check
  if (!player || !gameArea) {
    console.error("Game elements not found!");
    return;
  }
  
  // Clear any existing objects
  objects.forEach(obj => {
    if (obj && obj.remove) obj.remove();
  });
  objects = [];
  
  // Reset player position (centered)
  player.style.left = "50%";
  player.style.transform = "translateX(-50%)";
  
  // Clear any existing game loop
  if (gameLoop) {
    clearInterval(gameLoop);
  }
  
  // Start game loop
  gameLoop = setInterval(updateGame, 16); // ~60 FPS
}

// ====== PLAYER MOVEMENT ======
let keys = {
  left: false,
  right: false
};

function movePlayer(e) {
  if (currentScreen !== "game-screen") return;
  
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    keys.left = true;
    keys.right = false;
  }
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    keys.right = true;
    keys.left = false;
  }
}

function stopPlayer(e) {
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    keys.left = false;
  }
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    keys.right = false;
  }
}

function updatePlayerMovement() {
  if (keys.left && playerX > 0) {
    playerX -= playerSpeed;
  }
  if (keys.right && playerX < 760) {
    playerX += playerSpeed;
  }
  
  player.style.left = playerX + "px";
  player.style.transform = "translateX(-50%)";
}

// ====== OBJECT SPAWNING ======
function spawnObject() {
  if (Math.random() < spawnRate) {
    const object = document.createElement("div");
    object.className = "object";
    
    // Randomly choose between trash and raindrop
    if (Math.random() < 0.3) {
      object.classList.add("trash");
    } else {
      object.classList.add("raindrop");
    }
    
    // Set object speed to current game speed for consistency
    object.speed = gameSpeed;
    
    // Random horizontal position (for larger game area)
    object.style.left = Math.random() * 760 + "px";
    object.style.top = "-40px";
    
    gameArea.appendChild(object);
    objects.push(object);
  }
}

// ====== OBJECT MOVEMENT ======
function moveObjects() {
  objects.forEach((object, index) => {
    const currentTop = parseInt(object.style.top);
    // Use the object's individual speed for consistent movement
    const objectSpeed = object.speed || gameSpeed;
    const newTop = currentTop + objectSpeed;
    object.style.top = newTop + "px";
    
    // Remove objects that have fallen off screen (for larger game area)
    if (newTop > 800) {
      object.remove();
      objects.splice(index, 1);
    }
  });
}

// ====== COLLISION DETECTION ======
function checkCollisions() {
  if (!player || !gameArea) return;
  
  const playerRect = player.getBoundingClientRect();
  
  objects.forEach((object, index) => {
    if (!object || !object.getBoundingClientRect) return;
    
    const objectRect = object.getBoundingClientRect();
    
    // Check if player and object overlap
    if (playerRect.left < objectRect.right &&
        playerRect.right > objectRect.left &&
        playerRect.top < objectRect.bottom &&
        playerRect.bottom > objectRect.top) {
      
      if (object.classList.contains("trash")) {
        // Hit trash - count it
        trashCount++;
        document.querySelector("#trash .info-value").innerText = trashCount;
      } else if (object.classList.contains("raindrop")) {
        // Hit raindrop - count it
        raindropCount++;
        document.querySelector("#raindrops .info-value").innerText = raindropCount;
      }
      
      // Remove the object
      object.remove();
      objects.splice(index, 1);
    }
  });
}

// ====== GAME LOOP ======
function updateGame() {
  updatePlayerMovement();
  spawnObject();
  moveObjects();
  checkCollisions();
  
  // Update game time
  gameTime += 16; // 16ms per frame
  
  // Update time display
  const remainingTime = Math.max(0, Math.ceil((maxGameTime * 1000 - gameTime) / 1000));
  document.querySelector("#time .info-value").innerText = remainingTime + "s";
  
  // Check if time is up
  if (gameTime >= maxGameTime * 1000) {
    clearInterval(gameLoop);
    endGame();
    return;
  }
  
  // Increase difficulty based on total collisions
  const totalCollisions = raindropCount + trashCount;
  if (totalCollisions > 0 && totalCollisions % 10 === 0) {
    gameSpeed += gameSpeedIncrease;
    spawnRate += spawnRateIncrease;
    
    // Update speed of all existing objects to match new game speed
    objects.forEach(object => {
      object.speed = gameSpeed;
    });
  }
}

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
  // Get time parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const timeParam = urlParams.get('time');
  
  if (timeParam) {
    maxGameTime = parseInt(timeParam);
    // Auto-start the game
    setTimeout(() => {
      startGame();
    }, 500);
  } else {
    // If no time parameter, start with default settings
    setTimeout(() => {
      startGame();
    }, 1000);
  }
});

// ====== EVENT LISTENERS ======
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

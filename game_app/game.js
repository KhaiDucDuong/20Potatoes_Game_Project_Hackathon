// ====== GAME STATE ======
let currentScreen = "menu";
let score = 0;
let lives = 3;
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
  score = 0;
  lives = 3;
  gameSpeed = 2;
  spawnRate = 0.02;
  playerX = 400; // Center of the larger game area
  objects = [];
  gameTime = 0;
  
  // Reset movement keys
  keys.left = false;
  keys.right = false;

  // Update display
  document.querySelector("#score .info-value").innerText = score;
  document.querySelector("#lives .info-value").innerText = lives;
  document.querySelector("#time .info-value").innerText = maxGameTime + "s";
  
  // Show game screen and initialize
  showScreen("game-screen");
  
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initGame();
  }, 100);
}

function endGame() {
  document.getElementById("final-score").innerText = score;
  showScreen("gameover-screen");
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
        // Hit trash - lose life
        lives--;
        document.querySelector("#lives .info-value").innerText = lives;
        
        if (lives <= 0) {
          clearInterval(gameLoop);
          endGame();
          return;
        }
      } else if (object.classList.contains("raindrop")) {
        // Hit raindrop - gain score
        score += 10;
        document.querySelector("#score .info-value").innerText = score;
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
  
  // Increase difficulty over time
  if (score > 0 && score % 100 === 0) {
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

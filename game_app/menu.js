// ====== MENU INTERACTIONS ======
document.addEventListener('DOMContentLoaded', function() {
  // Get all buttons
  const startBtn = document.getElementById('start-btn');
  const howtoBtn = document.getElementById('howto-btn');
  const creditsBtn = document.getElementById('credits-btn');
  const backBtn = document.getElementById('back-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const aboutBackBtn = document.getElementById('about-back-btn');
  
  // Get all screens
  const menuScreen = document.getElementById('menu-screen');
  const howtoScreen = document.getElementById('howto-screen');
  const playtimeScreen = document.getElementById('playtime-screen');
  const aboutScreen = document.getElementById('about-screen');
  
  // Get time buttons
  const timeButtons = document.querySelectorAll('.time-btn');
  
  // ====== SCREEN MANAGEMENT ======
  function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
      screen.classList.add('hidden');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.remove('hidden');
      targetScreen.classList.add('active');
    }
  }
  
  // ====== EVENT LISTENERS ======
  
  // Start button - go to playtime selection
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      showScreen('playtime-screen');
    });
  }
  
  // How to play button
  if (howtoBtn) {
    howtoBtn.addEventListener('click', () => {
      showScreen('howto-screen');
    });
  }
  
  // Credits/About button
  if (creditsBtn) {
    creditsBtn.addEventListener('click', () => {
      showScreen('about-screen');
    });
  }
  
  // Back button (from how to play)
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      showScreen('menu-screen');
    });
  }
  
  // Cancel button (from playtime selection)
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      showScreen('menu-screen');
    });
  }
  
  // About back button
  if (aboutBackBtn) {
    aboutBackBtn.addEventListener('click', () => {
      showScreen('menu-screen');
    });
  }
  
  // Time selection buttons
  timeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const time = button.getAttribute('data-time');
      
      // Remove selected class from all buttons
      timeButtons.forEach(btn => btn.classList.remove('selected'));
      // Add selected class to clicked button
      button.classList.add('selected');
      
      // Start game with selected time
      setTimeout(() => {
        window.location.href = `game.html?time=${time}`;
      }, 300);
    });
  });
  
  // ====== KEYBOARD NAVIGATION ======
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Go back to menu from any screen
      const currentScreen = document.querySelector('.screen.active');
      if (currentScreen && currentScreen.id !== 'menu-screen') {
        showScreen('menu-screen');
      }
    }
  });
});
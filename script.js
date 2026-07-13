// ⏔⏔⏔ ꒰ game mode ꒱ ⏔⏔⏔
const computerMode = document.getElementById('computer-play');
const friendMode = document.getElementById('friend-play');

// ⏔⏔⏔ ꒰ html elements ꒱ ⏔⏔⏔
const startPanel = document.getElementById('start-panel');
const difficultyPanel = document.getElementById('difficulty-panel');
const gamePanel = document.getElementById('game-panel');

// ⏔⏔⏔ ꒰ back button ꒱ ⏔⏔⏔
const backButton = document.getElementById('exit');

backButton.addEventListener('click', () => {
  gamePanel.classList.add('hide');
  startPanel.classList.remove('hide');
});

// ⏔⏔⏔ ꒰  computer mode ꒱ ⏔⏔⏔
computerMode.addEventListener('click', () => {
  startPanel.classList.add('hide');
  difficultyPanel.classList.remove('hide');
});

// selecting difficulty
let difficultyLevel = 1;

const easyDiff = document.getElementById('easy');
const mediumDiff = document.getElementById('medium');
const hardDiff = document.getElementById('hard');

document.querySelectorAll('.difficulty')
  .forEach((difficultyButton) => {
    difficultyButton.addEventListener('click', () => {
      // hide difficulty panel and show game panel
      difficultyPanel.classList.add('hide');
      gamePanel.classList.remove('hide');
      
      difficultyLevel = difficultyButton.dataset.difficultyId;

      playComputerMode();
    });
  });
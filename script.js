// game mode
const computerMode = document.getElementById('computer-play');
const friendMode = document.getElementById('friend-play');

// html elements
const startPanel = document.getElementById('start-panel');
const difficultyPanel = document.getElementById('difficulty-panel');
const gamePanel = document.getElementById('game-panel');

// selecting difficulty (computer mode only)
const easyDiff = document.getElementById('easy');
const mediumDiff = document.getElementById('medium');
const hardDiff = document.getElementById('hard');

// back button
const backButton = document.getElementById('exit');

backButton.addEventListener('click', () => {
  gamePanel.classList.add('hide');
  startPanel.classList.remove('hide');
});

computerMode.addEventListener('click', () => {
  showDifficultyPanel();
});

// computer variables
let difficultyLevel = '';

document.querySelectorAll('.difficulty')
  .forEach((difficultyButton) => {
    difficultyButton.addEventListener('click', () => {
      difficultyPanel.classList.add('hide');
      gamePanel.classList.remove('hide');
      
      difficultyLevel = difficultyButton.dataset.difficultyId;
      
      playComputerMode(difficulty);
    });
  });

friendMode.addEventListener('click', () => {
  playFriendMode();
});

function showDifficultyPanel() {
  startPanel.classList.add('hide');
  difficultyPanel.classList.remove('hide');
}

// computer mode
function playComputerMode(difficulty) {
  showDifficultyPanel.classList.add('hide');
  gamePanel.classList.remove('hide');

  document.querySelectorAll('.cell')
    .forEach((box) => {
      box.addEventListener('click', () => {
        const boxClicked = box.dataset.box;
      });
    });
}
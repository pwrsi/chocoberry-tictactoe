const computerMode = document.getElementById('computer-play');
const friendMode = document.getElementById('friend-play');

// html elements
const startDiv = document.getElementById('start');
const chooseTurnDiv = document.getElementById('choose-turn');
const tictactoeDiv = document.getElementById('tictactoe');

// pick turn (computer mode only)
const chocolate = document.getElementById('chocolate-move');
const strawberry = document.getElementById('strawberry-move');

// back button
const backButton = document.getElementById('exit');

backButton.addEventListener('click', () => {
  tictactoeDiv.classList.add('hide');
  startDiv.classList.remove('hide');
});

computerMode.addEventListener('click', () => {
  showTurnOptions();
});

friendMode.addEventListener('click', () => {
  playFriendMode();
});

function showTurnOptions() {
  startDiv.classList.add('hide');
  chooseTurnDiv.classList.remove('hide');
}

chocolate.addEventListener('click', () => {
  playComputerMode('chocolate');
});

strawberry.addEventListener('click', () => {
  playComputerMode('strawberry');
});

// computer mode
function playComputerMode(turn) {
  chooseTurnDiv.classList.add('hide');
  tictactoeDiv.classList.remove('hide');
}
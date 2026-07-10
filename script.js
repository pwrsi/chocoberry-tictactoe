const computerMode = document.getElementById('computer-play');
const friendMode = document.getElementById('friend-play');

// html elements
const startDiv = document.getElementById('start');
const chooseMoveDiv = document.getElementById('choose-move');
const tictactoeDiv = document.getElementById('tictactoe');

// pick Move (computer mode only)
const chocolate = document.getElementById('chocolate-move');
const strawberry = document.getElementById('strawberry-move');

// back button
const backButton = document.getElementById('exit');

backButton.addEventListener('click', () => {
  tictactoeDiv.classList.add('hide');
  startDiv.classList.remove('hide');
});

computerMode.addEventListener('click', () => {
  showMoveOptions();
});

friendMode.addEventListener('click', () => {
  playFriendMode();
});

function showMoveOptions() {
  startDiv.classList.add('hide');
  chooseMoveDiv.classList.remove('hide');
}

chocolate.addEventListener('click', () => {
  playComputerMode('chocolate');
});

strawberry.addEventListener('click', () => {
  playComputerMode('strawberry');
});

// computer mode
function playComputerMode(move) {
  chooseMoveDiv.classList.add('hide');
  tictactoeDiv.classList.remove('hide');

  let computerMove = '';
  let playerMove = '';

  if (move === 'chocolate') {
    playerMove = 'chocolate';
    computerMove = 'strawberry';
  } else if (move === 'strawberry') {
    playerMove = 'strawberry';
    computerMove = 'chocolate';
  }

  document.querySelectorAll('.cell')
    .forEach((box) => {
      box.addEventListener('click', () => {
        const boxClicked = box.dataset.box;
      });
    });
}
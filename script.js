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

  restartGame();
  resetScore();
});

// ⏔⏔⏔ ꒰  computer mode ꒱ ⏔⏔⏔
computerMode.addEventListener('click', () => {
  startPanel.classList.add('hide');
  difficultyPanel.classList.remove('hide');
});

// boxes statuses
let boxes = [
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}, 
  {taken: ''}
];

// selecting difficulty
let difficultyLevel = '';

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

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
  
// scores
const score = {
  x: 0,
  tie: 0,
  o: 0
}

const xWins = document.getElementById('x-wins');
const tie = document.getElementById('tie');
const oWins = document.getElementById('o-wins');

function displayScore() {
  if (gameResult) {
    if (gameResult === 'player') {
      score.x++;
    } else if (gameResult === 'computer') {
      score.o++;
    } else if (gameResult === 'tie') {
      score.tie++;
    }
  }

  xWins.innerHTML = score.x;
  tie.innerHTML = score.tie;
  oWins.innerHTML = score.o;
}
  
// play computer mode
function playComputerMode() {
  turnIndicator.innerHTML = "Player's"

  difficultyPanel.classList.add('hide');
  gamePanel.classList.remove('hide');
}

// game indicator
let boxTakenCount = 0;

// turn indicator
const turnIndicator = document.getElementById('turn');

// turn flag
let playersTurn = true;

// player's move
document.querySelectorAll('.box')
  .forEach((box) => {
    box.addEventListener('click', playerMove);
  });

function playerMove(event) {
  const box = event.currentTarget;
  const boxId = box.dataset.box;

  if (boxTakenCount < 9 && playersTurn) {
    const boxClicked = boxes[boxId - 1];

    if (boxClicked.taken === '') {
      boxClicked.taken = 'player';
      
      playersTurn = false;
      
      document.querySelector(`.js-box-${boxId}`)
        .innerHTML = '<p>x</p>';

      boxTakenCount++;
    }

    checkResult('player');
  }
}

// computer's move
function generateRandomNum() {
  return Math.ceil(Math.random() * 9);
}

function computerMove(difficultyLevel) {
  turnIndicator.innerHTML = "Computer's"

  if (difficultyLevel == 1) {
    let randomNum = generateRandomNum();

    while (boxes[randomNum - 1].taken !== '') {
      randomNum = generateRandomNum();
    }

    if (boxes[randomNum - 1].taken === '') {
      boxes[randomNum - 1].taken = 'computer';

      setTimeout(() => {
        document.querySelector(`.js-box-${randomNum}`)
          .innerHTML = '<p>o</p>';

          boxTakenCount++;
          playersTurn = true;
          checkResult('computer');
          turnIndicator.innerHTML = "Player's"
      }, 1000);

      const computerMoves = [];
    
      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].taken === 'computer') {
          computerMoves.push(i);
        }
      }

      console.log(computerMoves);
    }
  } else if (difficultyLevel == 2) {
    // check if computer can win
    

    // check if player can win
  } else if (difficultyLevel == 3) {

  }
}

// game result
let gameResult = '';

function checkResult(player) {
  for (let i = 0; i < winPatterns.length; i++) {
    const arr = winPatterns[i];

    if (boxes[arr[0]].taken === player && boxes[arr[1]].taken === player && boxes[arr[2]].taken === player) {
      gameResult = player;
      displayScore();
      disableGame();
      return;
    }
  }

  if (!playersTurn && boxTakenCount <= 8 && !gameResult) {
    computerMove(difficultyLevel);
  }

  if (boxTakenCount == 9) {
    gameResult = 'tie';
    displayScore();
  }
}

function disableGame() {
  document.querySelectorAll('.box')
    .forEach((box) => {
      box.removeEventListener('click', playerMove);
    });
}

// restart game
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartGame);

function restartGame() {
  document.querySelectorAll('.box')
    .forEach((box) => {
      box.innerHTML = '';
    });

  boxes = [
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}, 
    {taken: ''}
  ];

  boxTakenCount = 0;
  gameResult = '';

  playersTurn = true;

  document.querySelectorAll('.box')
    .forEach((box) => {
      box.addEventListener('click', playerMove);
    });
}

function resetScore() {
  score.x = 0;
  score.tie = 0;
  score.o = 0;

  displayScore();
}

displayScore();
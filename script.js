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
  turnIndicator.innerHTML = "Player's turn"

  difficultyPanel.classList.add('hide');
  gamePanel.classList.remove('hide');
}

// game indicator
let boxTakenCount = 0;

// turn indicator
const turnIndicator = document.getElementById('turn-indicator');

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
function generateRandomMove() {
  let randomNum = Math.ceil(Math.random() * 9);

  while (boxes[randomNum - 1].taken !== '') {
    randomNum = Math.ceil(Math.random() * 9);
  }

  displayComputerMove(randomNum);
}

function displayComputerMove(number) {
  if (boxes[number - 1].taken === '') {
    boxes[number - 1].taken = 'computer';

    setTimeout(() => {
      document.querySelector(`.js-box-${number}`)
        .innerHTML = '<p>o</p>';
  
        boxTakenCount++;
        playersTurn = true;
        checkResult('computer');
        turnIndicator.innerHTML = "Player's turn"
    }, 1000);
  }
}

function computerMove(difficultyLevel) {
  turnIndicator.innerHTML = "Computer's turn."

  if (difficultyLevel == 1) {
    generateRandomMove();
  } else if (difficultyLevel == 2) {
    let computerTarget;
    let playerTarget;

    for (let i = 0; i < winPatterns.length; i++) {
      const arr = winPatterns[i];

      let emptyBox;
      let computerCounter = 0;
      let playerCounter = 0;
      
      for (let j = 0; j < arr.length; j++) {
        if (boxes[arr[j]].taken === 'computer') {
          console.log(arr[j] + ' -> computer');
          computerCounter++;
        } else if (boxes[arr[j]].taken === 'player') {
          console.log(arr[j] + ' -> player');
          playerCounter++;
        } else if (boxes[arr[j]].taken === '') {
          emptyBox = arr[j] + 1;
          console.log(emptyBox + ' -> empty');
        }
      }

      if (computerCounter == 2 && emptyBox) {
        computerTarget = emptyBox;
        console.log('oh shoot im about to win, i must place my move on box ' +  )
      } else if (playerCounter == 2 && emptyBox) {
        playerTarget = emptyBox;
        console
      }
    }
    
    if (computerTarget) {
      displayComputerMove(computerTarget);
    } else if (playerTarget) {
      displayComputerMove(playerTarget);
    } else {
      generateRandomMove();
    }
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
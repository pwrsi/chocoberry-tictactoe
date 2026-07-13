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
  {taken: ''}, 
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

// scores
const score = {
  x: 0,
  tie: 0,
  o: 5
}

const xWins = document.getElementById('x-wins');
const tie = document.getElementById('tie');
const oWins = document.getElementById('o-wins');

function displayScore() {
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
    box.addEventListener('click', () => {
      const boxId = box.dataset.box;

      if (boxTakenCount < 9 && playersTurn) {
        const boxClicked = boxes[boxId - 1];

        if (boxClicked.taken === '') {
          boxClicked.taken = 'player';
          
          playersTurn = false;
          
          document.querySelector(`.js-box-${boxId}`)
            .innerHTML = 'x';

          boxTakenCount++;
        }

        checkResult();
        
        if (!playersTurn && boxTakenCount <= 8) {
          computerMove(difficultyLevel);
        }
      }
    });
  });

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
          .innerHTML = 'o';

          boxTakenCount++;
          playersTurn = true;
      }, 1000);
    }
  }
}

// game result
let gameResult = '';

function checkResult() {
  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  let winner = '';

  if (winner === 'x') {
    score.x++;
    displayScore();
  } else if (winner === 'o') {
    score.o++;
    displayScore();
  }

  if (boxTakenCount == 9) {
    gameResult = 'tie';
  }
}
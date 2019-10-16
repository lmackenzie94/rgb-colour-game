// namespace
const game = {};

let numOfSquares = 6;
let colors = [];
let pickedColor;
let bodyBackgroundColor = '#232323';

const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');

game.init = function() {
  // mode buttons event listeners
  game.setupModeButtons();
  // click listeners for squares
  game.setupSquares();
  game.reset();
};

game.setupModeButtons = function() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'Easy' ? (numOfSquares = 3) : (numOfSquares = 6);
      game.reset();
    });
  }
};

game.setupSquares = function() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
      // NOTE: arrow function won't work here as 'this' will bind to the window by default
      // console.log(this)
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
        game.changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = bodyBackgroundColor;
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
};

game.reset = function() {
  colors = game.generateRandomColors(numOfSquares);
  pickedColor = game.pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
};

resetButton.addEventListener('click', function() {
  game.reset();
});

game.changeColors = function(color) {
  // loop through all sqaures
  // change each color to match given color
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
};

game.pickColor = function() {
  const rand = Math.floor(Math.random() * colors.length);
  return colors[rand];
};

game.generateRandomColors = function(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(game.randomColor());
  }
  return arr;
};

game.randomColor = function() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

game.init();

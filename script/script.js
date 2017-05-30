var numOfSquares = 6;
var colors = [];
var winningColor;

// Select all tags with the class "square", which will be the rgb squares
var squares = document.querySelectorAll(".square");

// Select the tag with the id "colorDisplay" which will be shown at the top of the page inside the h1. Specifies the rgb that user has to guess
var colorDisplay = document.getElementById("colorDisplay");

// Will be part of the menu bar; displays to user whether they guessed correctly or not
var messageDisplay = document.querySelector("#message");

// Select the New Colors button and reset the game
var resetButton = document.querySelector("#reset");

// Select the h1 in order to change the color when user clicks the correct color
var h1 = document.querySelector("h1");

// Select all buttons to determine the mode and initialize the arrays, etc
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();

  // Set up event listeners for reset button
  resetButton.addEventListener("click", function() {
    reset();
  });
}

function setupModeButtons() {
  // Set up mode buttons event listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {

      // Remove the highlighted selected mode from all mode buttons
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove("selectedMode");
      }
      this.classList.add("selectedMode");

      // Sets the number of squares based on current selected mode
      this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;

      reset();
    });
  }
}

function setupSquares() {
  // Set up squares event listeners
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab color of square that user clicked on
      var clickedColor = this.style.backgroundColor;

      // compare color to winningColor
      if (clickedColor === winningColor) {
        messageDisplay.textContent = "Correct!";
        // Invokes the function that changes color of all squares to winning color
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        // Fades away the square that was guessed incorrectly
        this.style.backgroundColor = "#232323";
        // Shows on the menu bar to user when guessed incorrectly
        messageDisplay.textContent = "Try Again!";
      }
    });
  }
}

function reset() {
  // Gnerate all new colors
  colors = generateRandomColors(numOfSquares);

  // Pick new random color as the winning color
  winningColor = chooseRandomColor();

  // Shows the specific rgb values. User has to guess which rgb values is associated with which color
  colorDisplay.textContent = winningColor;

  // Change background color of h1 back to black
  h1.style.backgroundColor = "steelblue";

  // Change the reset button back to "New Color" if it is "Play Again?"
  resetButton.textContent = "New Colors";

  // Removes the "Correct!" from user display
  messageDisplay.textContent = "";

  // Change the colors of the squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // changes all squares to be the same color as the correct color, which is passed through as an argument
    squares[i].style.backgroundColor = color;
  }
}

function chooseRandomColor() {
  // Math.random will generate a random number between 0 and 1, multiply by length of colors array will give a number between 0 and up to 6, but never 6.
  // Using Math.floor will get rid of the decimal, giving a whole number between 0 and 5
  var random = Math.floor(Math.random() * colors.length);

  // Returns the item stored in a random index of the colors array. This color[random] is set as the winning color
  return colors[random];
}

function generateRandomColors(arrSize) {
  // Make an array
  var arr = [];

  for (var i = 0; i < arrSize; i++) {
    // Get random color and push into array
    arr.push(randomColor());
  }

  // Return that array
  return arr;
}

function randomColor() {
  // Math.random() * 256 will give a number from 0 up to 256, but not 256. Math.floor rounds it down to 0 to 255

  // Pick a "red" from 0 to 255.
  var r = Math.floor(Math.random() * 256);
  // Pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // Pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);

  // return the rgb value
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

let passcode = '';

function addPasscode(number) {
    if (passcode.length < 6) { // Check if passcode length is less than 6
        passcode += number;
        updatePasscodeInput(); // Update passcode input
    }
}

function clearPasscode() {
    passcode = '';
    updatePasscodeInput(); // Update passcode input
}

function checkPasscodeAndRedirect() {
    if (passcode === '147369' && score === 6 && checkWin('X')) {
        // Redirect to the next page immediately
        window.location.href = 'Passcode.html';
    } else if (passcode.length === 6) {
        passcode = ''; // Clear passcode if it's incorrect and has reached 6 digits
        updatePasscodeInput(); // Update passcode input to clear the displayed passcode
        document.querySelector('.passcode-input').textContent = 'WRONG MY LOVE';
    }
}


function updatePasscodeInput() {
    document.querySelector('.passcode-input').textContent = 'Passcode: ' + passcode;
}

//TTT

let currentPlayer = 'X'; // Player X starts the game
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function makeMove(row, col) {
    if (board[row][col] === '') { // Check if the cell is empty
        if (currentPlayer === 'X') {
            board[row][col] = 'X'; // Set the cell value to the current player (player X)
            renderBoard(); // Update the game board
            if (checkWin('X')) {
                document.querySelector('.TTT-input').textContent = 'You did it, sayang!!!!';
                resetGame();
                return;
            }
            if (checkDraw()) {
                document.querySelector('.TTT-input').textContent = 'Draw!';
                resetGame();
                return;
            }
            currentPlayer = 'O'; // Switch to AI's turn
            setTimeout(aiMove, 500); // Introduce a delay before AI makes a move
        }
    }
}



function aiMove() {
    // Implement AI logic here
    // Check if AI can win in the next move
    let winningMove = findWinningMove('O');
    if (winningMove) {
        board[winningMove.row][winningMove.col] = 'O';
    } else {
        // Check if player can win in the next move and block them
        let blockingMove = findWinningMove('X');
        if (blockingMove) {
            board[blockingMove.row][blockingMove.col] = 'O';
        } else {
            // If no winning or blocking move, make a random move
            let emptyCells = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        emptyCells.push({ row: i, col: j });
                    }
                }
            }
            if (emptyCells.length > 0) {
                let randomIndex = Math.floor(Math.random() * emptyCells.length);
                let randomCell = emptyCells[randomIndex];
                board[randomCell.row][randomCell.col] = 'O';
            }
        }
    }
    renderBoard(); // Update the game board after AI's move
    if (checkWin('O')) {
        document.querySelector('.TTT-input').textContent = 'You defeat!';
        resetGame();
        return;
    }
    if (checkDraw()) {
        document.querySelector('.TTT-input').textContent = 'Draw!';
        resetGame();
        return;
    }
    currentPlayer = 'X'; // Switch to player's turn
}

function findWinningMove(player) {
    // Check rows, columns, and diagonals for potential winning moves
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                // Simulate placing the player's symbol in the empty cell
                board[i][j] = player;
                // Check if the simulated move results in a win
                if (checkWin(player)) {
                    // Reset the board and return the winning move
                    board[i][j] = '';
                    return { row: i, col: j };
                }
                // Undo the simulated move
                board[i][j] = '';
            }
        }
    }
    // If no winning move found, return null
    return null;
}

function renderBoard() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        let row = Math.floor(index / 3);
        let col = index % 3;
        cell.textContent = board[row][col];
    });
}

function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }

    return false;
}



function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false; // If there is an empty cell, game is not draw
            }
        }
    }
    return true; // All cells are filled, game is draw
}

// Reset the Tic Tac Toe game board
function resetGame() {
  // Add an event listener to the reset button
document.querySelector('.reset-button').addEventListener('click', function() {
    // Reset the Tic Tac Toe game board
    currentPlayer = 'X'; // Reset the current player to 'X'
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]; // Reset the game board array
    renderBoard(); // Render the updated game board
});
}
renderBoard();




//CONNECT 4
// script.js
const quizData = [
    {
      question: " 2 + 2?",
      choices: ["3", "4", "5", "6"],
      answer: 1 // Index of the correct answer in the choices array
    },
    {
      question: " 5 * 6?",
      choices: ["25", "30", "35", "40"],
      answer: 1
    },
    {
      question: " 10 / 2?",
      choices: ["3", "4", "5", "6"],
      answer: 2
    },
    {
      question: " 8 - 3?",
      choices: ["3", "4", "5", "6"],
      answer: 2
    },
    {
      question: " 12 + 8?",
      choices: ["18", "20", "22", "24"],
      answer: 1
    },
    {
      question: " 15 - 7?",
      choices: ["6", "7", "8", "10"],
      answer: 2
    }

  ];
  
  let currentQuestion = 0;
  let timeLeft = 6;
  let timer;
  let score = 0;
  
  function displayQuestion() {
    if (currentQuestion < quizData.length) {
      document.getElementById("question").innerHTML = quizData[currentQuestion].question;
      document.getElementById("choices").style.display = "block";
      document.querySelectorAll(".choice").forEach((btn, index) => {
        btn.innerHTML = quizData[currentQuestion].choices[index];
      });
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  function answerQuestion(choiceIndex) {
    if (choiceIndex === quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    clearInterval(timer); // Clear the timer before moving to the next question
    timeLeft = 6;
    displayQuestion();
  }
  
  function startTimer() {
    document.getElementById("time-left").innerHTML = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").innerHTML = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        answerQuestion(-1); // Auto answer with a wrong choice if time runs out
      }
    }, 1000);
  }

  function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    displayQuestion();
  }
  
  
function endQuiz() {
  let message;
  if (score === quizData.length) {
    message = "U DID IT SAYANGG!!";
    document.getElementById("repeat-button").style.display = "none"; // Hide the repeat button
  } else {
    message = "Your score: " + score + "/" + quizData.length ;

    document.getElementById("repeat-button").style.display = "block"; // Show the repeat button
  }
  document.getElementById("end-message").innerHTML = message; // Display the message
  document.getElementById("end-message").style.display = "block"; // Show the message
  document.getElementById("question").style.display = "none"; // Hide the question
  document.getElementById("score").style.display = "none"; // Hide the score
  document.getElementById("start-button").style.display = "none"; // Hide the start button

document.getElementById("happy-image").style.display = "none";
document.getElementById("sad-image").style.display = "none";
}

function endQuiz() {
    document.getElementById("question").style.display = "none"; // Hide the question
    document.getElementById("score").style.display = "none"; // Hide the score
    document.getElementById("start-button").style.display = "none"; // Hide the start button

    if (score === quizData.length) {
        document.getElementById("MQ-container2").style.display = "block"; // Display the happy image
        document.getElementById("happy-image").style.display = "block"; // Display the happy image
        document.getElementById("end-message").innerHTML = "U DID IT SAYANGG!!"; // Display message
        document.getElementById("repeat-button").style.display = "none"; // Hide the repeat button
    } else {
        document.getElementById("MQ-container2").style.display = "block"; // Display the happy image
        document.getElementById("sad-image").style.display = "block"; // Display the sad image
        document.getElementById("end-message").innerHTML = "Your score: " + score + "/" + quizData.length; // Display message
        document.getElementById("repeat-button").style.display = "block"; // Show the repeat button
    }
    document.getElementById("end-message").style.display = "block"; // Show the message
    document.querySelectorAll(".choice").forEach((btn) => {
        btn.style.display = "none";
    });

}

function repeatQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("end-message").style.display = "none"; // Hide the end message
    document.getElementById("start-button").style.display = "none"; // Hide the start button
    document.getElementById("question").style.display = "block"; // Show the question
    document.getElementById("repeat-button").style.display = "none"; // Hide the repeat button
    document.getElementById("score").style.display = "block"; // Show the score
    document.querySelectorAll(".choice").forEach((btn) => {
        btn.style.display = "block"; // Show each choice button
    });

    document.getElementById("happy-image").style.display = "none";
    document.getElementById("sad-image").style.display = "none";

    displayQuestion(); // Start the quiz again
}


function navigateToPage(page) {
    window.location.href = page; // Redirect to the specified page
}
  
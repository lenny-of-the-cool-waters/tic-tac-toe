// Object to control UI
let UI = {
    // Start game
    // Fill a box
    fillBox: function(cell, icon) { 
        if(!cell.textContent) {
            cell.textContent = icon;
        } else {
            throw `Cell already filled`;
        }
     },
    // Alerts for wins or draws
    alertScore: function(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-center`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const board = document.querySelector(".game-container");
        container.insertBefore(div, board);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
};

// Gameboard object
function GameBoard() {
    // gameboard array
    let board = [...Array(9)];
    this.updateBoard = function(index, icon) {
        board[index] = icon;
        console.log(board);
    }
    this.checkScore = function(plays) {
        // Check for win
        const winConditions = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        // Check for draw
        const fullBoard = (current) => current == "filled";
        if(GameBoard.board.every(fullBoard)) {
            UI.alertScore("It's a draw!", "success");
        } 
    }
};

// Player factory or object
function Player(name,icon,plays) {
    this.name = name;
    this.icon = icon;
    this.plays = plays;
}

// Factory function to create single round object
function GamePlay() {
    // Create players
    let player1 = new Player("One", "x", []);
    let player2 = new Player("Two", "o", []);
    // Create board
    let board = new GameBoard();
    // Current player
    let currentPlayer = player1
    // Update current player values
    function updateCurrent(index) {
        currentPlayer.plays.push(index);
    };
    // Change the current player
    function changePlayer() {
        currentPlayer == player1? currentPlayer = player2 : currentPlayer = player1;        
    };
   
     // Controlling what happens when a person plays
     this.play =  function(e) {
        let cell = e.target;
        let cellIndex = parseInt(cell.getAttribute("data-cell-index"));
        UI.fillBox(cell, currentPlayer.icon);
        board.updateBoard(cellIndex, currentPlayer.icon); 
        updateCurrent(cellIndex);
        /* checkScore(currentPlayer.plays); */
        changePlayer();      
    }
    // Restart game
};

/* Events */
// Start game
let round = new GamePlay();
// Clicking a box
let cells = Array.from(document.querySelectorAll(".cell"));
cells.forEach(cell => cell.addEventListener("click", round.play))




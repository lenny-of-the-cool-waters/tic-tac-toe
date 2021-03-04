// Object to control UI
let UI = {
    // Fill a box
    fillBox: function(cell, icon) { 
        if(cell.textContent=="x" || cell.textContent=="o") {
            this.gameAlert(`Cell already filled`, "danger");
            throw `Cell already filled`;
        } else {
            cell.textContent = icon;
        }
     },
    // Alerts for wins/draws or errors 
    gameAlert: function(message, className) {
        let alertBtn = document.querySelector(".alert-btn");
        alertBtn.textContent = message;
        alertBtn.classList = `btn btn-${className} alert-btn`;
    },
    // Clear all cells
    clearCells: function() {
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            console.log("clearing");
            cell.textContent = ""
        });
    }
};

// GameBoard constructor
function GameBoard() {
    /* this.boardArray = [...Array(9)]; */
    this.boardArray = [...Array(9)];
    this.updateBoard = function(index, icon) {
        this.boardArray[index] = icon;
    }
    this.clearBoard = function() {
        this.boardArray = [...Array(9)];
    }
};

// Player constructor 
function Player(name,icon,plays) {
    this.name = name;
    this.icon = icon;
    this.plays = plays;
    this.start = function() { this.plays = []; };
}

// Factory function to create single round object
function GamePlay() {
    // Create players
    let player1 = new Player("one", "x", []);
    let player2 = new Player("two", "o", []);
    let ongoing = true;
    // Create board
    let board = new GameBoard();
    // Current player
    let currentPlayer = player1
    UI.gameAlert(`It is player ${currentPlayer.name}'s turn`, "primary");
    // Update current player values
    function updateCurrent(index) {
        currentPlayer.plays.push(index);
    };
    // Change the current player
    function changePlayer() {
        if(ongoing) {
            currentPlayer == player1? currentPlayer = player2 : currentPlayer = player1;  
            UI.gameAlert(`It is player ${currentPlayer.name}'s turn`, "primary");
        }      
    };
    // Check if players have won or drawn
    function checkScore(plays, board) {
        const winConditions = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        const draw = (current) => current == "x" || current == "o";
        let success = winConditions.some((winArray) => 
            winArray.every((val) => 
                (plays.indexOf(val) !== -1)
            )
        )

        if(plays.length >= 3) {
            if(success) {
                ongoing = false;
                return UI.gameAlert(`${currentPlayer.icon} wins`, "success");
            } else if(board.boardArray.every(draw)) {
                ongoing = false;
                return UI.gameAlert("It's a draw!", "success");
            } 
        } 
    }
    // Controlling what happens when a person plays
    this.play =  function(e) {
        if(!ongoing) {
            UI.gameAlert("Game over. Start new game", "danger");            
        } else {
            let cell = e.target;
            let cellIndex = parseInt(cell.getAttribute("data-cell-index"));
            UI.fillBox(cell, currentPlayer.icon);
            board.updateBoard(cellIndex, currentPlayer.icon); 
            updateCurrent(cellIndex);
            checkScore(currentPlayer.plays, board);
            changePlayer();
        }             
    }
    // Restart game
    this.restart = function(){
        ongoing = true;
        player1.start();
        player2.start();
        currentPlayer = player1;
        UI.clearCells();
        UI.gameAlert(`It is player ${currentPlayer.name}'s turn`, "primary");
        board.clearBoard;
        console.log("restarting");
    }
};

/* Events */
// Start game
let game = new GamePlay();
// Clicking a box
let cells = Array.from(document.querySelectorAll(".cell"));
cells.forEach(cell => cell.addEventListener("click", game.play))
// restart game
const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", game.restart);
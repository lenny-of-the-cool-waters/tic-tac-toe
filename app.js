// Gameboard object
let GameBoard = {
    // gameboard array
    board: [...Array(9)],
    updateBoard: function(index) {
        this.board[index] = "filled";
        console.log(this.board);
    }
};

// Player factory or object
function Player(name,icon,plays) {
    console.log({ name, icon, plays});
    return { name, icon, plays};
}

// Object to control UI
let UI = {
    // Start game
    // Fill a box
    fillBox: function(cell) { cell.textContent = "X"; },
    // Congratulate player
    congrats: function() {}
};

// Object to control gameplay
let GamePlay = {
    // Create players
    player1: Player("One", "x", []),
    player2: Player("Two", "o", []),
    // Current player
    currentPlayer: this.player1,
    // Change player
    /* changePlayer: , */
    // Controlling what happens when a person plays
    play: function(e) {
        let cell = e.target;
        let cellIndex = parseInt(cell.getAttribute("data-cell-index"));
        UI.fillBox(cell);
        GameBoard.updateBoard(cellIndex);
        (function() {
            (this.currentPlayer == this.player1)? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
            console.log(this.currentPlayer);
        })();
    }
    // Check for wins
    // Check for tie
    // Restart game
};

/* Events */
// Clicking a box
let cells = Array.from(document.querySelectorAll(".cell"));
cells.forEach(cell => cell.addEventListener("click", GamePlay.play))
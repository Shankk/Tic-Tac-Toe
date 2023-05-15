const playerFactory = (name, score, turn, marker) => {
    return {name, score, turn, marker};
};

const playerOne = playerFactory("Player X", 0 , true, "X" );
const playerTwo = playerFactory("Player O", 0, false, "O");
const gameStatusTxt = document.querySelector('.game-status');
const restartBtn = document.querySelector('.restartBtn');
let roundCompleted = false;
let gameGrid = [];

function applyPlayerTurn(cell) {
    if(cell.textContent == "" && roundCompleted == false)
    {
        if(playerOne.turn == true)
        {
            cell.textContent = playerOne.marker;
            playerOne.turn = false;
            gameStatusTxt.textContent = playerTwo.name + "'s turn"
            getGameStatus(playerOne);
        }
        else {
            cell.textContent = playerTwo.marker;
            playerOne.turn = true;
            gameStatusTxt.textContent = playerOne.name + "'s turn"
            getGameStatus(playerTwo);
        }
    }
    
}

function addGridCells() {

    for(let i = 0; i < 9; i++){
        let cell = document.getElementById(i);
        cell.addEventListener('click', () => {
            applyPlayerTurn(cell);
        });
        gameGrid.push(cell);
    }
};

function getGameStatus(player) {
    //Check if game is tied
    let count = 0;
    for(let i = 0; i < gameGrid.length; i++)
    {
        if(gameGrid[i].textContent != ""){
            count++
        }
    }
    if(count == 9){
        gameStatusTxt.textContent = "Game Ended In a Tie!";
        roundCompleted = true;
    }

    for(let i = 0; i < 3; i++)
    {
        // Checking Top to Bottom Rows
        if(gameGrid[0 + (i*3)].textContent == player.marker &&
            gameGrid[1 + (i*3)].textContent == player.marker && 
            gameGrid[2 + (i*3)].textContent == player.marker) {
            gameStatusTxt.textContent = player.name +" is the Winner!";
            roundCompleted = true;
        }
        // Checking Left To Right Columns
        if(gameGrid[0 + i].textContent == player.marker &&
            gameGrid[3 + i].textContent == player.marker && 
            gameGrid[6 + i].textContent == player.marker) {
                gameStatusTxt.textContent = player.name +" is the Winner!";
                roundCompleted = true;
        }
    }

    if(gameGrid[0].textContent == player.marker &&
        gameGrid[4].textContent == player.marker && 
        gameGrid[8].textContent == player.marker) {
        gameStatusTxt.textContent = player.name +" is the Winner!";
        roundCompleted = true;
    }
    if(gameGrid[2].textContent == player.marker &&
        gameGrid[4].textContent == player.marker && 
        gameGrid[6].textContent == player.marker) {
        gameStatusTxt.textContent = player.name +" is the Winner!";
        roundCompleted = true;
    }
}

function resetGame() {
    gameStatusTxt.textContent = playerOne.name + "'s turn"
    playerOne.turn = true;
    roundCompleted = false;
}

function clearGrid() {
    if(gameGrid != null)
    {
       for(let i = 0; i < gameGrid.length; i++){
            gameGrid[i].textContent = "";
        } 
    }
    
}

restartBtn.addEventListener('click', () => {
    resetGame();
    clearGrid();
});

addGridCells();
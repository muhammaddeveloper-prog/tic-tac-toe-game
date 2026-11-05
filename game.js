const Cells = document.querySelectorAll(".cell")
const titleHeader = document.querySelector("#titleheader")
const restartBtn = document.querySelector("#restartBtn")
const xPlayerDisplay = document.querySelector ("#xPlayerDisplay")
const oPlayerDisplay = document.querySelector ("#oPlayerDisplay")


let player = 'X'
let isPauseGame = false ;
let isGameStart = false ; 

const inputCells = ['' , '' , '' , 
                    '' , '' , '' , 
                     '' , '' , '']

const winConditions = [
       [0 , 1 , 2] ,
       [0 , 3 , 6] , 
       [0 , 4 , 8] ,
       [1 , 4 , 7] ,
       [2 , 4 , 6] ,
       [2 , 5 , 8] ,
       [3 , 4 , 5] ,
       [6 , 7 , 8] ,

]

Cells.forEach((cell, index) => {
cell.addEventListener('click' , () =>tapCell(cell, index) )

})

function tapCell(cell , index){
   
    if (cell.textContent == '' &&
        !isPauseGame
    ){
        isGameStart = true 
        updateCell(cell , index)
        if (!checkWinner()){
        changePlayer()
    }

    }
}
function updateCell(cell , index){
    cell.textContent = player
    inputCells[index] = player
    console.log(inputCells)
    cell.style.color = (player == 'X') ? '#3b85f4' : '#A737FF'
}
function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}
function checkWinner() {
    for (const [a , b , c] of winConditions){
        if(inputCells [a] == player &&
            inputCells [b] == player &&
            inputCells [c] == player
        ) {
            declareWinner([a , b , c])
            return true
        }
    }
     if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
}

function choosePlayer(selectedPlayer) {
    if (!isGameStart) {
        player = selectedPlayer;

        if (player == 'X') {
            xPlayerDisplay.classList.add('player-active');
            oPlayerDisplay.classList.remove('player-active');
        } else {
            xPlayerDisplay.classList.remove('player-active');
            oPlayerDisplay.classList.add('player-active');
        }
    }
}
   




function declareWinner(winningIndices) {
         titleHeader.textContent = `${player} Win`
         isPauseGame = true
         winningIndices.forEach((index) =>
        Cells[index].style.background = 'rgba(88, 255, 88, 0.89)'
        )
        restartBtn.style.visibility = 'visible'
}

function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

restartBtn.addEventListener('click' , () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    Cells.forEach(cell =>{
cell.textContent = ''
cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})
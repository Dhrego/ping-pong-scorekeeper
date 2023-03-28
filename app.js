const playerOne = {
    score: 0,
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1Button')
}
const playerTwo = {
    score: 0,
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2Button')
}


let resetButton = document.querySelector('#reset');
let roundSelect = document.querySelector('#round');


let winningRound = 3;
let isGameOver = false;
let originalWin = 0;



roundSelect.addEventListener('change', () => {
    //had an issue when I used 'this.value'
    //issue was 'this' doesn't work with arrow functions
    winningRound = parseInt(roundSelect.value);
    reset();
})

let updateScore = (player, opponent) => {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningRound) {
            isGameOver = true;
            player.display.classList.add('text-success');
            opponent.display.classList.add('text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.innerText = player.score;
    }
}

playerOne.button.addEventListener('click', () => {
    updateScore(playerOne, playerTwo);
    tieBreak(playerOne, playerTwo);
})
playerTwo.button.addEventListener('click', () => {
    updateScore(playerTwo, playerOne);
    tieBreak(playerTwo, playerOne)
})

const tieBreak = (player, opponent) => {
    if (player.score === opponent.score && player.score === winningRound - 1) {
        winningRound++;

        // roundSelect.selectedOptions[0].value = winningRound;

        roundSelect.selectedOptions[0].innerText = `Tie break to ${winningRound}`;
    }
}

const reset = () => {
    isGameOver = false;
    winningRound = parseInt(roundSelect.value);
    // does not reset value of the winning round after tie break to selected option


    // playerOne.score = 0;
    // playerTwo.score = 0;
    // playerOne.display.innerText = 0;
    // playerTwo.display.innerText = 0;
    // playerOne.display.classList.remove('text-success', 'text-danger');
    // playerTwo.display.classList.remove('text-danger', 'text-success');
    // playerOne.button.disabled = false;
    // playerTwo.button.disabled = false

    for (let p of [playerOne, playerTwo]) {
        p.score = 0;
        p.display.innerText = 0;
        p.display.classList.remove('text-success', 'text-danger');
        p.button.disabled = false;

    }

    //resets the selected option
    for (let i = 0; i < 5; i++) {
        roundSelect[i].value = 3 + i;
        roundSelect[i].innerText = 3 + i;
    }
}
resetButton.addEventListener('click', reset)





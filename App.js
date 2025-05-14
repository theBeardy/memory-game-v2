const cardGrid = document.getElementById('card-grid');
const startBtn = document.getElementById('start');
const selector = document.getElementById('theme-selector');
const themeStyle = document.getElementById('theme-style');
const modal = document.getElementById('modal');
const resetBtn = document.getElementById('reset-game');
const matches = document.getElementById('matches');
const ding = document.getElementById('ding');
const youWin = document.getElementById('you-win');
const gameContainer = document.getElementById('game-container');

let imgArr = []
let clickedCardsArr = [];
let clickedCardIDs = [];
let madeMatches = 0;
let cardThemeName = ''

matches.innerText = madeMatches;

const imageSelectRandom = () => {
    imgArr = []; // Clear array at start
    const uniqueVals = new Set();

    // Keep selecting random numbers until we have 8 unique ones
    while (uniqueVals.size < 8) {
        const rand = Math.floor(Math.random() * 26) + 1; // range 1–27
        uniqueVals.add(rand);
    }

    // Duplicate each number to make pairs
    const paired = [...uniqueVals, ...uniqueVals];

    // Shuffle the array
    for (let i = paired.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    imgArr = paired;
    console.log(imgArr);
}

const displayWin = () => {
    youWin.play();
    modal.classList.add('open');
    gameContainer.classList.toggle('hidden');
    madeMatches = 0;
}

const resetGame = () => {
    gameContainer.classList.remove('hidden');
    modal.classList.remove('open');
    startGame();
}

const checkMatches = (val, IDs) => {
    const cardIDs = IDs;
    if (val[0] === val[1] && IDs[0] !== IDs[1]) {
        cardIDs.forEach((e) => {
            document.getElementById(e).removeAttribute('onclick');
        })
        madeMatches++
        matches.innerText = `${madeMatches}/8`;
        ding.play();
        if (madeMatches === 8) {
            displayWin();
        }
    } else {
        setTimeout(() => {
            cardIDs.forEach((e) => {
                document.getElementById(e).classList.toggle('flipped');
            })
        }, '700') 
    }
    clickedCardIDs = [];
    clickedCardsArr = [];
}

const startGame = () => {
    imageSelectRandom();
    matches.innerText = `${madeMatches}/8`;
    cardGrid.innerHTML = ``;
    startBtn.classList.add('hidden');
    selector.classList.add('hidden')
    for (let i = 0; i < 16; i++) {
        cardGrid.innerHTML += `
            <div class="card-container">
            <div id="card-${i}" class="memory-card" value="${imgArr[i]}" onclick="handleClick('card-${i}', ${imgArr[i]})">
                <div class="card-front" >
                    <img src="/images/card-backs/${cardThemeName === '' ? 'dark' : cardThemeName}.jpg" alt="card-back picture">
                </div>
                <div class="card-back">
                    <img src="./images/${cardThemeName === '' ? 'dark' : cardThemeName}-theme/img-${imgArr[i]}.jpg" alt="memory-game picture">
                </div>
            </div>
        </div>
        `
    }
}

const handleClick = (str, val) => {
    if (madeMatches >= 8) {
        displayWin();
    }
    clickedCardsArr.push(val);
    clickedCardIDs.push(str);
    if (clickedCardIDs.length === 2){
        document.getElementById(str).classList.toggle('flipped');
        checkMatches(clickedCardsArr, clickedCardIDs);
    } else {
        document.getElementById(str).classList.toggle('flipped');
    }

    console.log(clickedCardsArr)
}

startBtn.addEventListener('click', () => startGame());
resetBtn.addEventListener('click', () => resetGame());
selector.addEventListener('change', (e) => {
    themeStyle.setAttribute("href", `styles/${e.target.value}.css`);
    cardThemeName = e.target.value;
});
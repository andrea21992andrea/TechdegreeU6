const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.getElementsByClassName('btn__reset')[0];
// const start = document.getElementsById('btn__reset'); cambiar class to ID 
const startScreen = document.getElementById('overlay');
const keyrow = document.querySelectorAll('keyrow');
const button = document.getElementsByTagName('button');
const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');
let missed = 0;
let letters = document.getElementsByClassName('letter');
let shows = document.getElementsByClassName('show');

//Attach an event listener to the “Start Game” button to hide the start screen overlay

start.addEventListener('click', () => {
    startScreen.style.display = "none";
  });

  
const phrases = [
    'dog',
    'cat',
    'squirrel',
    'the armadillo',
    'coyote'
];


//Create a getRandomPhraseAsArray function.

function getRandomPhraseAsArray(arr) {
    const random = arr[Math.floor(Math.random() * arr.length)];
    return random.split("");
}

let randomPhrase = getRandomPhraseAsArray(phrases);

//Create an addPhraseToDisplay function

function addPhraseToDisplay(arr) {

    const ul = document.querySelector('#phrase');
    
        for (i = 0; i < arr.length; i++) {
            const li = document.createElement('li');
            li.textContent = arr[i];
            ul.appendChild(li);
    
            if (arr[i] === " "){
                li.classList.add("space");
            } else{
                li.classList.add("letter");
            }
        }
    }

addPhraseToDisplay(randomPhrase);

// Create a checkLetter function

function checkLetter(btn) {
    let letter = document.querySelectorAll('li');
    let match = null;
    for (i = 0; i < letter.length ; i++) {
        if (btn.textContent === letter[i].textContent) {
            letter[i].classList.add('show');
            match = btn.textContent;
        }
    }

    return match;
}

//Add an event listener to the keyboard

qwerty.addEventListener('click', (e) => {
  let btn = e.target;
  if (e.target.tagName === 'BUTTON' && e.target.className != "chosen") {
    btn.classList.add("chosen");
    btn.disabled = true;
}
const letterFound = checkLetter(btn);

if(letterFound === null && e.target.tagName === 'BUTTON') {
    const tries = document.querySelectorAll("img");
    tries[missed].setAttribute("src", "images/lostHeart.png");
    missed++;
}
checkWin();
});


function resetGame() {
    start.addEventListener('click', () => {
        startScreen.classList.remove('win');
        startScreen.classList.remove('lose');
        for (i = 0; i < button.length; i++) {
            if (button[i].className === 'chosen') {
                button[i].classList.remove('chosen');
                button[i].disabled = false;
            }
        }
        phrase.innerHTML = '';
        let newPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhrase);
        const hearts = document.getElementsByTagName('img');
        for (i=0; i < hearts.length; i++) {
            if (hearts[i].src = "images/lostHeart.png") {
                hearts[i].src = "images/liveHeart.png"
            }
        }
        missed = 0;
    });
}

// Create a checkWin function

function checkWin() {
    if (letters.length === shows.length) {
        setTimeout(() => {
            startScreen.className = "win",
            startScreen.children[0].textContent = "You Win!",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500)
          
    } else if (missed >= 5) {
        setTimeout(() => {
            startScreen.className = "lose",
            startScreen.children[0].textContent = "Try Again",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500);
    }
resetGame();  
}
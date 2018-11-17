const icons = ["fa fa-facebook-official", "fa fa-instagram", "fa fa-linkedin-square",
    "fa fa-skype", "fa fa-snapchat", "fa fa-twitch", "fa fa-twitter", "fa fa-youtube",
    "fa fa-facebook-official", "fa fa-instagram", "fa fa-linkedin-square", "fa fa-skype",
    "fa fa-snapchat", "fa fa-twitch", "fa fa-twitter", "fa fa-youtube"
]
shuffle(icons);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Global Variables
let openedCards = [];
let matchedCards = [];
let moves = 0;
let finalTime = "";
minutes
seconds

const deck = document.querySelector('.deck');
var isStarted = false; // prevents timer from running automatically 
var timer;

// Makes the cards
function buildCards() {
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class ='" + icons[i] + "'</i>";
        deck.appendChild(card);

        // This function shows the icon when clicked

        $(card).on('click', function() {

            // starts the timer function when the card is clicked.

            if (!isStarted) {
                timer = setInterval(function() {
                    $("#seconds").html(startTime(++sec % 60));
                    $("#minutes").html(startTime(parseInt(sec / 60, 10)));
                }, 1000);
                isStarted = true;
            }
            // adds the icons to each card 
            $(card).addClass('open show freeze');
            if ($(card).hasClass('open show freeze'));
            openedCards.push(card);

            // renames the opened cards for writing shorter code. 

            var firstPick = openedCards[0];
            var secondPick = openedCards[1];

            // checks to see if the cards are a match. If so it gives them a match class and they remain opened.//

            if (firstPick.innerHTML === secondPick.innerHTML) {
                $(firstPick).addClass('match');
                $(secondPick).addClass('match');
                matchedCards.push(firstPick);
                matchedCards.push(secondPick);

                // resets the opened cards array

                openedCards.length = 0;

                won();
                rating();

                // removes the open and show classes and flips the cards back over.//
            } else {
                setTimeout(function() {
                    $(firstPick).removeClass('open show freeze');
                    $(secondPick).removeClass('open show freeze');
                }, 800);
            }

            addMove();

            openedCards.length = 0;

        })
    }


    // This function give a star rating based on the amount of moves it takes to win the game.//
    function rating() {
        if (moves > 12 && moves <= 19) {
            stars.innerHTML = star + star;
        } else if (moves >= 19) {
            stars.innerHTML = star;
        } else {
            stars.innerHTML = star + star + star;
        }
    }

    // adds the moves on the display//
    const totalMoves = document.querySelector('.moves');

    function addMove() {
        moves++;
        totalMoves.innerHTML = moves;
        rating();
    }
}
/*
 * STARS
 */
const stars = document.querySelector('.stars');
const star = `<i class="fa fa-star"></i>`;
stars.innerHTML = star + star + star;



/*
 * TIMER function
 */

var sec = 0;

function startTime(val) { return val > 9 ? val : "0" + val; }

// helper code https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

// restarts the timer when the yes button is clicked on the modal//
function resetTimer() {
    sec = 0;
    $("#seconds").html(startTime(0 % 60));
    $("#minutes").html(startTime(parseInt(0 / 60, 10)));
    startTime();
    isStarted = false;
}

// checks to see if the game is won and if so stops the time and shows the game modal with players stats.//
function won() {
    if (matchedCards.length === 16) {
        clearInterval(timer);
        showModal();
    }
}


var modal = document.getElementById('modal');

// adds stats to the modal 
function writeStats() {
    const total_moves = document.querySelector('#totalMoves');
    total_moves.innerHTML = moves;

    const finalTime = document.querySelector('#totalTime');
    const minutesText = document.querySelector('#minutes').innerText;
    const secondsText = document.querySelector('#seconds').innerText;
    finalTime.innerHTML = `${minutesText}:${secondsText}`;

    const starsHtml = document.querySelector('#finalStars');
    starsHtml.innerHTML = stars.innerHTML;
}

// displays the modal 
function showModal() {
    modal.style.display = "block";
    writeStats();
}



/* Event listeners for reset button */
restartBtn.addEventListener('click', function() {
    openedCards.length = 0;
    shuffle(icons);
    deck.innerHTML = '';
    resetTimer();
    buildCards();
    matchedCards = [];
    moves = 0;
    updateMoves.innerHTML = moves;
    stars.innerHTML = starIcon + starIcon + starIcon;
});

// event listeners to run when yes button is pushed.// 
yesBtn.addEventListener('click', function() {
    openedCards.length = 0;
    shuffle(icons);
    modal.style.display = "none";
    deck.innerHTML = '';
    buildCards();
    matchedCards = [];
    moves = 0;
    updateMoves.innerHTML = moves;
    stars.innerHTML = starIcon + starIcon + starIcon;
});

// no button takes away the modal 
noBtn.addEventListener('click', function() {
    modal.style.display = "none";
});


/// 
buildCards();
rating();
startTime();
gameOver();

//IF I wanted to have a photo attached to the name in the wordBank would it be to use an object versus an array?
var wordBank = 
[
	"BILL",
	"RICK",
	"MORTY",
	"PLANKTON",
	"RADITZ",
	"LARRY",
	"JERRY",
	"PATRICK"
];

const maxTries = 10;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remaningGuesses = 0;
var hasFinished = false; // Like the on and off flag for the Scratch Game
var wins = 0;
// restart game variables after win or loss
// functions resetGame and updateDisplay always run when the page is loaded
function resetGame() {

remainingGuesses = maxTries;

// Generate random word 
currentWordIndex = Math.floor(Math.random() * (wordBank.length));

// clear arrays
guessedLetters = [];
guessingWord = [];

// build guessing word and turn it into underscore aka hidden words

for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
    guessingWord.push("_");
}

updateDisplay();

};

function updateDisplay() {

        document.getElementById("totalWins").innerText = wins;
		
		// Display how much of the word we've already guessed on screen
		// Print array without commas
		// The word has to appear when the game starts so that's why it's in updateDisplay
		var guessingWordText = ""; // there is CSS to make the spaceing of the word look nice
		for(var i = 0; i < guessingWord.length; i++) {
			guessingWordText += guessingWord[i];	
		}

		// stuff that resets or changes

		document.getElementById("currentWord").innerText = guessingWordText;
		document.getElementById("remainingGuesses").innerText = remainingGuesses;
		document.getElementById("guessedLetters").innerText = guessedLetters;


};

// After key is pressed and determined whether or not the key press is applicable -> this function assorts the key presses into an array that determines if the key press matches the name("string") from wordBox
function evaluateGuess(letter) {
	//Array to store positions of letters in string
	var positions = [];

	//Loop through word, store indices into an array
	for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
		if(wordBank[currentWordIndex][i] === letter) {
			positions.push(i);
		}
	}
	//if the key press doesn't match the word subtract a remainingGuess and dump the letter into the ether
	if (positions.length <= 0) {
		remainingGuesses--;
	} else {
		// ELSE! Loop to otherwise reveal the underscore as a letter
		for(var i=0; i < positions.length; i++) {
			guessingWord[positions[i]] = letter;
		}
	}
};


//Check for a win
function checkWin() {
	// if there are no indices with a bracket left
	if(guessingWord.indexOf("_") === -1) {
		wins++;
		hasFinished = true;
 		alert("you won, press a key to play again"); //no fanfare yet
	}
};

//Check for a loss
function checkLoss() {
	// if there are no more guesses remaining
	if(remainingGuesses <= 0) {
		hasFinished = true;
		alert("you lost, press a key to play again");

		

		
	}
};

// Make a guess
function makeGuess(letter) {
	if (remainingGuesses > 0) {
		// the function will go examine the key pressed and determine that if, it has not been pressed yet, to push it into the array guessedLetters
		if (guessedLetters.indexOf(letter) === -1) {
			guessedLetters.push(letter);
			evaluateGuess(letter);
		}
	}
};

//Event listener when game begins and ends
document.onkeyup = function(event) {
	if(hasFinished) {
		resetGame();
		hasFinished = false;
	} else {
			// makes sure no idiot presses something outside the necessary keys
		if(event.keyCode >= 65 && event.keyCode <= 90) {
			//fires makeGuess function and make sures inputs are uppercase to match the wordBank
			makeGuess(event.key.toUpperCase());
			updateDisplay();
			checkWin();
			checkLoss();
		} else {
			alert("You can only press keys dummy");
		}
	}
};

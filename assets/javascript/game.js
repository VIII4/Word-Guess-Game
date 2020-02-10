//Word Guessing Game

//Variables

var puzzleWordPool = ["TestA", "TestB", "TestC", "TestD", "TestE", "TestF"];
var guessedLetter;
var previusGuesses = [" "];
var remainingAttempts = 5;
var winCounter = 0;
var puzzleSolved = false;
var gameStarted = false;

//Ref To HTML Elements
var instructionElem;
var pWordElement;
var remGuessElement;
var winsElement;
var prevGuessesElement;

//Functions

//Objects
var gameInstructions = {
  playing: "Press a Letter Key to Guess that Letter",
  win: "You Won! Press any Key to Start a New Game",
  lose: "You Lost..., press any Key to Try Again"
};

var guessingGame = {
  puzzleWord: "",
  puzzleWordLetters: [],
  displayedWord: "",

  //Secondary
  selectWord: function(wordPool) {
    console.log("Current Pool of Words= " + wordPool);
    this.puzzleWord = "";

    if (wordPool.length <= 0) {
      alert(
        "You have guessed all of the words, you have too much time on your hands"
      );
      this.puzzleWord = "Winner";
    } else {
      //Get random #, get word and index, assign word then remove from array
      var selectedIndex = Math.floor(Math.random() * wordPool.length);
      var selectedWord = wordPool[selectedIndex];
      wordPool.splice(selectedIndex, 1);
      puzzleWordPool = wordPool;

      console.log("selected Word is " + selectedWord);
      console.log("Updated Word pool is= " + puzzleWordPool);
      this.puzzleWord = selectedWord.toUpperCase();
    }
  },

  getLetters: function(puzzleword) {
    console.log(
      "word to be broken down is " +
        puzzleword +
        " and it has " +
        puzzleword.length +
        " Letters."
    );
    var letterCount = puzzleword.length;
    for (i = 0; i < letterCount; i++) {
      var temp = puzzleword[i];
      this.puzzleWordLetters.push(temp);
    }
    console.log(this.puzzleWordLetters);
  },

  createPlaceholder: function() {
    var temp = "";
    for (i = 0; i < this.puzzleWordLetters.length; i++) {
      temp = temp.concat("-");
    }

    this.displayedWord = temp;
    console.log(this.displayedWord);
  },

  updatePlaceholder: function(guess) {
    var temp = "";

    for (i = 0; i < this.puzzleWord.length; i++) {
      //Check if placeholder exist,
      //Check if guess matches letter at index, if yes,
      //concat guess, if not concat place holder.
      if (this.displayedWord[i] === "-") {
        if (this.puzzleWord[i] === guess) {
          temp = temp.concat(guess);
        } else {
          temp = temp.concat("-");
        }
      } else {
        var update = this.displayedWord[i];
        temp = temp.concat(update);
      }
    }

    this.displayedWord = temp;
    console.log(this.displayedWord);
  },

  resetPuzzle: function() {
    remainingAttempts = 5;
    previusGuesses = [];
    puzzleSolved = false;
    this.puzzleWord = "";
    this.puzzleWordLetters = [];
    this.displayedWord = "";
  },

  getElements: function() {
    instructionElem = document.getElementById("instruction");
    pWordElement = document.getElementById("puzzleWord");
    remGuessElement = document.getElementById("numberGuesses");
    winsElement = document.getElementById("winScore");
    prevGuessesElement = document.getElementById("lettersGuessed");
  },

  updateInfoElements: function() {
    remGuessElement.textContent = remainingAttempts;
    winsElement.textContent = winCounter;
    prevGuessesElement.textContent = previusGuesses;
  },

  //Primary
  startGame: function() {
    this.resetPuzzle();
    this.selectWord(puzzleWordPool);
    this.getLetters(this.puzzleWord);
    this.createPlaceholder();
    this.getElements();
    this.updateInfoElements();

    pWordElement.textContent = this.displayedWord;

    return true;
  },

  gameTurn: function(guess) {
    //check if word contains guess, if so run update, if not reduce attempts.

    if (this.puzzleWord.includes(guess)) {
      this.updatePlaceholder(guess);
    } else {
      //Alert incorrect, visualize incorrect.
      remainingAttempts--;
      console.log(remainingAttempts);
    }
    previusGuesses.push(guess);

    //Update Displayed
    pWordElement.textContent = this.displayedWord;

    //check if puzzle is solved, return case.
    if (this.displayedWord == this.puzzleWord) {
      return true;
    } else {
      return false;
    }
  }

  //   debuggerTest: function() {
  //     this.selectWord(puzzleWordPool);
  //     this.getLetters(this.puzzleWord);
  //     this.createPlaceholder();
  //   }
};

//Key Event
document.onkeyup = function(event) {
  if (!gameStarted) {
    //Start Guessing Game, change gameStarted to true, and Update instruction
    gameStarted = guessingGame.startGame();
    instructionElem.textContent = gameInstructions.playing;
  } else {
    //Store Key that was pressed, and Value to be checked if it is a Letter.

    var guess = event.key;
    guess = guess.toUpperCase();

    var aplhaCheck = event.which;

    if (!(aplhaCheck >= 65 && aplhaCheck <= 90)) {
      console.log("Key pressed is not alpha");
      return;
    }

    //Check if letter was already guessed

    if (previusGuesses.includes(guess)) {
      alert("Already guessed that letter try again");
      console.log("already Guessed that letter");
    } else {
      //Run Guess attempt( return if puzzle was solved
      console.log("did not already Guess that letter");
      puzzleSolved = guessingGame.gameTurn(guess);
    }

    if (puzzleSolved) {
      //Alert Win, Increment win Value, change game started to false, reset game
      instructionElem.textContent = gameInstructions.win;
      winCounter++;
      gameStarted = false;
    } else if (!puzzleSolved && remainingAttempts <= 0) {
      instructionElem.textContent = gameInstructions.lose;
      gameStarted = false;
    } else {
    }
    guessingGame.updateInfoElements();
  }
};

//Word Guessing Game

//Variables

var puzzleWordPool = ["TestA", "TestB", "TestC", "TestD", "TestE", "TestF"];
var guessedLetter;
var previusGuesses = [" "];
var remainingAttempts = 3;
var puzzleSolved = false;
var gameStarted = false;

//Ref To HTML Elements
var instructionElem;
var pWordElement;

//Functions

//Objects
var gameInstructions = {
  begin: "Press any Key to Start, Guess the word to Win",
  playing: "Press a Key to Guess that Letter",
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
      this.puzzleWord = selectedWord.toLowerCase();
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
      var temp = puzzleword[i].toLowerCase();
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

  //Primary
  startGame: function() {
    this.selectWord(puzzleWordPool);
    this.getLetters(this.puzzleWord);
    this.createPlaceholder();
    instructionElem = document.getElementById("instruction");
    pWordElement = document.getElementById("puzzleWord");
    pWordElement.textContent = this.displayedWord;

    return true;
  },

  gameTurn: function(guess) {
    //check if word contains guess, if so run update, if not reduce attempts.

    if (this.puzzleWord.includes(guess)) {
      this.updatePlaceholder(guess);
      previusGuesses.push(guess);
    } else {
      //Alert incorrect, visualize incorrect.
      remainingAttempts--;
      console.log(remainingAttempts);
    }

    //Update Displayed
    pWordElement.textContent = this.displayedWord;

    //check if puzzle is solved, return case.
    if (this.displayedWord == this.puzzleWord) {
      return true;
    } else {
      return false;
    }
  },

  debuggerTest: function() {
    this.selectWord(puzzleWordPool);
    this.getLetters(this.puzzleWord);
    this.createPlaceholder();
  }
};

//Calls

//Set instruction to default

//Key Event
document.onkeyup = function(event) {
  if (!gameStarted) {
    //Start Guessing Game, change gameStarted to true, and Update instruction
    gameStarted = guessingGame.startGame();
    instructionElem.textContent = gameInstructions.playing;
  } else {
    //Guessing Game Turn

    var guess = event.key;
    guess = guess.toLowerCase();

    //Check if letter was already guessed

    if (previusGuesses.includes(guess)) {
      alert("Already guessed that letter try again");
      console.log("already Guessed that letter");
    } else {
      console.log("did not already Guess that letter");
      puzzleSolved = guessingGame.gameTurn(guess);
      //Run Guess attempt( return if puzzle was solved
    }

    if (puzzleSolved) {
      //Alert Win, Increment win Value, change game started to false, reset game
      alert("You Win");
    }
  }
};

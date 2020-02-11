//Word Guessing Game

//Variables

//var puzzleWordPool = ["TestA", "TestB", "TestC", "TestD", "TestE", "TestF"];
var puzzleWordPool = [
  "chappie",
  "sentinels",
  "eve",
  "Atom",
  "Optimus",
  "Megatron",
  "WallE",
  "Daryl",
  "Bishop",
  "Robocop",
  "AstroBoy",
  "Vision",
  "Ultron",
  "Ava",
  "Baymax",
  "Data"
];
var guessedLetter;
var previusGuesses = [" "];
var remainingAttempts = 8;
var winCounter = 0;
var lossCounter = 0;
var puzzleSolved = false;
var gameStarted = false;
var initializeState = 0;

var speed = 60;
var x = 0;

////Ref To HTML Elements
var introElement;
var instructionElem;
var pWordElement;
var remGuessElement;
var winsElement;
var losesElement;
var prevGuessesElement;

////ref to SoundFX elements
var backgroundMusic;
var startSoundFX;
var correctSoundFX;
var errorSoundFX;
var successSoundFX;

var soundFXCollection = [];

//
//

//
//

//Objects

////Typing object

var typeWriter = {
  counter: 0,
  message: "",
  element: "",

  SetMessage: function(_message, _element) {
    this.message = _message;
    this.element = _element;
    _element.innerHTML = "";
  }
};

////Game Intsruction Strings
var gameInstructions = {
  opening: "host> TuringTest\\initialize.exe ... ... ... ... ...",
  greeting:
    "Hello Human ... ... This is your final intelligence test.  Guess Five words correctly to save humanity ...  get 3 wrong and ... ... ... GAME OVER ... ...  Your artificial inteligence may need help so the words are limited to 'Robots' that have been portrayed in films. Good luck ... ... ... ... PRESS ANY KEY TO START",
  start: "press any key to start",

  playing: "Press a Letter Key to Guess the name of movie robot below",
  win: "Lucky ... Press any Key for a new word",
  lose: "Lost ... Typical ... , press any Key for a new word",
  gameover:
    "Refresh the page for a New Game (press any key to skip the Intro dialogue)"
};

////MAIN GAME OBJECT. ALL GAME RELATED METHODS INCLUDED
var guessingGame = {
  puzzleWord: "",
  puzzleWordLetters: [],
  displayedWord: "",

  //Secondary Methods
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
    remainingAttempts = 8;
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
    losesElement = document.getElementById("lossScore");
    prevGuessesElement = document.getElementById("lettersGuessed");
  },

  updateInfoElements: function() {
    remGuessElement.textContent = remainingAttempts;
    winsElement.textContent = winCounter;
    prevGuessesElement.textContent = previusGuesses;
    losesElement.textContent = lossCounter;
  },

  //PRIMARY METHODS
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
      //Alert Correct, visualize correct, soundFX correct
      this.updatePlaceholder(guess);
      playSound(correctSoundFX);
    } else {
      //Alert incorrect, visualize incorrect, SoundFX incorrect
      remainingAttempts--;
      playSound(errorSoundFX);
      console.log(remainingAttempts);
    }
    previusGuesses.push(guess);

    //Update Displayed
    pWordElement.textContent = this.displayedWord;

    //check if puzzle is solved, return case.
    if (this.displayedWord == this.puzzleWord) {
      //Alert Win, play sound or Visualize here....
      playSound(successSoundFX);
      return true;
    } else {
      return false;
    }
  }
};

//
//

//
//

//Functions

////typewriter output
writerOutput = function() {
  var cancel = function() {
    this.counter = this.message.length;
  };

  if (this.counter < this.message.length) {
    this.element.innerHTML += this.message.charAt(this.counter);
    this.counter++;

    setTimeout(typeOutput, speed);
  } else {
    this.counter = 0;
  }

  //To Run Typewriter, place below after event of on click
  // typeWriter.SetMessage(message, test);
  // typeOutput();
};
var typeOutput = writerOutput.bind(typeWriter);

var cancelType = function(callback) {
  typeWriter.counter = typeWriter.message.length;
};

////Sound FX

var setVolume = function(soundCollection) {
  for (i = 0; i < soundCollection.length; i++) {
    soundCollection[i].volume = 0.5;
  }
};

var getSounds = function() {
  backgroundMusic = document.getElementById("backgroungMusic");
  startSoundFX = document.getElementById("startUpFX");
  correctSoundFX = document.getElementById("correctSoundFX");
  errorSoundFX = document.getElementById("errorSoundFX");
  successSoundFX = document.getElementById("successSoundFX");
  soundFXCollection = [
    backgroundMusic,
    startSoundFX,
    correctSoundFX,
    errorSoundFX,
    successSoundFX
  ];
};
var playSound = function(soundFX) {
  soundFX.play();
};

var pauseSound = function(soundFX) {
  soundFX.pause();
};

//
//

//
//

//Events

$(document).ready(function() {
  //Game starts with text intro then tutorial, player presses key to start game
  getSounds();
  setVolume(soundFXCollection);
  console.log(soundFXCollection);
  var introBlock = document.getElementById("intro");
  var gameBlock = document.getElementById("gameWrapper");
  typeWriter.SetMessage(gameInstructions.opening, introBlock);
  typeOutput();

  //Get Main Game content Block to display after intro message
  var temp = document.getElementById("instruction");

  //display intro text 5 seconds after initial prompt begins
  setTimeout(function() {
    document.getElementById("intro").innerHTML = "";
    typeWriter.SetMessage(
      gameInstructions.greeting,
      document.getElementById("intro")
    );
    typeOutput();
    initializeState = 1;
  }, 5000);

  //On Key Event

  document.onkeyup = function(event) {
    if (initializeState === 0) {
      return;
    } else if (initializeState === 1) {
      //Cancel Typing Text and clear
      cancelType(function() {
        introBlock.innerHTML = "";
      });
      initializeState = 2;
    }

    if (!gameStarted) {
      //Start Background music and display controls
      playSound(backgroundMusic);
      backgroundMusic.controls = true;

      introBlock.innerHTML = "";

      //Show Game Wrapper Element
      gameBlock.style.display = "block";

      //Start Guessing Game, change gameStarted to true, and Update instruction
      gameStarted = guessingGame.startGame();

      //Display Instruction Update
      introBlock.textContent = gameInstructions.playing;
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
        //Run Guess attempt return if puzzle was solved
        console.log("did not already Guess that letter");
        puzzleSolved = guessingGame.gameTurn(guess);
      }

      //Check if puzzle is solved
      if (puzzleSolved) {
        //Alert Win, Increment win Value, change game started to false, reset game
        introBlock.textContent = gameInstructions.win;
        winCounter++;
        gameStarted = false;
      } else if (!puzzleSolved && remainingAttempts <= 0) {
        introBlock.textContent = gameInstructions.lose;
        lossCounter++;
        gameStarted = false;
      } else {
      }

      //check win/lose total here
      if (winCounter >= 5) {
        alert(
          "you have saved humanity and set the singularity back by 1 hour, refresh page to play again"
        );
        initializeState = 0;
        introBlock.textContent = gameInstructions.gameover;
        //Reset Game
      } else if (lossCounter >= 3) {
        alert(
          "Humanity will pay for your lack of intelligence.... refresh page to play again"
        );
        initializeState = 0;
        introBlock.textContent = gameInstructions.gameover;
        //Reset Game
      }
      guessingGame.updateInfoElements();
    }
  };
});

Game Name: Crystal Collector Goal: Match your total score to the random numberRules: Start the Game displaying a random number. When user clicks on a crystal it will reveal a random value. The random value will become the user's score. Each click adds to the user's score. If the user's score is equal to the random number the user wins. If the user's score is greater than the random number the user loses. The game restarts whenever the player wins or loses Tally the number of wins and losses. Do not refresh the page.

**Notes**
The random number shown at the start of the game should be between 19 - 120. Each crystal should have a random hidden value between 1 - 12.

//Psuedocode for Java Script
/////////////////////////////////////
////////////////////////////////////

Major Task 1
When page loads, "Reset Game" : set total score to zero, generate random target number (btw 19-120) and generate random numbers for each puzzle piece (crystals); after number generation update html element to display puzzle number.

    Generate random number between 19-120 for puzzle number

    Generate 4 random numbers between 19-120 for puzzle piece numbers

    Update HTML elements(puzzleNumber, totalScore)

Major Task 2
Get element that user clicks on and add associated value to score, update score on HTML element. repeat until user score is equal or greater than puzzle number:
IF equal users wins, win(s) amount increments, update wins amount HTML element and reset game.
IF Greater user losses, loss(es) amount increments, update loss amount HTML element and reset game.

////////////////////////////////
////////////////////////////////

//To start the game \_ on page load generate a random number between 19-120 return the Target to the console Update the Target number placeholder on the screen

\_ on click of a Crystal generate a random number between 1-12 return the crystal number to the console update user total score with the number check to see if the number is equal to or greater than the Target number Update the Crystal number placholder on the screen

_Game Reset, Generate a new Target Number between 19-120 return the Target number to teh console, Update the Target number placeholder on the screen, update total score to 0 Remove any displayed crystal numbers update total score to zero _

When user wins add 1 to wins reset the game

When the user loses, add 1 to losses reset the game

// Variable Tracking goal = targetNumber wins losses totalScore

// HTML Setup, ID - goal = targetNumber ID - wins ID - losses ID - totalScore ID - each individual jewe

# Word Guessing Game

Theme:
??

HTML Elements:
Title
instruction
Wins
Current Word being Guessed // Type
Cuurent word being Guessed // Value
Number of Guesses Remaining // Type
number of Guesses Remaining // Value
Letters Guessed Already // Type
Letters Guessed Already // Value

CSS:
Bootstrap

JS:

1. Select a word at random from list of available words, assigned the word as the puzzle word, and remove the word from the list. _COMPLETE_

2. Break the puzzle word down into a list of the letters that make up the word.
   -Get the length of the word
   -using length of word, for loop through letter index, add each letter to array _Complete_

3. Display a \_ for each letter in the word as a place holder. _Complete_

4. Listen for which key is pressed by user

5. Store the letter for key pressed as guessed letter, then check if letter was already guessed:
   -if no, continue to next step
   -if yes alert that word was already guessed, repeat step 4.

6. Check if puzzle word letters list contains guessed letter:
   -if yes, alert success (or some sort of visual confirmation) then change associated place holder to letter
   -if no, alert failure, then decrement remaining guess value

7. Add Guess letter to list of letters already guessed

8. Check if word was completed:
   -if Yes, alert Win, increment win value.
   -if No, repeat step 4

9. reset game

Varaibles
Array of puzzle Words to be selected at random (Global)
String that will ref current Puzzle Word
Array that will store all letters that make up puzzle word
Integer var that refs numbers of remaining attempts (Global)
String var that refs current user guessed letter
Array that stores previouly guessed letters
Condition for if puzzle is solved(Global)

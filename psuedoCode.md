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

Create an array of guessing words
Create a var that will ref current guessing word
Create an Array that will store all letters that make up guessing word
Create an array of Guessing words already solved
Create a var that refs numbers of attempts
create an var that refs guessed letter
create an array that stores guessed letters
creat a condition for if puzzle is solved

select a random word from list and assign as current guessing word
get info from selected word
create (\_) place holder for each letter in the word

start event listener to get key up
assign key up to guessed letter var

Check if guessed letter was already guessed then check if current word contains guess, remove remaining attempts if incorrect, reveal letter if correct.

if all letters revealed, remove word from pool, congratulate player then restart game with new word

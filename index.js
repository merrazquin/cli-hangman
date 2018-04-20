const Word = require('./Word'),
    inquirer = require('inquirer')

// create an array of Word objects
var wordsList = ['Love Actually', 'Two Weeks Notice', 'Must Love Dogs'].map(word => { return new Word(word) })

// randomly sort the array
wordsList.sort((a, b) => { return Math.random() > 0.5 })

/**
 * Start a new game based off of the current word
 */
function startNewGame() {
    if (wordsList.length) {
        let currentWord = wordsList.shift()

        promptForLetter(currentWord, 5, [])
    } else {
        console.log('No more words!')
    }
}

/**
 * Prompt the user as to whether they'd like to continue playing
 */
function promptNewGame() {
    inquirer.prompt(
        {
            type: 'confirm',
            message: 'Play again?',
            name: 'again'
        }
    ).then(response => {
        if (response.again) {
            startNewGame()
        }
    })
}

/**
 * Prompt the user for their next guess, keep track of the current word, guessesRemaining, and already guessed letters
 * @param {Word} word 
 * @param {number} guessesRemaining 
 * @param {Array} guessedLetters 
 */
function promptForLetter(word, guessesRemaining, guessedLetters) {
    console.log(word.toString())

    inquirer.prompt(
        {
            name: 'guess',
            message: 'Guess:',
            type: 'input',
            validate: input => {
                // only accept single letters from a-z
                if (input.length != 1 || input.toLowerCase() < 'a' || input.toLowerCase() > 'z') {
                    return 'Please enter a letter'
                }

                // don't allow the user to guess a letter they've already guessed
                if (guessedLetters.indexOf(input.toLowerCase()) != -1) {
                    return 'You already guessed ' + input + '. Guess a different letter'
                }

                return true
            }
        }
    ).then(input => {
        if (!word.testLetter(input.guess)) {
            // if the user has not guessed correctly, decrement their guesses remaining
            console.log('Incorrect! You have %s guesses remaining', --guessesRemaining)
        }

        guessedLetters.push(input.guess.toLowerCase())

        if (word.isSolved) {
            // if the word is solved, show the solved word and prompt to play again
            console.log(word.toString())
            console.log('You won!')
            promptNewGame()
        } else if (guessesRemaining > 0) {
            // if the word has not yet been solved, and the user has guesses remaining, prompt for a new guess
            promptForLetter(word, guessesRemaining, guessedLetters)
        } else {
            // if the user has lost, prompt to play again
            console.log('You Lost')
            promptNewGame()
        }
    })
}

// start the game
startNewGame()
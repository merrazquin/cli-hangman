const Letter = require('./Letter')

/**
 * Create a word made up of Letters to be solved
 */
class Word {
    constructor(word) {
        // create an array of Letter objects based on the letters in the word
        this.word = word.split('').map(letter => new Letter(letter))
    }

    /**
     * Returns true if at least one letter was solved by the guess
     * @param {string} guess 
     */
    testLetter(guess) {
        return this.word.filter(letter => letter.checkForMatch(guess)).length
    }

    /**
     * Return true if all letters in the word have been solved
     */
    get isSolved() {
        return this.word.reduce((tally, letter) => { return tally && letter.isSolved }, true)
    }

    toString() {
        return this.word.join(' ')
    }
}

module.exports = Word
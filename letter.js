/**
 * Create a letter to be solved
 */
class Letter {
    constructor(letter, isSolved = false) {
        // if the letter is a space, convert it to a hyphen and consider it solved
        this.letter = letter === ' ' ? '-' : letter
        this.isSolved = this.letter === '-' || isSolved
    }

    // only return true if the letter was not previously solved
    checkForMatch(letter) {
        return !this.isSolved && (this.isSolved = letter.toLowerCase() === this.letter.toLowerCase())
    }

    /**
     * Display the letter if solved, otherwise, display an underscore
     */
    toString() {
        return this.isSolved ? this.letter : '_'
    }
}

module.exports = Letter
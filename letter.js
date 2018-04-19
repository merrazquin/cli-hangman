/**
 * Create a letter to be solved
 */
class Letter {
    constructor(letter, isSolved = false) {
        this.letter = letter
        this.isSolved = isSolved
    }

    toString() {
        return this.isSolved ? this.letter : '_'
    }

    checkForMatch(letter) {
        this.isSolved = letter === this.letter
    }
}
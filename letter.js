/**
 * Create a letter to be solved
 */
class Letter {
    constructor(letter, isSolved = false) {
        this.letter = letter
        this.isSolved = isSolved
    }

    checkForMatch(letter) {
        let wasSolved = this.isSolved
        return (this.isSolved = letter === this.letter) && !wasSolved
    }

    toString() {
        return this.isSolved ? this.letter : '_'
    }
}

module.exports = Letter
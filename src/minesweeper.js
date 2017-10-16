const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    const board = []
    for (let i = 0; i < numberOfRows; i++) {
        const row = []
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ')
        }
        board.push(row)
    }
    return board
}


generatePlayerBoard(5, 10)


const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    const board = []
    for (let i = 0; i < numberOfRows; i++) {
        const row = []
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null)
        }
        board.push(row)
    }

    let numberOfBombsPlaced = 0
    while (numberOfBombsPlaced <= numberOfBombs) {
        // An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
        // This will be fixed when you learn about control flow.
        const randomRowIndex = Math.floor(Math.random() * numberOfRows)
        const randomColumnIndex = Math.floor(Math.random() * numberOfColumns)
        board[randomRowIndex][randomColumnIndex] = 'B'
        numberOfBombsPlaced ++
    }
    return board
}

const printBoard = (board) => {
    return board.map(row => row.join(' | ')).join('\n')
}

const playerBoard = generatePlayerBoard(3, 4)
const bombBoard = generateBombBoard(3, 4, 5)

console.log('Player board:');
console.log(printBoard(playerBoard));

console.log('Bomb board:');
console.log(printBoard(bombBoard));

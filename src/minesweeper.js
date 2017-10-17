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
        let randomRowIndex = Math.floor(Math.random() * numberOfRows)
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns)
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B'
            numberOfBombsPlaced ++
        }
    }
    return board
}


const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    const numberOfRows = bombBoard.length
    const numberOfColumns = bombBoard[0].length
    let numberOfBombs = 0
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0] // the first value is the row
        const neighborColumnIndex = columnIndex + offset[1]
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <=numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs ++
            }
        }
    })
    return numberOfBombs
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B'
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
    }
    return
}


const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'))
    return board.map(row => row.join(' | ')).join('\n')
}

const playerBoard = generatePlayerBoard(3, 4)
const bombBoard = generateBombBoard(3, 4, 2)

// printBoard(playerBoard)
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0)
console.log('Updated player board: ');
printBoard(playerBoard)

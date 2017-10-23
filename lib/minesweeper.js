'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, columnIndex) {
            this._board.flipTile(rowIndex, columnIndex);
            if (this._board[rowIndex][columnIndex] === 'B') {
                console.log('Game is over');
                print(this._board);
            } else if (!this._board.hasSafeTiles()) {
                console.log('The user has over');
            } else {
                console.log('Current Board:');
                print(this._board);
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {
            if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
                console.log('This tile has already been flipped!');
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }
            this._numberOfTiles--;
            // return
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;
            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = rowIndex + offset[0]; // the first value is the row
                var neighborColumnIndex = columnIndex + offset[1];
                if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles !== this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this.playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
            return this.playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n');
        }
    }, {
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                var row = [];
                for (var j = 0; j < numberOfColumns; j++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                var row = [];
                for (var j = 0; j < numberOfColumns; j++) {
                    row.push(null);
                }
                board.push(row);
            }

            var numberOfBombsPlaced = 0;
            while (numberOfBombsPlaced <= numberOfBombs) {
                // An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
                // This will be fixed when you learn about control flow.
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }]);

    return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(0, 1);

// const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
//     const board = []
//     for (let i = 0; i < numberOfRows; i++) {
//         const row = []
//         for (let j = 0; j < numberOfColumns; j++) {
//             row.push(' ')
//         }
//         board.push(row)
//     }
//     return board
// }
//
//
// generatePlayerBoard(5, 10)


// const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
//     const board = []
//     for (let i = 0; i < numberOfRows; i++) {
//         const row = []
//         for (let j = 0; j < numberOfColumns; j++) {
//             row.push(null)
//         }
//         board.push(row)
//     }
//
//     let numberOfBombsPlaced = 0
//     while (numberOfBombsPlaced <= numberOfBombs) {
//         // An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
//         // This will be fixed when you learn about control flow.
//         let randomRowIndex = Math.floor(Math.random() * numberOfRows)
//         let randomColumnIndex = Math.floor(Math.random() * numberOfColumns)
//         if (board[randomRowIndex][randomColumnIndex] !== 'B') {
//             board[randomRowIndex][randomColumnIndex] = 'B'
//             numberOfBombsPlaced ++
//         }
//     }
//     return board
// }

//
// const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
//     const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
//     const numberOfRows = bombBoard.length
//     const numberOfColumns = bombBoard[0].length
//     let numberOfBombs = 0
//     neighborOffsets.forEach(offset => {
//         const neighborRowIndex = rowIndex + offset[0] // the first value is the row
//         const neighborColumnIndex = columnIndex + offset[1]
//         if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <=numberOfColumns) {
//             if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
//                 numberOfBombs ++
//             }
//         }
//     })
//     return numberOfBombs
// }
//
// const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
//     if (playerBoard[rowIndex][columnIndex] !== ' ') {
//         console.log('This tile has already been flipped!');
//     } else if (bombBoard[rowIndex][columnIndex] === 'B') {
//         playerBoard[rowIndex][columnIndex] = 'B'
//     } else {
//         playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
//     }
//     return
// }
//
//
//
//
// const playerBoard = generatePlayerBoard(3, 4)
// const bombBoard = generateBombBoard(3, 4, 2)
//
// // printBoard(playerBoard)
// console.log('Player Board:');
// printBoard(playerBoard);
// console.log('Bomb Board');
// printBoard(bombBoard);
// flipTile(playerBoard, bombBoard, 0, 0)
// console.log('Updated player board: ');
// printBoard(playerBoard)
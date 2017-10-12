'use strict';

var printBoard = function printBoard(board) {
    console.log(board[0].join('|'));
};
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

printBoard(board);

board[0][1] = 1;
board[2][2] = 'B';

printBoard(board);
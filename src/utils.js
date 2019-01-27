import {BOARD_SIZE_THREE, RESULT_DRAW} from './constants.js'


const isBoardFilled = (squares) => {
    return squares.filter(square => {
        return square != null
    }).length === BOARD_SIZE_THREE * BOARD_SIZE_THREE;
}

export const calculateWinner = (squares) => {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winningLine = winningLines.filter(winningLine => {
        const [a, b, c] = winningLine;
        return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    });

    if (winningLine.length !== 0) {
        let index = winningLine.pop().pop()
        return squares[index];
    } else if (isBoardFilled(squares)) {
        return RESULT_DRAW;
    } else {
        return null;
    }
};
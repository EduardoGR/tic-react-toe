import {BOARD_SIZE_THREE, GAME_STATUS_DRAW, GAME_STATUS_WIN, GAME_STATUS_ONGOING} from '../domain/constants'
import GameResult from '../domain/game-result'

const isBoardFilled = (board) => {
    return board.filter(square => {
        return square != null
    }).length === BOARD_SIZE_THREE * BOARD_SIZE_THREE;
}

export const getResultFromBoard = (board) => {
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
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });

    let gameStatus = undefined;
    let wonLine = undefined;
    let wonSymbol = undefined;
    
    if (winningLine.length !== 0) {
        gameStatus = GAME_STATUS_WIN;
        wonLine = winningLine.pop();
        wonSymbol = board[wonLine.slice().pop()];
    } else if (isBoardFilled(board)) {
        gameStatus = GAME_STATUS_DRAW;
    } else {
        gameStatus = GAME_STATUS_ONGOING;
    }

    return GameResult({
        gameStatus: gameStatus,
        wonLine: wonLine,
        wonSymbol: wonSymbol,
    });
};

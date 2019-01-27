import {ACTION_TYPE_ADD_SYMBOL, ACTION_TYPE_JUMP_TO_MOVE} from '../actions/index'
import {PLAYER_O, PLAYER_X, GAME_STATUS_BEGINNING, GAME_STATUS_ONGOING} from '../domain/constants'
import {getResultFromBoard} from '../logic/logic'

const initialState = {
    history: [{
        board: Array(9).fill(null),
    }],
    stepNumber: 0,
    gameStatus: GAME_STATUS_BEGINNING,
    wonLine: undefined,
    turn: PLAYER_X
};

const getNextSymbol = (symbol) =>  PLAYER_X === symbol ? PLAYER_O : PLAYER_X;

const getSymbolFromStepNumber = (stepNumber) => (stepNumber % 2) === 0 ? PLAYER_X : PLAYER_O;

export const ticTactToeReducer = (currentState = initialState, action = {}) => {
    let gameResult;
    let history;

    switch (action.type) {
        case ACTION_TYPE_ADD_SYMBOL:
            const {position, symbol} = action;

            history = currentState.history.slice(0, currentState.stepNumber + 1);
            const current = history[history.length - 1];
            let board = current.board.slice();
            
            board[position] = symbol;

            gameResult = getResultFromBoard(board);

            return {
                ...currentState,
                history: history.concat([{
                    board: board,
                }]),
                stepNumber: history.length,
                gameStatus: gameResult.gameStatus,
                wonLine: gameResult.wonLine,
                turn: GAME_STATUS_ONGOING === gameResult.gameStatus ? getNextSymbol(symbol) : symbol
            };
        case ACTION_TYPE_JUMP_TO_MOVE:
            const {stepNumber} = action;

            history = currentState.history.slice(0, stepNumber + 1);
            const boardOfStepNumber = history[stepNumber].board.slice();
            gameResult = getResultFromBoard(boardOfStepNumber);
            let gameStatus = gameResult.gameStatus;
            let turn = getSymbolFromStepNumber(stepNumber);

            if (stepNumber === currentState.history.length - 1) {
                turn = currentState.turn;
            } else if (stepNumber === 0) {
                gameStatus = GAME_STATUS_BEGINNING
            }

            return {
                ...currentState,
                stepNumber: stepNumber,
                gameStatus: gameStatus,
                wonLine: gameResult.wonLine,
                turn: turn
            };
        default:
            return currentState
    }
}

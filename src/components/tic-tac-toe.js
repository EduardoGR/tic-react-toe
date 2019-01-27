import React from 'react';
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import {BOARD_SIZE_THREE, GAME_STATUS_DRAW, GAME_STATUS_WIN, GAME_STATUS_ONGOING, GAME_STATUS_BEGINNING} from '../domain/constants'
import Board from '../components/board'
import {addSymbol, jumpToMove} from '../actions/index'

const stylesheet = {
    game: {
        'font': '14px "Century Gothic", Futura, sans-serif',
        'margin': '20px',
        'display': 'flex',
        'flex-direction': 'row',
    },
    gameInfo: {
        'margin-left': '20px',
    },
    status: {
        'margin-bottom': '10px',
    },
    li: {
        'padding-left': '30px',
    },
    ol: {
        'padding-left': '30px',
    }
}

const getStatus = (gameStatus, turn) => {
    switch(gameStatus) {
        case GAME_STATUS_BEGINNING:
            return 'Next player: ' + turn;
        case GAME_STATUS_ONGOING:
            return 'Next player: ' + turn;
        case GAME_STATUS_WIN:
            return 'Winner: ' + turn;
        case GAME_STATUS_DRAW:
            return 'Draw!';
        default:
            return 'Somethign went wrong!';
    }
};

const getMovementsHistory = (history, onClickMovementHistory, classes) => {
    return history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
            <li key={move} className={classes.li}>
                <button onClick={() => onClickMovementHistory(move)}>{desc}</button>
            </li>
        );
    });
};

const TicTacToe = ({
    history, 
    stepNumber, 
    gameStatus,
    wonLine,
    turn,
    onClickBoard,
    onClickMovementHistory,
    classes,
}) => {
    const movementsHistory = getMovementsHistory(history, onClickMovementHistory, classes);
    return (
        <div className={classes.game}>
            <div>
                <Board
                    size={BOARD_SIZE_THREE}
                    board={history[stepNumber].board}
                    turn={turn}
                    wonLine={wonLine}
                    onClickBoard={(position, symbol) => onClickBoard(position, symbol)}
                />
            </div>
            <div className={classes.gameInfo}>
                <div className={classes.status}>{getStatus(gameStatus, turn)}</div>
                <ol className={classes.ol}>{movementsHistory}</ol>
            </div>
        </div>
    );
};

export default connect(
    ({history, stepNumber, gameStatus, wonLine, turn}) => ({history, stepNumber, gameStatus, wonLine, turn}),
    {
        onClickBoard: addSymbol,
        onClickMovementHistory: jumpToMove,
    }
)(injectSheet(stylesheet)(TicTacToe));

import React from 'react';
import injectSheet from 'react-jss'
import Board from './board.js'

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

const PLAYER_X = 'X';
const PLAYER_O = 'O';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    getNextPlayer() {
        return this.state.xIsNext? PLAYER_X : PLAYER_O;
    }

    getStatus(winner) {
        let status;
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = 'Next player: ' + this.getNextPlayer();
        }
        return status;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.getNextPlayer();
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = this.getStatus(winner);

        const movementsHistory = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
                <li key={move} className={this.props.classes.li}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className={this.props.classes.game}>
                <div>
                    <Board 
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className={this.props.classes.gameInfo}>
                    <div className={this.props.classes.status}>{status}</div>
                    <ol className={this.props.classes.ol}>{movementsHistory}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default injectSheet(stylesheet)(Game)

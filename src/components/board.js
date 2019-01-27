import React from 'react';
import injectSheet from 'react-jss'
import Square from './square'

const stylesheet = {
    boardRow: {
        '&:after': {
            'clear': 'both',
            'content': '',
            'display': 'table',
        },
    },
}

class Board extends React.Component {
    onClickBoard(cellIndex, symbol) {
        if (this.props.board[cellIndex] == null && this.props.wonLine === undefined) {
            this.props.onClickBoard(cellIndex, symbol);
        }
    }

    renderSquare(cellIndex) {
        let symbol = this.props.board[cellIndex];
        return (
            <Square
                key={cellIndex}
                symbol={symbol}
                turn={this.props.turn}
                onClick={this.onClickBoard.bind(this, cellIndex)}
            />
        );
    }

    render() {
        let board = [];
        let items = [];
        let cellIndex;
        for (let row = 0; row < this.props.size; ++row) {
            for (let column = 0; column < this.props.size; ++column) {
                cellIndex = column + row * this.props.size;
                items.push(this.renderSquare(cellIndex));
            }
            board.push(<div key={row} className={this.props.classes.boardRow}>{items}</div>)
            items = []
        }
        return <div>{board}</div>;
    }
}

export default injectSheet(stylesheet)(Board)

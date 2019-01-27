import React from 'react';
import injectSheet from 'react-jss'

const stylesheet = {
    square: {
        'background': '#fff',
        'border': '1px solid #999',
        'float': 'left',
        'font-size': '24px',
        'font-weight': 'bold',
        'line-height': '34px',
        'height': '34px',
        'margin-right': '-1px',
        'margin-top': '-1px',
        'padding': '0',
        'text-align': 'center',
        'width': '34px',
        '&:focus': {
            'outline': 'none',
            'background': '#ddd',
        },
    },
}

const Square = ({onClick, symbol, turn, classes}) =>
    <button 
        className={classes.square}
        onClick={() => onClick(turn)}
    >
        {symbol}
    </button>;

export default injectSheet(stylesheet)(Square)
import React from 'react';
import injectSheet from 'react-jss'

const stylesheet = {
    square: {
        'background': '#fff',
        'border': '1px solid #000',
        'float': 'left',
        'font-size': '24px',
        'font-weight': 'bold',
        'line-height': '34px',
        'height': '64px',
        'margin-right': '-1px',
        'margin-top': '-1px',
        'padding': '0',
        'text-align': 'center',
        'width': '64px',
        '&:focus': {
            'outline': 'none',
            'background': '#fff',
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
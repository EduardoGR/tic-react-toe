
export const ACTION_TYPE_JUMP_TO_MOVE = 'JUMP_TO_MOVE';

export const ACTION_TYPE_ADD_SYMBOL = 'ADD_SYMBOL';

export const addSymbol = (position, symbol) => ({
    type: ACTION_TYPE_ADD_SYMBOL,
    position,
    symbol
});

export const jumpToMove = stepNumber => ({
    type: ACTION_TYPE_JUMP_TO_MOVE,
    stepNumber,
});
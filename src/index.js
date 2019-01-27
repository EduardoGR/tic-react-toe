import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { ticTactToeReducer} from './reducers/tic-tac-toe';
import TicTacToe from './components/tic-tac-toe'

const store = createStore(
    ticTactToeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <TicTacToe />
    </Provider>,
    document.getElementById('root')
);

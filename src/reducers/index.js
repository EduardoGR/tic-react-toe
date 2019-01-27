import { combineReducers } from 'redux'
import ticTactToeReducer from './tic-tact-toe'

const reducer = combineReducers({
  ticTacToe: ticTactToeReducer,
});

export default reducer
import loanReducer from './Loan.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    loans: loanReducer
});

export default rootReducer;
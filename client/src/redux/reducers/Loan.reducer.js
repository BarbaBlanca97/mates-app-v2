const initalState = [];

/**
 * Reductor de prestamos, mapea a state.loans
 */
const loanReducer = (state = initalState, action) => {
    let newState;

    switch (action.type) {
        case 'REFRESH_LOANS': {
            newState = action.loans;
            break;
        }

        case 'CREATE_LOAN': {
            newState = [ ...state, action.loan ];
            break;
        }

        default:
            newState = state;
            break;
    }

    return newState;
}

export default loanReducer;
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
            newState = [...state, action.loan];
            break;
        }

        case 'RECIVE_LOAN': {
            newState = state.map((loan) => {
                return loan._id === action._id ?
                    {
                        ...loan,
                        devolucion: action.recivedLoan
                    } :
                    loan;
            });
            
            break;
        }

        default:
            newState = state;
            break;
    }

    return newState;
}

export default loanReducer;
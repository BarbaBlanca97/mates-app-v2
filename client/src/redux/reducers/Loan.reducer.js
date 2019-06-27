const initalState = {
    loans: [],
    retrievingData: false
};

/**
 * Reductor de prestamos, mapea a state.loans
 */
const loanReducer = (state = initalState, action) => {
    let newState;

    switch (action.type) {
        case 'REFRESH_LOANS': {
            newState = {
                loans: action.loans,
                retrievingData: false
            }
            break;
        }

        case 'CREATE_LOAN': {
            newState = newState = {
                ...state,
                loans: [...state.loans, action.loan]
            }
            break;
        }

        case 'RECIVE_LOAN': {
            newState = {
                ...state,
                loans: state.loans.map((loan) => {
                    return loan._id === action._id ?
                        {
                            ...loan,
                            devolucion: action.recivedLoan
                        } :
                        loan;
                })
            }
            break;
        }

        case 'SHOW_LOADING': {
            newState = {
                ...state,
                retrievingData: true
            }
            break;
        }

        default:
            newState = state;
            break;
    }

    return newState;
}

export default loanReducer;
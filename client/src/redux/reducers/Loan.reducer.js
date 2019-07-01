const initalState = {
    loans: [],
    retrievingData: false,
    dataFilters: {},
    dataOffset: 0,
    dataLimit: 10
};

/**
 * Reductor de prestamos, mapea a state.loans
 */
const loanReducer = (state = initalState, action) => {
    let newState;

    switch (action.type) {
        case 'REFRESH_LOANS': {
            newState = {
                ...state,
                loans: action.loans,
                retrievingData: false
            }
            break;
        }

        case 'CREATE_LOAN': {
            newState = {
                ...state,
                retrievingData: false,
                loans: [...state.loans, action.loan]
            }
            break;
        }

        case 'RECIVE_LOAN': {
            newState = {
                ...state,
                retrievingData: false,
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
            };
            break;
        }

        case 'CHANGE_PAGINATION': {
            newState = {
                ...state,
                dataOffset: action.offset,
                dataLimit: action.limit
            };
            break;
        }

        case 'UPDATE_DATA_FILTERS': {
            newState = {
                ...state,
                dataFilters: action.newDataFilters
            };
            break;
        }

        default:
            newState = state;
            break;
    }

    return newState;
}

export default loanReducer;
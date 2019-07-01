import api from '../../api/api';

/*
Una especie de action creator, intercepta el dispatch */
const getLoans = (offset = 0, limit = 10) => {

    return (dispatch, getState) => {
        const { dataFilters } = getState().loans;
        /*
        ejecucion de codigo asincrono en el dispatch, gracias a thunk */
        api.getLoans(offset, limit, dataFilters)
            .then((loans) => {
                dispatch(changePagintationState(offset, limit));
                dispatch({ // verdadera llamada al dispatch
                    type: 'REFRESH_LOANS',
                    loans: loans
                });
            })
            .catch(() => { });
    }
}

const createLoan = (loan) => {

    return (dispatch) => {
        api.createLoan(loan)
            .then((newLoan) => {
                dispatch({
                    type: 'CREATE_LOAN',
                    loan: newLoan
                });
            })
            .catch(() => { });
    }
}

const reciveLoan = (recivedLoan) => {

    return (dispatch) => {
        api.reciveLoan({
            _id: recivedLoan._id,
            devolucion: {
                mates: recivedLoan.mates,
                bombillas: recivedLoan.bombillas,
                termos: recivedLoan.termos
            }
        })
            .then((updatedLoan) => {
                dispatch({
                    type: 'RECIVE_LOAN',
                    _id: updatedLoan._id,
                    recivedLoan: updatedLoan.devolucion
                });
            })
            .catch(() => { });
    }
}

const changePagintationState = (offset, limit) => {
    return {
        type: 'CHANGE_PAGINATION',
        offset,
        limit
    }
}  

const updateDataFilters = (newDataFilters) => {
    return {
        type: "UPDATE_DATA_FILTERS",
        newDataFilters
    }
}

const showLoadingIndicator = () => {
    return {
        type: "SHOW_LOADING"
    }
}

export { 
    reciveLoan, 
    getLoans, 
    createLoan,
    updateDataFilters,
    showLoadingIndicator
 };
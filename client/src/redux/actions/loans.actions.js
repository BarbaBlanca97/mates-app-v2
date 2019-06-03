import api from '../../api/api';

/*
Una especie de action creator, intercepta el dispatch */
const getLoans = () => {

    return (dispatch) => {
        /*
        ejecucion de codigo asincrono en el dispatch, gracias a thunk */
        api.getLoans()
            .then((loans) => {
                dispatch({ // verdadera llamada al dispatch
                    type: 'REFRESH_LOANS',
                    loans: loans
                });
            });
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
        });
    }
}

export { getLoans, createLoan };
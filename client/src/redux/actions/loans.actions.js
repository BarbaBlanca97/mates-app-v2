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
            })
            .catch(()=>{});
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
            .catch(()=>{});
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
            .catch(()=>{});
    }
}

export { reciveLoan, getLoans, createLoan };
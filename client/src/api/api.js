import axios from 'axios';

const baseUrl = '/api'

const getLoans = function () {
  return axios.get(baseUrl + '/prestamos')
    .then(function (res) {
      return res.data.map(
        (loan) => {
          return {
            _id: loan._id,
            dni: loan.persona.dni,
            name: `${loan.persona.name} ${loan.persona.lastName}`,
            pedido: loan.pedido,
            devolucion: loan.devolucion
          }
        }
      );
    })
    .catch(function (error) {
      console.log('error fetcheando loans', error);
      return [];
    });
}

/**
 * Crea un pedido con los datos especificados
 * @param {{
 * persona:{
 *  dni: number,
 *  name: string,
 *  lastName: string
 * },
 * pedido:{
 *  mates: number,
 *  bombillas: number,
 *  termos: number,
 *  yerba: true
 * }
 * }} loan
 */
const createLoan = function (loan) {
  return axios.post(baseUrl + '/prestamos', loan)
    .then((res) => {
      return {
        _id: res.data._id,
        dni: res.data.persona.dni,
        name: `${res.data.persona.name} ${res.data.persona.lastName}`,
        pedido: res.data.pedido,
        devolucion: res.data.devolucion
      };
    })
    .catch((error) => {
      console.log('error creando puesto', error);
      return null;
    });
}

export default {
  getLoans,
  createLoan
}
import axios from 'axios';

const baseUrl = '/api'
/**
 * 
 * @param { number } offset 
 * @param { number } limit 
 * @param { {
 *  nombre: string,
 *  apellido: string,
 *  dni: number,
 *  devuelto: boolean
 * } } query 
 */
const getLoans = function (offset = 0, limit = 10, query = {}) {
  return axios.get(`${baseUrl}/prestamos`,
    {
      method: 'get',
      params: {
        offset,
        limit,
        ...(query.nombre && { nombre: query.nombre }),
        ...(query.apellido && { apellido: query.apellido }),
        ...(query.dni && { dni: query.dni }),
        ...(!(query.devuelto == null) && { devuelto: query.devuelto })
      }
    })
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
 *  yerba: boolean
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

const reciveLoan = function (recivedLoan) {
  return axios.put(baseUrl + '/prestamos', recivedLoan)
    .then((res) => {
      if (!res.data) return Promise.reject({ message: "respuesta nula" });

      return {
        _id: res.data._id,
        dni: res.data.persona.dni,
        name: `${res.data.persona.name} ${res.data.persona.lastName}`,
        pedido: res.data.pedido,
        devolucion: res.data.devolucion
      }
    })
    .catch((error) => {
      console.log('error recibiendo prestamo', error);
      return Promise.reject(error);
    });
}

export default {
  getLoans,
  createLoan,
  reciveLoan
}
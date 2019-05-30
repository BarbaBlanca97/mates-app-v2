import React from 'react';

import {
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from 'mdbreact';

/**
 * Toma un array de loans y los muestra en una tabla
 * @property { loan[] } loans: arreglo de prestamos
 */
class LoansTable extends React.Component {
    render () {
        return (
            <div className="table-container">
            <MDBTable hover className="text-center">
                <MDBTableHead>
                <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Pedido</th>
                    <th>Devolución</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                    { this.props.loans.map((value) => {
                        return (
                        <tr key={ value._id } >
                            <td className="align-middle"> {value._id} </td>
                            <td className="align-middle"> {value.dni} </td>
                            <td className="align-middle"> {value.name} </td>
                            <td>
                                <LoanTableDisplay { ...value.pedido } />
                            </td>
                            <td className="align-middle">
                            { value.devolucion ?
                                <LoanTableDisplay { ...value.devolucion } devolucion />
                                :
                                <span className="text-danger" >No devuelto</span>
                            }
                            </td>
                        </tr>);
                    }) }
                </MDBTableBody>
            </MDBTable>
            </div>
        );
    }
}

const LoanTableDisplay = function (props) {
    return (
        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column mx-1">
                <div><strong>M</strong></div>
                <div>{ props.mates }</div>
            </div>

            <div className="d-flex flex-column mx-1">
                <div><strong>B</strong></div>
                <div>{ props.bombillas }</div>
            </div>

            <div className="d-flex flex-column ml-1 mr-2">
                <div><strong>T</strong></div>
                <div>{ props.termos }</div>
            </div>

            { !props.devolucion ?
            <div className="d-flex flex-column">
                <div><strong>Y</strong></div>
                <div>{ props.yerba ? 'Si' : 'No' }</div>
            </div>
            :
            '' }
        </div>
    );
}

export default LoansTable;
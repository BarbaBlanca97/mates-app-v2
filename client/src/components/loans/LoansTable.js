import React from 'react';

import SimpleLoanDisplay from './SimpleLoanDisplay';

import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBPopover
} from 'mdbreact';

/**
 * Toma un array de loans y los muestra en una tabla
 * @property { loan[] } loans: arreglo de prestamos
 */
class LoansTable extends React.Component {
    render () {

        return (
            <MDBTable hover>
                <MDBTableHead>
                <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Pedido</th>
                    <th>Devolucion</th>
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
                                <LoanPopOver loan={ value.pedido } _id={ value._id }/>
                            </td>
                            <td className="align-middle">
                            { value.devolucion ?
                                <LoanPopOver
                                    devolucion
                                    loan={ value.devolucion }
                                    _id={ value._id }
                                /> :
                                <span className="text-danger" >No devuelto</span>
                            }
                            </td>
                        </tr>);
                    }) }
                </MDBTableBody>
            </MDBTable>
        );
    }
}

/**
 * Un boton al que le haces click y muestra informacion sobre el pedido o devolucion
 * @property { devolucion? } devolucion: Indica si es una devolucion, por defecto se trata como pedido
 * @property { loan } loan: El pedido a mostrar
 */
class LoanPopOver extends React.Component {
    render () {
        return (
            <MDBPopover
                placement = "bottom"
                popover
                clickable
                id = { this.props._id + '-popper' }
            >
                <MDBBtn /* Que esté lo más chiquito posible porque está en una tabla */
                    outline
                    style={{ margin: 0 }}
                    color="stylish-color-dark"
                    size="sm"
                >
                    { !this.props.devolucion ? 'VER PEDIDO' : 'VER DEVOLUCION' }
                </MDBBtn>
                <div style={{ width: "200px" }}>
                    <SimpleLoanDisplay loan={ this.props.loan }></SimpleLoanDisplay>
                </div>
            </MDBPopover>
        );
    }
}

export default LoansTable;
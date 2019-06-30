import React from 'react';

import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn
} from 'mdbreact';

import ReciveLoan from './ReciveLoan';

/**
 * Toma un array de loans y los muestra en una tabla
 * @property { loan[] } loans: arreglo de prestamos
 */
class LoansTable extends React.Component {
    render() {
        let paginationStyle = {
            "position": "absolute",
            "left": "0",
            "top": "0",
            "right": "auto",
            "bottom": "0",
            "margin": "auto"
        }

        return (
            <div className="text-center d-flex flex-column h-100 overflow-auto">
                <MDBTable
                    hover
                    className="text-center"
                    maxHeight="100%"
                    scrollY={true}
                >
                    <MDBTableHead>
                        <tr>
                            <th>ID</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Pedido</th>
                            <th>Devolución</th>
                            <th>Acciones</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.props.loans.map((value) => {
                            return (
                                <tr key={value._id} >
                                    <td className="align-middle"> {value._id} </td>
                                    <td className="align-middle"> {value.dni} </td>
                                    <td className="align-middle"> {value.name} </td>
                                    <td>
                                        <LoanTableDisplay {...value.pedido} />
                                    </td>
                                    <td className="align-middle">
                                        {value.devolucion ?
                                            <LoanTableDisplay {...value.devolucion} devolucion />
                                            :
                                            <span className="text-danger" >No devuelto</span>
                                        }
                                    </td>
                                    <td className="align-middle">
                                        {!value.devolucion ?
                                            <ReciveLoan _id={value._id}></ReciveLoan> :
                                            <span> Devuelto </span>
                                        }
                                    </td>
                                </tr>);
                        })}
                    </MDBTableBody>
                </MDBTable>
                <div className="position-relative d-flex flex-row justify-content-center mt-1" >
                    {this.props.loading ? <div style={paginationStyle} className="ml-3 my-2"><div className="spinner-border spinner-border-sm text-info" ></div></div> : ""}
                    <div>
                        {this.props.showPreviousPage ?
                            <MDBBtn
                                size="sm"
                                color="white"
                                className="z-depth-0"
                                onClick={this.props.onPreviousPage}
                            > Mostrar anteriores </MDBBtn> : ""}
                        {this.props.showNextPage ?
                            <MDBBtn
                                size="sm"
                                color="white"
                                className="z-depth-0"
                                onClick={this.props.onNextPage}
                            > Mostrar siguientes </MDBBtn> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

const LoanTableDisplay = function (props) {

    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-column mx-1">
                <div><strong>M</strong></div>
                <div>{props.mates}</div>
            </div>

            <div className="d-flex flex-column mx-1">
                <div><strong>B</strong></div>
                <div>{props.bombillas}</div>
            </div>

            <div className="d-flex flex-column ml-1 mr-2">
                <div><strong>T</strong></div>
                <div>{props.termos}</div>
            </div>

            {!props.devolucion ?
                <div className="d-flex flex-column">
                    <div><strong>Y</strong></div>
                    <div>{props.yerba ? 'Si' : 'No'}</div>
                </div>
                :
                ''}
        </div>
    );
}

export default LoansTable;
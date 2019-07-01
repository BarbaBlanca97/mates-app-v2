import React from 'react';

import {
    MDBInput, MDBFormInline, MDBBtn
} from 'mdbreact';

class SearchLoan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            apellido: '',
            dni: '',
            selectedBox: 0
        }

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBoxChecks = this.handleBoxChecks.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let filters = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            dni: this.state.dni,
            ...(this.state.selectedBox !== 0 && { devuelto: this.state.selectedBox === 1 ? true : false})
        }
        this.props.onSearch(filters);
    }

    handleBoxChecks(box) {
        this.setState((state) => ({ selectedBox: (box === state.selectedBox) ? 0 : box }))
    }

    handleInputChanges(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <MDBFormInline
                className="d-flex justify-content-center align-items-center"
                onSubmit={this.handleSubmit}
            >
                <MDBBtn
                    color="white"
                    size="md"
                    onClick={this.handleSubmit}
                > Buscar </MDBBtn>
                <div className="mx-2">
                    <MDBInput
                        id="dni"
                        outline
                        label="DNI"
                        type="number"
                        className="mb-0"
                        value={this.state.dni}
                        onChange={(event) => { this.handleInputChanges(event) }}
                    ></MDBInput>
                </div>
                <div className="mx-2">
                    <MDBInput
                        id="nombre"
                        outline
                        label="Nombre"
                        className="mb-0"
                        value={this.state.nombre}
                        onChange={(event) => { this.handleInputChanges(event) }}
                    ></MDBInput>
                </div>
                <div className="mx-2">
                    <MDBInput
                        id="apellido"
                        outline
                        label="Apellido"
                        className="mb-0"
                        value={this.state.apellido}
                        onChange={(event) => { this.handleInputChanges(event) }}
                    ></MDBInput>
                </div>

                <div className="text-center"><span>Devuelto</span>
                    <div className="d-flex flex-row">
                        <div className="form-check mx-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="devuelto-si"
                                onChange={() => { this.handleBoxChecks(1) }}
                                checked={ this.state.selectedBox === 1 }
                            />
                            <label htmlFor="devuelto-si" className="grey-text">Si</label>
                        </div>

                        <div className="form-check mx-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="devuelto-no"
                                onChange={() => { this.handleBoxChecks(2) }}
                                checked={ this.state.selectedBox === 2 }
                            />
                            <label htmlFor="devuelto-no" className="grey-text">No</label>
                        </div></div>
                </div>
            </MDBFormInline>
        );
    }
}

export default SearchLoan;
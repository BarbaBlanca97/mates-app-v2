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
            dni: ''
        }

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state);
    }

    handleInputChanges(event) {
        if (event.target.type === 'checkbox')
            this.setState({ devuelto: event.target.checked });
        else
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


                <div className="form-check mx-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="devuelto"
                        onChange={(event) => { this.handleInputChanges(event) }}
                    />
                    <label htmlFor="devuelto" className="grey-text">Devuelto</label>
                </div>
            </MDBFormInline>
        );
    }
}

export default SearchLoan;
import React from 'react';
/*
Component imports */
import {
    MDBInput,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdbreact';

class CreateLoan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dni: 0,
            name: '',
            lastName: '',
            mates: 0,
            bombillas: 0,
            termos: 0,
            yerba: false
        }

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);
    }

    handleInputChanges(e) {
        let value;
        /*
        Estaría bueno tener este parser como función auxiliar */
        switch (e.target.type) {
            case 'number':
                value = parseInt(e.target.value)
                break;

            case 'checkbox':
                value = e.target.checked
                break;

            case 'text':
                value = e.target.value
                break;
        }

        this.setState({
            [e.target.id]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault(); // Evitando que se recargue la página con el submit
        /*
        Callback para reportar submit */
        this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <div className="text-center">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <h5> Cliente </h5>

                        <MDBInput
                            label="DNI"
                            type="number"
                            group
                            validate
                            error="wrong"
                            outline
                            id="dni"
                            onChange={(event) => { this.handleInputChanges(event) }}
                        />
                        <MDBInput
                            label="Nombre"
                            type="text"
                            group
                            validate
                            error="wrong"
                            outline
                            id="name"
                            onChange={(event) => { this.handleInputChanges(event) }}
                        />
                        <MDBInput
                            label="Apellido"
                            type="text"
                            group
                            validate
                            error="wrong"
                            outline
                            id="lastName"
                            onChange={(event) => { this.handleInputChanges(event) }}
                        />

                        <h5> Pedido </h5>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput
                                    label="Mates"
                                    type="number"
                                    group
                                    validate
                                    error="wrong"
                                    outline
                                    id="mates"
                                    onChange={(event) => { this.handleInputChanges(event) }}
                                    value={ this.state.mates.toString() }
                                />

                                <MDBInput
                                    label="Bombillas"
                                    type="number"
                                    group
                                    validate
                                    error="wrong"
                                    outline
                                    id="bombillas"
                                    onChange={(event) => { this.handleInputChanges(event) }}
                                    value={ this.state.bombillas.toString() }
                                />
                            </MDBCol>

                            <MDBCol>
                                <MDBInput
                                    label="Termos"
                                    type="number"
                                    group
                                    validate
                                    error="wrong"
                                    outline
                                    id="termos"
                                    onChange={(event) => { this.handleInputChanges(event) }}
                                    value={ this.state.termos.toString() }
                                />

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="yerba"
                                        onChange={(event) => { this.handleInputChanges(event) }}
                                    />
                                    <label htmlFor="yerba" className="grey-text">Yerba</label>
                                </div>
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn type="submit" size="md" color="primary"> CREAR </MDBBtn>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateLoan;
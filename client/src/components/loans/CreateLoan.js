import React from 'react';
/*
Component imports */
import {
    MDBInput,
    MDBBtn
} from 'mdbreact';

class CreateLoan extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            mates: 0,
            bombillas: 0,
            termos: 0,
            yerba: false
        }

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChanges (e) {
        this.setState({
            [e.target.id]: e.target.type === "number" ? parseInt(e.target.value) : e.target.checked
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <div className="text-center">
                <form onSubmit={ this.handleSubmit }>
                <div>

                    <MDBInput
                        label="Mates"
                        type="number"
                        group
                        validate
                        error="wrong"
                        outline
                        id="mates"
                        onChange={ (event) => { this.handleInputChanges(event) }}
                        // placeholder="0"
                    />

                    <MDBInput
                        label="Bombillas"
                        type="number"
                        group
                        validate
                        error="wrong"
                        outline
                        id="bombillas"
                        onChange={ (event) => { this.handleInputChanges(event) }}
                        // placeholder="0"
                    />

                    <MDBInput
                        label="Termos"
                        type="number"
                        group
                        validate
                        error="wrong"
                        outline
                        id="termos"
                        onChange={ (event) => { this.handleInputChanges(event) }}
                        // placeholder="0"
                    />

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="yerba"
                            onChange={ (event) => { this.handleInputChanges(event) }}
                        />
                        <label htmlFor="yerba" className="grey-text">Yerba</label>
                    </div>
                    <MDBBtn type="submit" size="md" color="primary"> CREAR </MDBBtn>
                </div>
                </form>
            </div>
        );
    }
}

export default CreateLoan;
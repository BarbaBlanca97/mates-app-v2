import React from 'react';

import {
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBModal,
    MDBModalHeader,
    MDBModalBody
} from 'mdbreact';

import { connect } from 'react-redux';
import { reciveLoan } from '../../redux/actions/loans.actions';

class ReciveLoan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState((state) => {
            return { modal: !state.modal }
        });
    }

    handleSubmit(recivedLoan) {
        this.toggleModal();
        this.props.dispatch(reciveLoan({ ...recivedLoan, _id: this.props._id }));
    }

    render() {
        return (
            <div>
                <MDBBtn
                    size="sm"
                    className="z-depth-0"
                    outline
                    onClick={this.toggleModal}
                ><MDBIcon icon="check" /></MDBBtn>

                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
                    <MDBModalHeader toggle={this.toggleModal}>Recibir prestamo</MDBModalHeader>

                    <MDBModalBody>
                        <ReciveLoanForm handleSubmit={ this.handleSubmit }></ReciveLoanForm>
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

class ReciveLoanForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            mates: 0,
            bombillas: 0,
            termos: 0
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.id]: parseInt(event.target.value)
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={ (event) => {this.handleSubmit(event) } }>
                <div>
                    <MDBInput
                        label="Mates"
                        id="mates"
                        type="number"
                        outline
                        validate
                        error="wrong"
                        onChange={(event) => { this.handleInputChange(event) }}
                        value={ this.state.mates.toString() }
                    />

                    <MDBInput
                        label="Bombillas"
                        id="bombillas"
                        type="number"
                        outline
                        validate
                        error="wrong"
                        onChange={(event) => { this.handleInputChange(event) }}
                        value={ this.state.bombillas.toString() }
                    />

                    <MDBInput
                        label="Termos"
                        id="termos"
                        type="number"
                        outline
                        validate
                        error="wrong"
                        onChange={(event) => { this.handleInputChange(event) }}
                        value={ this.state.termos.toString() }
                    />

                    <div className="text-right">
                        <MDBBtn
                            type="submit"
                            size="sm"
                        > ENVIAR </MDBBtn>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect()(ReciveLoan);
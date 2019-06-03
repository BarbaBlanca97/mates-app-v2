import React from 'react';

import {
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader
} from 'mdbreact';

import CreateLoan from './CreateLoan';
import { connect } from 'react-redux';
import { createLoan } from '../../redux/actions/loans.actions';

class NewLoan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }

        this.toggleModal        = this.toggleModal.bind(this);
        this.handleLoanSubmit   = this.handleLoanSubmit.bind(this);
    }

    toggleModal() {
        this.setState((state) => {
            return {
                modal: !state.modal
            }
        });
    }

    handleLoanSubmit(loan) {
        console.log(loan);
        this.props.dispatch(createLoan({
            persona: {
                dni: loan.dni,
                name: loan.name,
                lastName: loan.lastName,
                facultad: 'unknown'
            },
            pedido: {
                mates: loan.mates,
                bombillas: loan.bombillas,
                termos: loan.termos,
                yerba: loan.yerba
            }
        }));
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <MDBBtn
                    size="md"
                    onClick={this.toggleModal}
                ><MDBIcon icon="plus" className="mr-1" /> NUEVO </MDBBtn>

                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} size="md">
                    <MDBModalHeader toggle={this.toggleModal}>Nuevo préstamo</MDBModalHeader>
                    <MDBModalBody>
                        <CreateLoan handleSubmit={loan => this.handleLoanSubmit(loan)} />
                    </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default connect()(NewLoan);
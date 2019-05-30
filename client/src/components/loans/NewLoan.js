import React from 'react';

import {
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader
} from 'mdbreact';

import CreateLoan from './CreateLoan';

class NewLoan extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.handleLoanSubmit = this.handleLoanSubmit.bind(this);
    }

    toggle () {
        this.setState((state) => {
            return {
                modal: !state.modal
            }
        });
    }

    handleLoanSubmit (loan) {
        console.log(loan);
        this.toggle();
    }

    render () {
        return (
            <div>
                <MDBBtn
                    size="md"
                    onClick={ this.toggle }
                > <MDBIcon icon="plus" className="mr-1" /> NUEVO </MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="sm">
                    <MDBModalHeader toggle={this.toggle}>Nuevo préstamo</MDBModalHeader>
                        <MDBModalBody>
                            <CreateLoan handleSubmit={ loan => this.handleLoanSubmit(loan) }/>
                        </MDBModalBody>
                </MDBModal>
            </div>
        );
    }
}

export default NewLoan;
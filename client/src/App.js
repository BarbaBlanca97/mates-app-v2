import React from 'react';
import './App.css';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer
} from 'mdbreact';

/*
Component modules imports */
import LoansTable from './components/loans/LoansTable';
import NewLoan from './components/loans/NewLoan';

import api from './api/api';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loans: [] /*
      loans structure: { _id, dni, name, loan, devolucion },
      */
    }
  }

  componentDidMount() {
    this.getLoans();
  }

  getLoans() {
    api.getLoans()
      .then((loans) => {/* Parseo de la respuesta */
        const parsedLoans = loans.map(
          (loan) => {
            return {
              _id: loan._id,
              dni: loan.persona.dni,
              name: `${loan.persona.name} ${loan.persona.lastName}`,
              pedido: loan.pedido,
              devolucion: loan.devolucion
            }
          }
        );

        this.setState({ loans: parsedLoans });
      });
  }

  render() {
    return (
      <div>
          <MDBNavbar color="white" >
            <MDBNavbarBrand><strong>Mates App</strong></MDBNavbarBrand>
          </MDBNavbar>

          <MDBContainer
            fluid
            className="d-flex justify-content-center w-responsive"
            >
          <MDBCard
            className="card w-100"
            wide
          >

            <MDBCardBody style={{ paddingLeft: "0px", paddingRight: "0px" }}>
              <div className="d-flex flex-row justify-content-between align-items-center mx-5">
                <MDBCardTitle> Pedidos </MDBCardTitle>
                
                <NewLoan />
              </div>

              <LoansTable loans={this.state.loans}></LoansTable>
            </MDBCardBody>

          </MDBCard>

          </MDBContainer>
      </div>
    );
  }
}

export default App;

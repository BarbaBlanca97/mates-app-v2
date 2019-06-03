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
import { getLoans } from './redux/actions/loans.actions';

import { connect } from 'react-redux';

class App extends React.Component {

  /*
  En la activacion del componente se despacaha la accion REFRESH_LOANS */
  componentDidMount() {
    this.props.dispatch(getLoans());
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

            <MDBCardBody className="px-0">
              <div className="d-flex flex-row justify-content-between align-items-center mx-5">
                <MDBCardTitle> Pedidos </MDBCardTitle>
                
                <NewLoan />
              </div>

              <LoansTable loans={this.props.loans}></LoansTable>
            </MDBCardBody>

          </MDBCard>

          </MDBContainer>
      </div>
    );
  }
}

/*
Cada cambio de estado se envia a travez de las props
por el provider, esta funcion mapea lo interesante */
const mapStateToProps = (state) => {
  return {
    loans: state.loans
  }
}

export default connect(mapStateToProps)(App);

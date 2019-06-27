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
import { getLoans, changePage } from './redux/actions/loans.actions';

import { connect } from 'react-redux';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      dataOffset: 0,
      dataLimit: 10
    }

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviosPage = this.handlePreviosPage.bind(this);
  }
  /*
  En la activacion del componente se despacaha la accion REFRESH_LOANS */
  componentDidMount() {
    this.props.dispatch(getLoans());
  }

  handlePreviosPage() {
    if (this.state.dataOffset > 0) {
      let nextDataOffset = this.state.dataOffset - 10;

      if (nextDataOffset < 0) nextDataOffset = 0;

      this.setState({ dataOffset: nextDataOffset });
      this.props.dispatch(changePage(nextDataOffset, this.state.dataLimit));
      this.props.dispatch({ type: 'SHOW_LOADING' });
    }
  }

  handleNextPage() {
    let nextDataOffset = this.state.dataOffset + 10;

    this.setState({ dataOffset: nextDataOffset });
    this.props.dispatch(changePage(nextDataOffset, this.state.dataLimit));
    this.props.dispatch({ type: 'SHOW_LOADING' });
  }

  render() {
    return (
      <div id="app">
        <MDBNavbar color="white" fixed="top" >
          <MDBNavbarBrand><strong>Mates App</strong></MDBNavbarBrand>
        </MDBNavbar>
        <MDBContainer
          fluid
          className="d-flex justify-content-center w-responsive pt-5 pb-1 app-content h-100"
        >
          <MDBCard
            className="card w-100 mb-1"
            wide
          >

            <MDBCardBody className="px-0 h-100 d-flex flex-column">
              <div className="d-flex flex-row justify-content-between align-items-center mx-5 mb-3">
                <MDBCardTitle> Pedidos </MDBCardTitle>

                <NewLoan />
              </div>

              <LoansTable
                loans={this.props.loans}
                onPreviousPage={this.handlePreviosPage}
                onNextPage={this.handleNextPage}
                showPreviousPage={ this.state.dataOffset > 0 }
                showNextPage={ this.props.loans.length >= this.state.dataLimit }
                loading={ this.props.tableLoading }
                 ></LoansTable>
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
    loans: state.loans.loans,
    tableLoading: state.loans.retrievingData
  }
}

export default connect(mapStateToProps)(App);

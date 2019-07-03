import React from 'react';
import './App.css';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCollapse
} from 'mdbreact';

/*
Component modules imports */
import LoansTable from './components/loans/LoansTable';
import NewLoan from './components/loans/NewLoan';

import { 
  getLoans,
  createLoan,
  showLoadingIndicator,
  updateDataFilters
} from './redux/actions/loans.actions';

import { connect } from 'react-redux';
import SearchLoan from './components/loans/SearchLoan';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSearchOpen: false
    }

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviosPage = this.handlePreviosPage.bind(this);
    this.handleOpenSearchMenu = this.handleOpenSearchMenu.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  /*
  En la activacion del componente se despacaha la accion REFRESH_LOANS */
  componentDidMount() {
    this.props.dispatch(getLoans());
  }

  handleFilterChange(query) {
    this.props.dispatch(updateDataFilters(query));
    this.props.dispatch(getLoans(0, this.props.dataLimit));
    this.props.dispatch(showLoadingIndicator());
  }

  handleOpenSearchMenu() {
    this.setState((state) => ({
      isSearchOpen: !state.isSearchOpen
    }));
  }

  handlePreviosPage() {
    if (this.props.dataOffset > 0) {
      let nextDataOffset = this.props.dataOffset - 10;

      if (nextDataOffset < 0) nextDataOffset = 0;

      this.props.dispatch(getLoans(nextDataOffset, this.props.dataLimit));
      this.props.dispatch(showLoadingIndicator());
    }
  }

  handleNextPage() {
    let nextDataOffset = this.props.dataOffset + this.props.dataLimit;

    this.props.dispatch(getLoans(nextDataOffset, this.props.dataLimit));
    this.props.dispatch(showLoadingIndicator());
  }

  handleNewLoanSubmit(newLoan) {
    console.log(newLoan);
    this.props.dispatch(createLoan({
        persona: {
            dni: newLoan.dni,
            name: newLoan.name,
            lastName: newLoan.lastName,
            facultad: 'unknown'
        },
        pedido: {
            mates: newLoan.mates,
            bombillas: newLoan.bombillas,
            termos: newLoan.termos,
            yerba: newLoan.yerba
        }
    }));
    this.props.dispatch(showLoadingIndicator());
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
              <div className="d-flex flex-row justify-content-between align-items-center mx-5">
                <MDBCardTitle className="mb-0"> Pedidos </MDBCardTitle>

                <div className="d-flex flex-row">
                  <MDBBtn
                    size="md"
                    color="white"
                    onClick={this.handleOpenSearchMenu}
                  >{ this.state.isSearchOpen ?
                    <MDBIcon icon="times" className="red-text mr-1" /> : '' }
                    <MDBIcon icon="search" />
                  </MDBBtn>

                  <NewLoan handleSubmit={ (newLoan) => { this.handleNewLoanSubmit(newLoan) }}/>
                </div>
              </div>

              <MDBCollapse
                isOpen={ this.state.isSearchOpen }
              >
                  <SearchLoan
                    className="mx-auto"
                    onSearch={ (query) => { this.handleFilterChange(query) }}
                  />
              </MDBCollapse>

              <LoansTable
                loans={this.props.loans}
                onPreviousPage={this.handlePreviosPage}
                onNextPage={this.handleNextPage}
                showPreviousPage={this.props.dataOffset > 0}
                showNextPage={this.props.loans.length >= this.props.dataLimit}
                loading={this.props.tableLoading}
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
    tableLoading: state.loans.retrievingData,
    dataOffset: state.loans.dataOffset,
    dataLimit: state.loans.dataLimit
  }
}

export default connect(mapStateToProps)(App);

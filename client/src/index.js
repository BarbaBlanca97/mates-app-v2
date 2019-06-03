import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* MDB style imports*/
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootreducer from './redux/reducers/Root.reducer';
import thunk from 'redux-thunk';

/*
thunk se encarga de aplicar un middleware a las llamadas a dispatch,
el código asíncrono se ejecuta ahí (llamadas a api) */
const store = createStore(rootreducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

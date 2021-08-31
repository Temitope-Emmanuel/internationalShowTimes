import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './layout/App';
import './assets/scss/style.scss';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import configureStore from './store/index';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

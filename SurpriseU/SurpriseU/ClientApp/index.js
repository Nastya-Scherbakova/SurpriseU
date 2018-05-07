import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import { injectGlobal } from 'styled-components'

import { globalStyles } from './ui/theme'
import './styles/Site.scss'
import configureStore from './configureStore';
import { Root } from './routes';
const store = configureStore(window.initialStore || {})

injectGlobal`${globalStyles}`
renderApp();

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    ReactDOM.render(
        <BrowserRouter>
            <Root store={store} />
        </BrowserRouter>,
        document.getElementById('react-app')
    );
}

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = ('./routes').routes;
        renderApp();
    });
}


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as RoutesModule from './routes';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import commonStore from './store/commonStore';
import presentsStore from './store/presentsStore';
let routes = RoutesModule.routes;

const stores = {
    commonStore,
    presentsStore
};

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    ReactDOM.render(
        <AppContainer>
            <Provider {...stores}>
            <BrowserRouter children={ routes } basename={ baseUrl } />
            </Provider>
                </AppContainer>,
        document.getElementById('react-app')
    );
}

useStrict(true);
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = ('./routes').routes;
        renderApp();
    });
}

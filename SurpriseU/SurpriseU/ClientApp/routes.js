import * as React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import Layout from './ui/layout';
import { Home, Anketa, NotFound } from './ui/pages';
import {
    EditUser,
    Profile,
    Offers,
    Likes,
    Friends,
    Login,
    AuthHOC,
    PresentPage,
    NewPresent,
    EditPresent
} from './features';


export const Root = ({ store }) => (
    <Provider store={store}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/anketa' component={Anketa} />
            <Route path="/login" component={Login} />
            <Route path="/presents/new" component={NewPresent} />
            <Route path="/edit/:section" component={AuthHOC(EditUser)} />
            <Route path="/id:id/offers" component={Offers} />
            <Route exact path="/id:id" component={AuthHOC(Profile)} />
            <Route path="/id:id/likes" component={Likes} />
            <Route path="/id:id/friends" component={Friends} />
            <Route exact path="/present/:id" component={PresentPage} />
            <Route path="/present/:id/edit" component={EditPresent} />
            <Route component={NotFound} />
        </Layout>
    </Provider>
)
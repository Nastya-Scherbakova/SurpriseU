import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './ui/layout';
import { Home, Anketa } from './ui/pages';
import {
    EditUser,
    Profile,
    Offers,
    Likes,
    Friends,
    Login,
    AuthHOC,
    PresentPage,
    PresentForm
} from './features';


export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/anketa' component={Anketa} />
    <Route path="/login" component={Login} />
    <Route path="/presents/new" component={PresentForm} />
    <Route path="/edit/:section" component={AuthHOC(EditUser)} />
    <Route path="/id:id/offers" component={Offers} />
    <Route exact path="/id:id" component={AuthHOC(Profile)} />
    <Route path="/id:id/likes" component={Likes} />
    <Route path="/id:id/friends" component={Friends} />
    <Route exact path="/present/:presentId" component={PresentPage} />
    <Route path="/present/:presentId/edit" component={PresentForm} />
</Layout>;

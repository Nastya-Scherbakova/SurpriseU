import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/layout';
import { EditUser, Profile, Offers, Likes, Friends, Home, Anketa } from './components/pages';
import { Login, AuthHOC } from './components/features';
import { PresentPage, PresentForm } from './components/organisms';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/anketa' component={Anketa}/>
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

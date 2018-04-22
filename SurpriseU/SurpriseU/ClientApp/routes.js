import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Anketa from './components/Pages/Anketa';
import { Login, AuthHOC } from './components/features';
import { PresentPage, PresentForm } from './components/organisms';
import { Offers, Likes, Friends, UserMain, EditUser } from './components/User/index';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/anketa' component={Anketa}/>
    <Route path="/login" component={Login} />
    <Route path="/presents/new" component={PresentForm} />
    <Route path="/edit/:section" component={EditUser} />
    <Route path="/id:id/offers" component={Offers} />
    <Route exact path="/id:id" component={UserMain} />
    <Route path="/id:id/likes" component={Likes} />
    <Route path="/id:id/friends" component={Friends} />
    <Route exact path="/present/:presentId" component={PresentPage} />
    <Route path="/present/:presentId/edit" component={PresentForm} />
</Layout>;

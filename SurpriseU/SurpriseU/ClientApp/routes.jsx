import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Pages/Home';
import Anketa from './components/Pages/Anketa';
import Login from './components/Login/Login';
import Profile from './components/User/Profile';
import EditUser from './components/User/EditAccount';
import Present from './components/Present/Present';
import EditPresent from './components/Present/Update';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/anketa' component={EditUser}/>
    <Route path="/login" component={Login} />
    <Route path="/account/edit" component={EditUser} />
    <Route exact path="/id:id" component={Profile} />
    <Route exact path="/present/:presentId" component={Present} />
    <Route path="/present/:presentId/edit" component={EditPresent} />
</Layout>;

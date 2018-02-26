import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Anketa } from './components/Anketa';
import { LogIn } from './components/Login';
import { Profile } from './components/Profile';

export const routes = <Layout>
    <Route exact path='/' component={Home } />
    <Route path='/anketa'  />
    <Route path='/profile' component={Profile} />
    <Route path="/login" component={LogIn} />
    <Route path="/present/:id" />
    <Route path="/@:username" component={Profile} />
</Layout>;

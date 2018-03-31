import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Anketa } from './components/Anketa';
import { LogIn } from './components/Login';
import { Profile, EditUser} from './components/Profile';
import { Present , EditPresent} from './components/Present';
export const routes = <Layout>
    <Route exact path='/' component={Home } />
    <Route path='/anketa' component={EditUser}/>
    <Route path="/login" component={LogIn} />
    <Route path="/account/edit" component={EditUser} />
    <Route exact path="/id:id" component={Profile} />
    <Route exact path="/present/:presentId" component={Present} />
    <Route path="/present/:presentId/edit" component={EditPresent} />
</Layout>;

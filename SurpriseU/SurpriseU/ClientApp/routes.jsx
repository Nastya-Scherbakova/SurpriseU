import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home.jsx';
import { Anketa } from './components/Anketa.jsx';
import { LogIn } from './components/Login.jsx';
import { Profile } from './components/Profile.jsx';

@inject('presentsStore', 'commonStore')
@withRouter
@observer

export const routes = <Layout>
    <Route exact path='/' component={Home } />
    <Route path='/anketa' component={LogIn} />
    <Route path='/profile' component={Profile} />
</Layout>;

//function withoutRouteProps<P>(Component: React.ComponentClass<P> | React.SFC<P>):
//    React.ComponentClass<RouteComponentProps<P>> {
//    class C extends React.Component<RouteComponentProps<P>, {}> {
//        public render(): JSX.Element {
//            const { match, location, history, staticContext, ...rest } = this.props;
//            return (
//                <Component {...rest} />
//            );
//        }
//    }
//    return C;
//}
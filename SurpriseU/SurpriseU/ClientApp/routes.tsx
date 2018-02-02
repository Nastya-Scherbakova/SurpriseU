import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home.jsx';
import { Anketa } from './components/Anketa.jsx';
import { LogIn } from './components/Login.jsx';
import { Profile } from './components/Profile.jsx';
export const routes = <Layout>
    <Route exact path='/' component={withoutRouteProps(Home) } />
    <Route path='/anketa' component={withoutRouteProps(LogIn)} />
    <Route path='/profile' component={withoutRouteProps(Profile)} />
</Layout>;

function withoutRouteProps<P>(Component: React.ComponentClass<P> | React.SFC<P>):
    React.ComponentClass<RouteComponentProps<P>> {
    class C extends React.Component<RouteComponentProps<P>, {}> {
        public render(): JSX.Element {
            const { match, location, history, staticContext, ...rest } = this.props;
            return (
                <Component {...rest} />
            );
        }
    }
    return C;
}
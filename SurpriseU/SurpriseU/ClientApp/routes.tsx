import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home.jsx';
import { Admin } from './components/Admin.jsx';
import { Anketa } from './components/Anketa.jsx';
export const routes = <Layout>
    <Route exact path='/' component={withoutRouteProps(Home) } />
    <Route path='/anketa' component={withoutRouteProps(Anketa)} />
    <Route path='/profile' component={withoutRouteProps(Admin)} />
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
import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Admin } from './components/Admin.jsx';
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/admin' component={withoutRouteProps(Admin)} />
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
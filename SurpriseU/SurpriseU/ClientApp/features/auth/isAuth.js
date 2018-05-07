import * as React from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';

const mapStateToProps = state => ({ isAuth: state.auth.isAuth });

const Authorized = (WrappedComponent) => {
    class Wrapper extends React.Component {
        render() {
            const { isAuth } = this.props;
            if (isAuth) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <Redirect to="/" />;
            }
        }
    };

    return connect(mapStateToProps)(Wrapper);
}

export default Authorized;
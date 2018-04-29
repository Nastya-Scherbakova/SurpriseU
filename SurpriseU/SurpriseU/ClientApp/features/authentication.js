import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';



const Authorized = (WrappedComponent) => {
    @inject('authStore', 'userStore')
    @withRouter
    @observer
    class Wrapper extends React.Component {
        render() {
            const { isUser } = this.props.userStore;
            if (isUser) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <Redirect to="/login" />;
            }
        }
    };
    return Wrapper;
}
export default Authorized;
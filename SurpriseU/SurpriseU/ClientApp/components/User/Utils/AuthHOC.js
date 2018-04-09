import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';



const Authorized = (WrappedComponent) => {
    @inject('authStore', 'userStore')
    @withRouter
    @observer
    class  Wrapper extends React.Component {
        render() {
            const { isUser } = this.props.userStore;
            if (isUser) {
                return <div style={style.profile}>
                    <WrappedComponent {...this.props} />
                </div>;
            } else {
                return <Redirect to= "/login" />;
            }
        }
    };
    return Wrapper;
}
export default Authorized;

var style = {
    profile: {
        position: 'absolute',
        background: 'url(http://rosepoudredecoration.com/wp-content/uploads/2017/03/back-slider-4-1.jpg)',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        fontSize: '0.8em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
}
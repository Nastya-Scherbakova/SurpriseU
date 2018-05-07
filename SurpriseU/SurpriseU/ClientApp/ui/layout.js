import * as React from 'react';

import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../actionTypes';
import { store } from '../store';

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
});

export class Layout extends React.Component{
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }

    render() {
        return <div >
                    { this.props.children }
        </div>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
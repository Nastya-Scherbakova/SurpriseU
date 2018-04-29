import * as React from 'react';
import { observer,inject } from 'mobx-react';
import {  Redirect } from 'react-router'

import { LoginTemplate } from '../ui/templates'
import { LoginForm, RegisterForm } from '../ui/organisms'

@inject('authStore', 'userStore')
@observer
export default class Login extends React.Component {
    state = { login: true }

    onClick = () => this.setState(prevState => ({ login: !prevState.login }));

    render() {
        const { login } = this.state;
        const { currentUser, isUser } = this.props.userStore;
        return <LoginTemplate onClick={this.onClick} tab={login ? 'Реєстрація' : 'Вхід'}>
            {
                login ?
                <LoginForm /> :
                <RegisterForm />
            }
            {currentUser != null && <Redirect to={`/id${currentUser.id.substr(0, 6)}`} />}
        </LoginTemplate>;
    }
}


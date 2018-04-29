import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'


import { LoginField, Checkbox } from '../molecules'
import { Button, Layout, Icon, Error } from '../atoms'

@inject('authStore')
@observer
export default class LoginForm extends Component {

login = () => this.props.authStore.login();

    render() {
        const { errors, inProgress, loading , login, user, updatePassword, updateLogin} = this.props.authStore;
        return <Layout flow="column" align='center' width='100%' gap={1.6} padding={2}>
            <Social />
            <LoginField
                name='email'
                value={user.email}
                onChange={updateLogin}
                onBlur={updateLogin}
                icon='User'
                label='Імя'
                login 
            />
            <LoginField
                name='password'
                value={user.password}
                onChange={updatePassword}
                onBlur={updatePassword}
                icon='Password'
                label='Пароль'
                type='password'
                login
            />
            <Checkbox text="Запам'ятати мене" />
            <Button shine darkblue onClick={this.login}>Увійти</Button>
            <Error error='Невірний логін або пароль' active={errors == '401'} />

        </Layout>;
    }
}

const Social = () => <Layout flow='row' justify='space-around' width='100%' padding={2}>
            <Icon size='5vh' name="Twitter3D"/>
            <Icon  size='5vh' name="Google3D"/>
            <Icon  size='5vh'name="Facebook3D" />
</Layout>

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer,inject } from 'mobx-react'

import { LoginField, Select } from '../molecules'
import { Button, Layout } from '../atoms'

@inject('authStore')
@observer
export default class RegisterForm extends Component {

register = () => this.props.authStore.register();

    render() {
        const { newUser, newErrors,  registerChange, comparePasswords,onFieldBlur } = this.props.authStore;
        return <Layout flow="column" align='center' width='100%' gap={1.6} padding={2}>
            <LoginField
                name='name'
                value={newUser.name}
                onChange={registerChange}
                onBlur={onFieldBlur}
                error={newErrors.name}
                icon='User'
                label='Імя'
                register
            />
            <LoginField
                name='email'
                value={newUser.email}
                onChange={registerChange}
                onBlur={onFieldBlur}
                error={newErrors.email}
                icon='Email'
                label='Електронна адреса'
                register
            />
              
            <LoginField
                name='password'
                value={newUser.password}
                onChange={registerChange}
                onBlur={onFieldBlur}
                error={newErrors.password}
                icon='Password'
                type='password'
                label='Пароль'
                register
            /><LoginField
                name='password2'
                value={newUser.password2}
                onChange={registerChange}
                onBlur={comparePasswords}
                error={newErrors.password2}
                icon='Password'
                label='Повторіть пароль'
                type='password'
                register
            />
            <Select name='gender' 
                values={genders} 
                value={newUser.gender}
                onChange={registerChange} />
            <Button shine darkblue onClick={this.register}>Зареєструватися</Button>
        </Layout>;
    }
}

const genders = [
    {
        icon: 'Mars',
        value: 0
    },{
        icon: 'Venus',
        value: 1
    }
];
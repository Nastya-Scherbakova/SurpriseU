import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled, { css } from 'styled-components'

import { ProfileTemplate } from '../../../ui/templates'
import { Field, Calendar, Form, Slider, GenderDouble, FieldArea, Avatar } from '../../../ui/molecules'
import { Cloud, Icon, IconLink, CloudWrapper, Input, Flex } from '../../../ui/atoms'
import { Link, withRouter, NavLink,Route} from 'react-router-dom'

const Wrapper = CloudWrapper.extend`
    justify-content: flex-start;
align-items: center;
`

const Marg = styled.div`
margin: 1rem;
`

@inject('userStore')
@withRouter
@observer
export default class EditUser extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        const link = this.props.match.url;
        return (
            <ProfileTemplate>
                <Wrapper>
                    <Tabs>
                        {TabLink('/edit/account', ' Профіль ')}
                        {TabLink('/edit/password', 'Пароль')}
                        {TabLink('/edit/contacts', 'Контакти')}
                    </Tabs>
                    <Marg><Avatar src={currentUser.photo} size='15vh' />
                    </Marg>
                    <Route path="/edit/account" component={Account} />
                    <Route path="/edit/password" component={Password} />
                    <Route path="/edit/contacts" component={Contacts} />
                </Wrapper>
            </ProfileTemplate>
        )
    }
}


@inject('userStore')
@observer
class Account extends React.Component {
    render() {
        const { editForm, onFieldChange, onFieldBlur, editErrors } = this.props.userStore;
        return (
            <Flex column width='100%' child='0.5rem 0'>
                <GenderDouble
                    value={editForm.gender}
                    onChange={onFieldChange}
                />
                <Field name='name'
                    value={editForm.name}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                    error={editErrors.name}
                    label="Ім'я" />
                <Field name='email'
                    value={editForm.email}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                    error={editErrors.email}
                    label="Ім'я користувача"
                />
                <Calendar name='age'
                    value={editForm.age}
                    onChange={onFieldChange}
                    label='День народження'
                    error={editErrors.age}
                />
                <Field name='photo'
                    value={editForm.photo}
                    onChange={onFieldChange}
                    onBlur={onFieldBlur}
                    error={editErrors.photo}
                    label='Фото'
                />
            </Flex>
        )
    }
}
@inject('userStore')
@observer
class Password extends React.Component {
    render() {
        const { password, onPasswordChange, isComplex, compare } = this.props.userStore;
        return (
            <Flex column width='100%' child='0.5rem 0'>
                <Field name='old'
                    value={password.old}
                    onChange={onPasswordChange}
                    label="Старий пароль"
                />
                <Field name='password'
                    value={password.password}
                    onChange={onPasswordChange}
                    onBlur={isComplex}
                    error={password.complexity}
                    label="Новий пароль"
                />
                <Field name='repeat'
                    value={password.repeat}
                    onChange={onPasswordChange}
                    onBlur={compare}
                    error={password.compare}
                    label='Повторіть пароль'
                />
            </Flex>
        )
    }
}

@inject('userStore')
@observer
class Contacts extends React.Component {
    render() {
        const { password, onPasswordChange, isComplex, compare } = this.props.userStore;
        return (
            <Flex column width='100%' child='0.5rem 0'>
                <Field name='old'
                    value={password.old}
                    onChange={onPasswordChange}
                    label="Старий пароль"
                />
                <Field name='password'
                    value={password.password}
                    onChange={onPasswordChange}
                    onBlur={isComplex}
                    error={password.complexity}
                    label="Новий пароль"
                />
                <Field name='repeat'
                    value={password.repeat}
                    onChange={onPasswordChange}
                    onBlur={compare}
                    error={password.compare}
                    label='Повторіть пароль'
                />
            </Flex>
        )
    }
}


const Tabs = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around; 
    margin: 2vh 0 1vh 0;
`

const Tab = styled.div`
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    height: 5vh;
    justify-content: center;
    align-items: center;
    a{
color: #888890;

    &:hover, &:active {
        color: #888890;
    }}
`

const TabLink = (to, title) => <Tab><Link to={to}>{title}</Link></Tab>


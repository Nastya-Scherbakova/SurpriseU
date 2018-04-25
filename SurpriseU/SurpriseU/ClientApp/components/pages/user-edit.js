import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components'
import { ProfileTemplate } from '../templates'
import { Avatar } from '../molecules'
import { Cloudlet, Cloud, Icon, IconLink, CloudWrapper, Input} from '../atoms'
import { Link, withRouter, NavLink,Route} from 'react-router-dom'
@inject('userStore')
@withRouter
@observer
export default class EditUser extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        const link = this.props.match.url;
        return <ProfileTemplate>
            <CloudWrapper>
                <Tabs>
                    {TabLink('/edit/account', ' Профіль ')}
                    {TabLink('/edit/password', 'Пароль')}
                    {TabLink('/edit/contacts', 'Контакти')}
                </Tabs>
                <Avatar size='15vh' />
                <Account />
                <Route path="/edit/account" component={Account} />
                <Route path="/edit/password" component={Password} />
                <Route path="/edit/contacts" component={Contacts} />
            </CloudWrapper>
        </ProfileTemplate>;
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
    color: #888898;
    &:hover {
        color: #888898;
        outline: none;
    text-decoration: none;
    }
`

const TabLink = (to, title) => <Link to={to}><Tab>{title}</Tab></Link>


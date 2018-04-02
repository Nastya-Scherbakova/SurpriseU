import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'scrollpos-styler';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Shared/Icons';
import SearchInput from './Search';

@inject('userStore', 'authStore', 'presentsStore')
@withRouter
@observer
export default class Menu extends Component {
    logOut = () => {
        this.props.authStore.logout()
    }
    render() {
        const { isUser, currentUser } = this.props.userStore,
            path = this.props.location.pathname,
            { isFilter } = this.props.presentsStore;
        return <nav className={`menu container-fluid  fixed-top ${isFilter || ' sps sps--abv '}`}>
            <div className='content'>
                    <NavLink className="nav-brand" to={'/'}>   
                    <h1 className='main'>SurpriseU</h1>
                    </NavLink>
                    { path == '/' && <SearchInput /> }
                </div> 
                {
                isUser ? <div className="icons">
                    <NavLink className="navlink-no" to={`/id${currentUser.id.substr(0,6)}`}><div className='nav-photo'>
                        {currentUser.photo == null ? <Icon name='UserImage' /> : <img src={currentUser.photo} />}</div>
                    </NavLink>
                    <NavLink className="navlink-no" to={'/anketa'}><div className='nav-icon'><Icon name='Clipboard' /> </div></NavLink>
                    <NavLink className="navlink-no" to={'/login'}><div onClick={this.logOut.bind(this)} className='nav-icon'> <Icon name='Exit' /> </div></NavLink>
                </div> : <div className="icons"><NavLink className="navlink-no" to={'/login'}><div className='nav-icon'> <Icon name='Enter'  /> </div> </NavLink></div>
                }
            </nav>;
    }
}
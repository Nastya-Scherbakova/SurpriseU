import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'scrollpos-styler';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { UserImage,Clipboard, Search, Exit, Enter }from './Icons';
import Ionicon from 'react-ionicons';
@inject('userStore', 'authStore', 'presentsStore')
@withRouter
@observer
export class Menu extends Component {
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
                    <NavLink className="navlink-no" to={`/${currentUser.userName}`}><div className='nav-photo'>
                        {currentUser.photo == null ? UserImage : <img src={currentUser.photo} />}</div>
                    </NavLink>
                    <NavLink className="navlink-no" to={'/anketa'}><div className='nav-icon'>{Clipboard}</div></NavLink>
                    <NavLink className="navlink-no" to={'/login'}><div onClick={this.logOut.bind(this)} className='nav-icon'>{Exit}</div></NavLink>
                </div> : <div className="icons"><NavLink className="navlink-no" to={'/login'}><div className='nav-icon'>{Enter}</div> </NavLink></div>
                }
            </nav>;
    }
}


@inject('presentsStore')
@withRouter
@observer
class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.openSearch = this.openSearch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ search: e.target.value });
        this.props.presentsStore.searchInput(e.target.value);
    }

    openSearch = () => {
        this.search.focus();
        this.props.presentsStore.enableFilter();
    }
    render() {
        const { isFilter } = this.props.presentsStore;
        return <div className='d-flex align-items-center h-100 w-100'>
            <div className={`d-flex align-items-center search ${isFilter && ' open'} `}>

                <input type="search" ref={(input) => { this.search = input }} className="search-input"
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
            
                <Ionicon icon="ios-arrow-dropright" className='ios-right  nav-icon' onClick={this.openSearch} />
                <Ionicon icon="ios-search-outline" className='ios-search nav-icon' onClick={this.openSearch} />
            </div>
        </div >;
    }
}

//<div className='nav-icon' onClick={this.openSearch} >{Search}</div>
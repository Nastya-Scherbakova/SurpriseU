import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Clipboard, LogIn, Search, LogOut, Circle, Filter} from 'react-feather';
import 'scrollpos-styler';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Ionicon from 'react-ionicons';

@inject('userStore', 'authStore', 'presentsStore')
@withRouter
@observer
export class Menu extends Component {
    logOut = () => {
        this.props.authStore.logout()
    }
    render() {
        const { isUser } = this.props.userStore,
            path = this.props.location.pathname,
            { isFilter } = this.props.presentsStore;
        return <nav className={`${isFilter || 'sps sps--abv'}  menu container-fluid d-flex align-items-center justify-content-between fixed-top `}>
                <div className="content">
                    <NavLink className="nav-brand" to={'/'}>   
                    <h1 className={`main ${path == '/login' && ' login '}`}>SurpriseU</h1>
                    </NavLink>
                
                    { path == '/' && <SearchInput /> }
                </div> 
                {
                    isUser ? <div className="icons">
                    <NavLink className="navlink-no" to={'/anketa'}><Ionicon icon="ios-clipboard-outline" className='nav-icon' /></NavLink>
                        <NavLink className="navlink-no" to={'/profile'}><User className='nav-icon' /></NavLink>
                        <NavLink className="navlink-no" to={'/login'}><LogOut onClick={this.logOut.bind(this)} className='nav-icon' color='#031560' /></NavLink>
                </div> : <div className="icons"><NavLink className="navlink-no" to={'/login'}><Ionicon icon="ios-log-in" className='nav-icon' /> </NavLink></div>
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
            search: '',
            isSearch: false
        };
        this.openSearch = this.openSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.openFilter = this.openFilter.bind(this);
    }

    onChange(e) {
        this.setState({ search: e.target.value });
        this.props.presentsStore.searchInput(e.target.value);
    }

    openSearch = () => {
        this.setState(prevState => ({ isSearch: !prevState.isSearch }));
        this.search.focus();
    }
    openFilter = () => {
        this.props.presentsStore.enableFilter();
    }
    render() {
        return <div className='d-flex align-items-center h-100 w-100'>

            <Ionicon icon="ios-funnel-outline" className='nav-icon' onClick={this.openFilter} />
            <div className={`d-flex align-items-center search ${this.state.isSearch && ' open'} `}>

                <input type="search" ref={(input) => { this.search = input }} className="search-input"
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
            
              
                <Ionicon icon="ios-arrow-dropright" className='ios-right  nav-icon' onClick={this.openSearch} />
                <Ionicon icon="ios-search-outline" className='ios-search nav-icon' onClick={this.openSearch} />
            </div>
        </div >;
    }
}



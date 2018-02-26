import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Clipboard, LogIn, Search, LogOut, Circle, Filter} from 'react-feather';
import 'scrollpos-styler';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@withRouter
@observer
export class Menu extends Component {
    render() {
        const { isUser } = this.props.userStore,
            path = this.props.location.pathname;

        return <nav className="container-fluid d-flex align-items-center justify-content-between fixed-top sps sps--abv">
                <div className="content">
                    <NavLink className="nav-brand" to={'/'}>   
                    <h1 className={`main ${path == '/login' && ' login '}`}>SurpriseU</h1>
                    </NavLink>
                    { path == '/' && <SearchInput /> }
                </div> 
                <div className="icons">
                    {isUser && <NavLink className="navlink-no" to={'/anketa'}><Clipboard className='nav-icon ' color='#031560' /></NavLink>   }
                    {isUser && <NavLink className="navlink-no" to={'/profile'}><User className='nav-icon' color='#031560' /></NavLink>   }
                    {isUser || <NavLink className="navlink-no" to={'/login'}><LogIn className='nav-icon' color='black' /></NavLink>  }
                </div>
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
        this.props.presentsStore.searchPresents(e.target.value);
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
        <div className={`d-flex align-items-center search ${this.state.isSearch && ' open'} `}>
                <input type="search" ref={(input) => { this.search = input }} className="search-box"
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
                <span className="search-button" onClick={this.openSearch} >
                    <span className="search-icon"></span>
                </span>
                <Filter className='filter' onClick={this.openFilter}/>
            </div>
        </div >;
    }
}



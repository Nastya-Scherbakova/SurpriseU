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

@inject('presentsStore')
@observer
@Radium
class SearchInput extends React.Component {

    state = { search: '' };

    onChange = e => {
        this.setState({ search: e.target.value });
        this.props.presentsStore.searchInput(e.target.value);
    }

    openSearch = () => {
        this.search.focus();
        this.props.presentsStore.enableFilter();
    }

    render() {
        const { isFilter } = this.props.presentsStore;
        return <div className={`search  ${isFilter && 'open '} `}  style={[styles.baseInputDiv, styles[`${isFilter}InputDiv`]]}>
            <input type="search" ref={(input) => { this.search = input }} style={styles.input}
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
                <Icon name='ChevronRight' className='ios-right  nav-icon' onClick={this.openSearch} />
                <Icon name='Search' className='ios-search  nav-icon' onClick={this.openSearch} />
        </div >;
    }
}

@Radium
export default class Search extends React.Component {
    render() {
        return <div style={styles.div}>
            <StyleRoot><SearchInput /></StyleRoot>
        </div>;
    }
}


var styles = {
    div: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    baseInputDiv: {
        fontSize: '0.7em',
        marginLeft: '1vw',
        height: '4vh',
        position: 'relative',
        transition: 'all easy 0.3'
    },
    input: {
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        border: 'none',
        color: 'black',
        padding: '0 3vw',
        fontSize: '12px',
        backgroundColor: 'transparent',
        ':focus': {
            outline: 'none'
        }
    }

}
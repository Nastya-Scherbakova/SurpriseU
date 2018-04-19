import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'scrollpos-styler';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon, Input } from '../atoms';
import styled, { css } from 'styled-components'

@inject('userStore', 'authStore', 'presentsStore')
@withRouter
@observer
export default class Menu extends Component {

    logOut = () => this.props.authStore.logout()

    onChange = e => this.props.presentsStore.searchInput(e.target.value)

    openSearch = () => this.props.presentsStore.enableFilter()

    render() {
        const { isUser, currentUser } = this.props.userStore,
            path = this.props.location.pathname,
            { isFilter, search } = this.props.presentsStore;
        return <nav className={`menu container-fluid  fixed-top ${isFilter || ' sps sps--abv '}`}>
            <div className='content'>
                    <NavLink className="nav-brand" to={'/'}>   
                    <h1 className='main'>SurpriseU</h1>
                    </NavLink>
                    { path == '/' &&
                     <Search
                        isFilter={isFilter}
                     onChange={this.onChange} 
                     openSearch={this.openSearch} 
                     value={search}
                    /> }
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

const Wrapper = styled.div`
    width: 4vh;
    transition: all .7s ease;
    margin-left: 1vw;
    height: 4vh;
    position: relative;
    transition: all .7s ease;
    ${p => p.open && css`
        @media (orientation: portrait) {
            width: 30vw;
        }
        @media (orientation: landscape) {
            width: 20vw;
        }
        ${Right} {
            opacity: 1;
        }
        ${SearchIcon} {
            opacity: 0;
        }
    `}
`;

const NavIcon = styled.div`
    transition: all .7s ease;
    position: absolute;
    right: 0;
    top: 1vh;
`;

const SearchIcon = NavIcon.extend`
    opacity: 1; 
`

const Right = NavIcon.extend`
    opacity: 0;
`

const NavInput = Input.extend`
    width: 100%;
    height: 100%;
    padding: 0 3vw;
    &:focus {
        outline:none;
        border: none;
    }
`

const Search = props => <Wrapper open={props.isFilter}>
    <NavInput 
        type="search" 
        ref={(input) => { this.search = input }}
        value={props.value} 
        placeholder="Пошук"
        onChange={props.onChange} />

  <Right > <Icon name='ChevronRight' size='2vh' onClick={props.openSearch} />
   </Right > <SearchIcon ><Icon name='Search' size='2vh' onClick={props.openSearch} />
</SearchIcon ></Wrapper >;


var styles = {
    div: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
}
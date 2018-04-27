import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Icon, Input, IconLink, Name, Flex } from '../atoms';
import { Avatar } from '../molecules';


@inject('userStore', 'authStore', 'presentsStore')
@observer
export default class Menu extends Component {
    state = {
            windowPosition: window.pageYOffset
        }

    componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

    componentWillUnmount = () => window.removeEventListener('scroll', this.handleScroll)
    
    handleScroll = () => this.setState({ windowPosition: window.pageYOffset })

    logOut = () => this.props.authStore.logout()

    onChange = e => this.props.presentsStore.searchChange('title', e.target.value)

    openSearch = () => this.props.presentsStore.enableFilter()

    render() {
        const { isUser, currentUser } = this.props.userStore,
            { isFilter, search } = this.props.presentsStore;
        const { isSearch } = this.props;
        const scroll = this.state.windowPosition > 0 && !isFilter;
        return <MenuWrapper scroll={scroll}>
            <Flex width='75%'>
                <Link to={'/'}><Name size='2rem' /></Link>
                {isSearch && <Search
                    isFilter={isFilter}
                    onChange={this.onChange}
                    openSearch={this.openSearch}
                    value={search} />}
            </Flex>
            {
                isUser ? <Flex w='25%' child='1rem'>
                    <Link to={`/id${currentUser.id.substr(0, 6)}`}>
                        <Avatar src={currentUser.photo} size='3vh' />
                    </Link>
                    <IconLink to='/anketa' name='Clipboard' />
                    <IconLink onClick={this.logOut} to='/login' name='Exit' />
                </Flex> : <IconLink to='/login' name='Enter' />
            }
        </MenuWrapper>
    }
}

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.25s ease;
    width: 100%;
    height: 10vh;
    padding: 0 5vw;
    z-index: 2;
    ${p => p.scroll && css`
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        z-index: 100;
    `}
`
const MenuLeft = styled.div`
    display: flex;
    width: 75%;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`

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
    top: 0.75vh;
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
    background: transparent;
    &:focus {
        outline:none;
        border: none;
        background: transparent;
    }
`

const Search = props => <Wrapper open={props.isFilter}>
    <NavInput 
        type="search" 
        ref={(input) => { this.search = input }}
        value={props.value} 
        placeholder="Пошук"
        onChange={props.onChange} />
    <Right > <Icon name='ChevronRightLight' size='2.5vh' onClick={props.openSearch} />
   </Right > <SearchIcon ><Icon name='Search' size='2.5vh' onClick={props.openSearch} />
</SearchIcon ></Wrapper >;


Menu.propTypes = {
    isSearch: PropTypes.bool
}

Menu.defaultProps = {
    isSearch: false,
}

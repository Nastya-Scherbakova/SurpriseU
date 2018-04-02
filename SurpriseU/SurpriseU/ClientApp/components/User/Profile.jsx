import * as React from 'react';
import ReactModal from 'react-modal';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';

import HashTag from '../Shared/Tag';
import NewPresent from '../Present/Create';
import { Icon } from '../Shared/Icons';
import { Friends } from './Friends'
import Likes from './Tags'

@inject('userStore')
@withRouter
@observer
class Info extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        return <div className="info w-100 d-flex flex-column justify-content-around align-items-center">
            {currentUser == null && <Redirect to="/login" />}
            <div className='nav'>
                <div className='settings'> <Icon name='Search' />   </div>
                    <NavLink className="navlink-no" to={'/account/edit'}>
                    <div className='settings'>  <Icon name='Edit' />   </div>
                    </NavLink>
                </div>
            <div className='photo'>
                <div className='plus-photo'><Icon name='Upload' /></div>
                {currentUser != null &&
                    (currentUser.photo == null ?
                    <Icon name='UserImage' /> :
                        <img src={currentUser.photo} />)}
            </div>
            <div className='name'>{currentUser.name}</div>
            <div className="d-flex align-items-center age"> <Icon name='Clock' /> {currentUser.age.substr(0,11)}</div>
                <div className='fr-likes'>
                <Likes />
                <Friends />
                </div>
                <div className='social-tabs'>
                <div className='twitter'>   <Icon name='Twitter' />    </div>
        <div className='social-border'>   <Icon name='Instagram' />    </div>
        <div className='social-border'>   <Icon name='Facebook' />    </div>
    </div>
     
        </div>;
    }
}

class FriendsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
   
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    render() {
        return <div className="friends">
            <div className="title"><div className='text'>Друзі</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {LikedPresent}
                    {LikedPresent}
                </div>
                <Icon onClick={this.showPresents}  name='ChevronRight' className='scale1-1' fill='#E5E6FF' height='5vh' />
            </div>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>;
    }
}


class LikedPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    render() {
        return <div className="presents">
            <div className="title"><div className='text'>Вподобані подарунки</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {presents.map((present, i) => LikedPresent)}
                </div>
                <Icon onClick={this.showPresents} name='ChevronRight' className='scale1-1' fill='#E5E6FF' height='5vh' />
            </div>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>;
    }
}




class AddedPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    openAdd = () => this.setState({ newPresentModal: true });
    closeAdd = () => this.setState({ newPresentModal: false });

    render() {
        return <div className="presents">
            <div className="title"><div className='text'>Запропоновані подарунки</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items add-items">
                    <div className="plus">     
                        <Icon onClick={this.openAdd} name='Plus' />
                    </div>
                    {presents.map(present => LikedPresent)}
                </div>
                <Icon onClick={this.showPresents} name='ChevronRight' className='right-arrow'  />
            </div>
            <ReactModal isOpen={this.state.newPresentModal} onRequestClose={this.closeAdd} className='addPresent'>
                <NewPresent toClose={this.closeAdd} />
            </ReactModal>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>  
    }
}

const presents = ['item', 'item', 'item', 'item',
    'item', 'item ',
    'item' ,
   ' item' ];

class UserPresents extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="all-content animated fadeInDown">
            <div className="title">Запропоновані подарунки</div>
            <div className="content">
                {presents.map(present => LikedPresent)}
            </div>
            <Icon onClick={this.props.toClose} name='X' width='2.5vh' height='2.5vh' fill='#600303' className='but' />
        </div>;
    }
}

@inject('authStore', 'userStore')
@withRouter
@observer
export default class Profile extends React.Component {
    render() {
        const { isUser, currentUser } = this.props.userStore;
        return <div className="profile h-100 w-100">
            {!isUser && <Redirect to="/login" />}
            <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{console.log(currentUser)}</div>
                {isUser && <Info />} 
                <div className='d-flex content align-items-center'>
                    <AddedPresents />
                    <AddedPresents />
                </div>
            </div>
        </div>;
    }
}





const LikedPresent = <div className="user-present rounded-circle border-0">
    <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
</div>;


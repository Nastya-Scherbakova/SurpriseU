﻿import * as React from 'react';
import ReactModal from 'react-modal';
import { PresentsList, NewPresent, Present } from './Present.jsx';
import { Plus, Settings, Search, ChevronRight, X, Search, Edit } from 'react-feather';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { HashTag } from './Layout';


@inject('authStore', 'userStore')
@withRouter
@observer
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    openEdit = () => this.setState({ editModal: true });
    hideEdit = () => this.setState({ editModal: false });
    render() {
        return <div className="info w-100 d-flex justify-content-around align-items-center">
            <div className="d-flex flex-column main align-items-center">
                <img className="img rounded-circle " /*src={this.props.user.photo} *//>
                    <div className="d-flex justify-content-around">
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  tel" /*href={this.props.user.telegram}*/></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  insta " /*href={this.props.user.instagram}*/></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  face" /*href={this.props.user.facebook}*/></a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center button" onClick={this.openEdit}>
                    Редагувати<Edit className='icon' />
                     </div>
                    <div className="d-flex justify-content-center align-items-center button">
                    Пошук<Search className='icon' />
                     </div>
            </div>
            <div className="d-flex flex-column other-data h-100 justify-content-around">
                <div className="d-flex align-items-center age">Дата народження<div ></div></div>
                <Likes /*user={this.props.user}*/ />
                <Friends /*user={this.props.user}*/ />
            </div>
            <ReactModal isOpen={this.state.editModal} onRequestClose={this.hideEdit} className='profile'>
                <EditUser toClose={this.hideEdit} />
            </ReactModal>
        </div>;
    }
}



class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div className="edit-user animated fadeInDown">
            <div className="content">
                {presents.map(present => LikedPresent)}
            </div>
            <div className='button'><X size="5vh" color='#600303' onClick={this.props.toClose} /></div>
        </div>;
    }
}



class Likes extends React.Component {
    render() {
        const likes = [{ name: 'спорт', id: '1' }, { name: 'хореографія', id: '2' }, { name: 'співати', id: '3' }, { name: 'програмування', id: '4'}];
        return <div className="w-100 h-25 d-flex flex-wrap align-items-center likes" >
            <div className="d-flex like-title align-items-center">Подобається</div>
            <input placeholder="+" />
            {
                likes.map(like => <HashTag key={like.id} name={like.name} check={true}/>)
            }
        </div>;
    }
}




class Friends extends React.Component {
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
        return <div className="friends">
            <div className="title">Друзі</div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {LikedPresent}
                    {LikedPresent}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh'  onClick={this.showPresents} />
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
            <div className="title">Вподобані подарунки</div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {presents.map(present => LikedPresent)}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' onClick={this.showPresents} />
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
            <div className="title">Запропоновані подарунки</div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    <div className="user-present rounded-circle">
                        <div className="h-100 w-100 d-flex justify-content-center align-items-center plus-div" onClick={this.openAdd}><Plus className='plus ' size='7vh' /></div>
                    </div>
                    {presents.map(present => LikedPresent)}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' onClick={this.showPresents}/>
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

const presents = ['item' ,
    'item', 'item ',
    'item' ,
   ' item' ];

class UserPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div className="all-content animated fadeInDown">
            <div className="title">Запропоновані подарунки</div>
            <div className="content">
                {presents.map(present => LikedPresent)}
            </div>
            <div className='button'><X size="5vh" color='#600303' onClick={this.props.toClose}/></div>
        </div>;
    }
}

@inject('authStore', 'userStore')
@withRouter
@observer
export class Profile extends React.Component {
    render() {
        const { isUser, currentUser } = this.props.userStore;
        return <div className="profile h-100 w-100">
            <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{currentUser.name}</div>
                <Info user={currentUser} />
                <div className='d-flex content align-items-center'>
                    <LikedPresents />
                    <AddedPresents />
                </div>
            </div>

            {!isUser && <Redirect to="/login" />}
        </div>;
    }
}



const LikedPresent = <div className="user-present rounded-circle border-0">
    <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
</div>;

//<a className="d-flex justify-content-center align-items-center social-icon navlink-no edit"></a>
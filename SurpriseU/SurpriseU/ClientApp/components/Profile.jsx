﻿import * as React from 'react';
import { Present } from './Present.jsx';
import '../css/Site.scss';
import ReactModal from 'react-modal';
import { PresentsList, NewPresent } from './Present.jsx';
import { Plus, Settings, Search } from 'react-feather';
var Nastya = {
    name: 'Настя',
    age: '19',
    gender: 1,
    instagram: '',
    telegram: '',
    facebook: '',
    likes: ['спорт', 'хореографія'],
    hobbies: ['співати', 'програмування'],
    photo: 'https://pp.userapi.com/c840025/v840025300/39a4/aQuz84zS8-0.jpg'
}

class Tag extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className='tag'>
            { this.props.data}
        </div>;
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const gender = this.props.user.gender;
        let genderIcon = null;
        if (gender == 0) {
            genderIcon = 'user-he'
        }
        else {
            genderIcon = 'user-she'
        }
        return <div className="w-25 d-flex flex-column align-items-center justify-content-center" >
            <img className="img rounded-circle " src={this.props.user.photo} />
                <div className="d-flex flex-row justify-content-around w-50">
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  tel" href={this.props.user.telegram}></a>
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  insta " href={this.props.user.instagram}></a>
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  face" href={this.props.user.facebook}></a>
                </div>
        </div>;
    }
}

class Likes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const likes = this.props.user.likes;
        let tags = likes.map(item => <Tag data={item} />);
        return <div className="d-flex flex-column info-in-area align-items-between">
            <div className="d-flex w-100 nav justify-content-center align-items-center">Подобається</div>
            <div className="d-flex flex-wrap info-in" >
                <input placeholder="+" />
                {tags}
            </div>
        </div>;
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="d-flex flex-column info-in-area">
            <div className="d-flex w-100 nav justify-content-center align-items-center">Друзі</div>
            <div className="d-flex flex-wrap info-in" >
                
            </div>
        </div>;
    }
}

class LikedPresent extends React.Component {
    render() {
        return <div className="user-present rounded-circle">
            <img className="h-100  rounded-circle" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
        </div>;
    }
}

class LikedPresents extends React.Component {
    render() {
        return <div className="d-flex flex-column fields">
            <div className="d-flex w-100 nav justify-content-center align-items-center">Вподобані подарунки</div>
            <div className="d-flex flex-wrap justify-content-around saved-presents">
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
            </div>
        </div>;
    }
}

class AddedPresents extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return <div className="d-flex flex-column fields">
            <div className="d-flex w-100 nav justify-content-center align-items-center">Запропоновані подарунки</div>
            <div className="d-flex flex-wrap justify-content-around saved-presents">
                <div className="user-present rounded-circle ">
                    <div className="h-100 d-flex justify-content-center align-items-center plus-div" onClick={this.handleOpenModal}><Plus className='plus' color='white' size='7vh'/></div>
                </div>
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
                <LikedPresent />
            </div>
            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                className='addPresent w-100 h-100 d-flex align-items-center'
            >
                <NewPresent apiUrl="/api/Presents" toClose={this.handleCloseModal} />
            </ReactModal>
        </div>
            
    }
}

export class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: Nastya
        };
    }
    render() {
        let user = this.state.user;
        return <div className="profile h-100 w-100">
            <div className="d-flex flex-column info align-items-around">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="name">{user.name}</div>
                </div>
                <div className="d-flex justify-content-around">
                    <Info user={user} />
                    <Likes user={user} />
                    <Friends user={user} />
                </div>
            </div>
            <div className="d-flex justify-content-around">
                <LikedPresents />
                <AddedPresents />
             </div>
        </div>;
    }
}



//<a className="d-flex justify-content-center align-items-center social-icon navlink-no edit"></a>
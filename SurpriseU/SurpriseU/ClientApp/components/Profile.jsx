import * as React from 'react';
import { Present } from './Present.jsx';
import '../css/Site.scss';
import ReactModal from 'react-modal';
import { PresentsList, NewPresent } from './Present.jsx';
import { Plus, Settings, Search, ChevronRight} from 'react-feather';
var Nastya = {
    name: 'Настя',
    age: '19',
    gender: 1,
    instagram: '',
    telegram: '',
    facebook: '',
    likes: ['спорт', 'хореографія', 'співати', 'програмування'],
    photo: 'https://pp.userapi.com/c840025/v840025300/39a4/aQuz84zS8-0.jpg'
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
        return <div className="info w-100 d-flex justify-content-around align-items-center">
            <div className="d-flex flex-column main align-items-center">
                    <img className="img rounded-circle " src={this.props.user.photo} />
                    <div className="d-flex justify-content-around">
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  tel" href={this.props.user.telegram}></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  insta " href={this.props.user.instagram}></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  face" href={this.props.user.facebook}></a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center btn btn-secondary m-2">
                        Редагувати
                     </div>
                    <div className="d-flex justify-content-center align-items-center btn btn-secondary m-2">
                        Пошук
                     </div>
            </div>
            <div className="d-flex flex-column other-data h-100 justify-content-around">
                <div className="d-flex align-items-center age">Дата народження<div >{this.props.user.age}</div></div>
                <Likes user={this.props.user} />
                <Friends user={this.props.user} />
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
        return <div className="w-100 h-25 d-flex flex-wrap align-items-center likes" >
            <div className="d-flex like-title align-items-center">Подобається</div>
            <input placeholder="+" />
            {
                likes.map(item => <div key={item} className='tag'>{item}</div>)
            }
        </div>;
    }
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="d-flex flex-column friends">
            <div className="d-flex w-100 nav justify-content-center align-items-center">Друзі</div>
            <div className="d-flex h-100 content align-items-center">

            </div>
        </div>;
    }
}

class LikedPresent extends React.Component {
    render() {
        return <div className="user-present rounded-circle border-0">
            <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
        </div>;
    }
}

class LikedPresents extends React.Component {
    render() {
        return <div className="d-flex flex-column fields">
            <div className="d-flex nav justify-content-center align-items-center">Вподобані подарунки</div>
            <div className="d-flex h-100 align-items-center">
                <div className="d-flex content2 h-100 w-75 align-items-center">
                <LikedPresent />
                <LikedPresent />
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' color='white' />
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
            <div className="d-flex nav justify-content-center align-items-center">Запропоновані подарунки</div>
            <div className="d-flex h-100 content2 align-items-center">
                <div className="user-present rounded-circle">
                    <div className="h-100 w-100 d-flex justify-content-center align-items-center plus-div" onClick={this.handleOpenModal}><Plus className='plus ' color='white' size='7vh'/></div>
                </div>
                <LikedPresent />
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' color='white' />
            </div>
            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                className='addPresent w-100 h-100 d-flex align-items-center'
            >
                <NewPresent toClose={this.handleCloseModal} />
            </ReactModal>
        </div>
            
    }
}

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: Nastya
        };
    }
    render() {
        let user = this.state.user;
        return <div className="profile h-100 w-100">
            <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{user.name}</div>
                <Info user={user} />
                <div className='d-flex content align-items-center'>
                    <LikedPresents />
                    <AddedPresents />
                </div>
            </div>
        </div>;
    }
}



//<a className="d-flex justify-content-center align-items-center social-icon navlink-no edit"></a>
import * as React from 'react';
import ReactModal from 'react-modal';
import { PresentsList, NewPresent, Present } from './Present.jsx';
import { Plus, Settings, ChevronRight, X, Check } from 'react-feather';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { HashTag } from './Layout';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { User, EditTwi, EditMail, EditTel, PhotoIcon, EditInsta, Password, Username, Balloon, Back, Ok, Search, Edit, Pencil, Upload,Mars, Venus, Instagram, UserImage, Twitter, Facebook, Upload } from './Icons';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';



@inject('userStore')
@withRouter
@observer
class Info extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        return <div className="info w-100 d-flex flex-column justify-content-around align-items-center">
            {currentUser == null && <Redirect to="/login" />}
            <div className='nav'>{Search}<NavLink className="navlink-no" to={'/account/edit'}>{Edit}</NavLink></div>
            <div className='photo'>{Upload} {currentUser != null && (currentUser.photo == null ? UserImage : <img src={currentUser.photo} />)}</div>
            <div className='name'>{currentUser.name}</div>
            <div className="d-flex align-items-center age">{currentUser.age}</div>
                <div className='fr-likes'>
                <Likes />
                <Friends />
                </div>
                <div className='social-tabs'>
        {Twitter}
      {Instagram}
        {Facebook}
    </div>
     
        </div>;
    }
}

@inject('userStore')
@withRouter
@observer
export class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: 'contacts',
            user: this.props.userStore.currentUser,
            age: '',
            newPassword: '',
            oldPassword: '',
            formErrors: {
                title: '',
                content: '',
                photo: '',
                age: ''
            },
            formValid: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.ageChange = this.ageChange.bind(this);
    }

    componentWillMount() {
        if (this.props.userStore.currentUser) {
            var ageStr = this.state.user.age;
            var age = new Date(ageStr.substring(0, 4), ageStr.substring(5, 7), ageStr.substring(8, 10));
            this.setState({ age: age })
        }
    }
    contacts = () => this.setState({ field: 'contacts' });
    password = () => this.setState({ field: 'password' });
    onChange(e) {
        this.setState({ user: Object.assign({}, this.state.user, { [e.target.name]: e.target.value }) })
    }
    ageChange(date) {
        this.setState({age: date})
    }
    passwordChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.userStore.updateUser({
            name: this.state.user.name,
            email: this.state.user.email,
            gender: this.state.user.gender,
            age: this.state.user.age + ' 00:00:00',
            photo: this.state.user.photo,
            id: this.props.userStore.currentUser.id,
            tags: []
        });
    };

    validateField(e) {
        let fieldErrors = this.state.formErrors,
            formValid = this.state.formValid,
            fieldValid = false,
            value = e.target.value;
        switch (e.target.name) {
            case 'name':
                fieldValid = value.length <= 100 && value.length >= 3;
                fieldErrors.title = fieldValid ? '' : 'Назва має містити від 3 до 100 символів';
                formValid[0] = fieldValid ? true : false;
                break;
            case 'userName':
                fieldValid = value.length <= 1000 && value.length >= 10;
                fieldErrors.content = fieldValid ? '' : 'Інформація має містити від 10 до 1000 символів';
                formValid[1] = fieldValid ? true : false;
                break;
            case 'email':
                fieldValid = value <= 100 && value >= this.state.startAge;
                fieldErrors.age = fieldValid ? '' : 'Вкажіть межі віку від 0 до 100';
                formValid[3] = fieldValid ? true : false;
                break;
            default:
                break;
        }
        this.setState({ formErrors: fieldErrors, formValid: formValid });
    }


    render() {
        const { currentUser, isUser }=this.props.userStore;
        const correct = true;
        return <div className="edit-user d-flex flex-column">
            {!isUser ? <Redirect to="/login" />
                :
            <div className="edit-form animated fadeInDown flex flex-column justify-content-between align-items-center">
                <div className="nav">
                    <NavLink to={`/${currentUser.userName}`}>{Back}</NavLink>Редагувати профіль
                    <div className='but' onClick={correct ? this.onSubmit : undefined}> {Ok} </div>
                </div>
                <div className='photo'> {Pencil}
                    {currentUser != null ? (currentUser.photo != null ? <img src={currentUser.photo} /> : UserImage) : UserImage}
                </div>
                <div className='w-80 flex-column d-flex justify-content-around'>
                        <label>{User}Ім'я
                            <input name="name"
                                placeholder="Назва"
                                value={this.state.user.name}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                        <label><div className='hint'> {Username}</div>Ім'я користувача
                            <input name="userName"
                                placeholder="Назва"
                                value={this.state.user.userName}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                        <div className='age-gen'>
                        <label><div className='hint'>{Balloon}</div>День народження
                                <DayPickerInput
                                    placeholder='День народження'
                                    value={this.state.age}
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    onDayChange={this.ageChange} />
                        </label>
                        <label>Стать
                            <div className='gender'>
                                <label className={`label ${this.state.user.gender == 0 ? '' : 'not-checked'}`}>
                                    {Mars}
                                    <input type="radio" value={0} name="gender" checked={this.state.user.gender === 0} onChange={this.onChange} onClick={this.validateField} />
                                </label>
                                <label className={`label ${this.state.user.gender == 1 ? '' : 'not-checked'}`}>
                                    {Venus}
                                    <input type="radio" value={1} name="gender" checked={this.state.user.gender === 1} onChange={this.onChange} onClick={this.validateField} />
                                </label>
                            </div>
                        </label>
                        </div>
                        <label><div className='hint'> {PhotoIcon}</div>Фото
                            <input name="photo"
                                placeholder="Фото"
                                value={this.state.user.photo}
                                onChange={this.onChange} />
                        </label>
                        <label>{Password}Старий пароль
                            <input name="oldPassword" type="password"
                                placeholder="Старий пароль"
                                value={this.state.oldPassword}
                                onChange={this.passwordChange}
                                onBlur={this.validateField} />
                        </label>
                        <label>{Password}Новий пароль
                            <input name="newPassword"
                                type="password"
                                placeholder="Новий пароль"
                                value={this.state.newPassword}
                                onChange={this.passwordChange}
                                onBlur={this.validateField} />
                        </label>
                </div>
                <div className='section d-flex'>
                        <label className='contact'>{EditMail}
                            <input name="email"
                                placeholder="Email"
                                value={this.state.user.email}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                        <label className='contact'>{EditTel}
                            <input name="phoneNumber"
                                placeholder="Телеграм"
                                value={this.state.user.phoneNumber}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                        <label className='contact'>{EditInsta}
                            <input name="instagram"
                                placeholder="Instagram"
                                value={this.state.user.instagram}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                    </div>
            </div>}
        </div>;
    }
}



class Likes extends React.Component {
    render() {
        const likes = [{ name: 'спорт', id: 1 }, { name: 'хореографія', id: 2 }, { name: 'співати', id: 3 }, { name: 'програмування', id: 4}];
        return <div className="likes" >
            <div className="title"><div className='text'>Подобається</div></div>
            <div className="tags">
            <input placeholder="+" />
            {
                likes.map(like => <HashTag key={like.id} name={like.name} check={true}/>)
            }   </div>
        </div>;
    }
}

const Friends = () => <div className="friends">
    <div className="title"><div className='text'>Друзі</div></div>
    <div className="d-flex h-100 align-items-center">
        <div className="items">
            {LikedPresent}
            {LikedPresent}
        </div>
        <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' onClick={this.showPresents} />
    </div>
</div>;


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
            <div className="title"><div className='text'>Вподобані подарунки</div></div>
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
            <div className="title"><div className='text'>Запропоновані подарунки</div></div>
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
            {!isUser && <Redirect to="/login" />}
            <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{console.log(currentUser)}</div>
                {isUser && <Info />} 
                <div className='d-flex content align-items-center'>
                    <LikedPresents />
                    <AddedPresents />
                </div>
            </div>
        </div>;
    }
}





const LikedPresent = <div className="user-present rounded-circle border-0">
    <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
</div>;


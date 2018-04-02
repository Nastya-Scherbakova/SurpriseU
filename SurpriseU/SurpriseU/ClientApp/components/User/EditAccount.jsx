import * as React from 'react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import { Icon } from '../Shared/Icons';

@inject('userStore')
@withRouter
@observer
export default class EditUser extends React.Component {
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
        this.setState({ age: date })
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
        const { currentUser, isUser } = this.props.userStore;
        const correct = true;
        return <div className="edit-user d-flex flex-column">
            {!isUser ? <Redirect to="/login" />
                :
                <div className="edit-form animated fadeInDown flex flex-column justify-content-between align-items-center">
                    <div className="nav">
                        <NavLink to={`/id${currentUser.id.substr(0, 6)}`}><Icon name='Back' /></NavLink>Редагувати профіль
                    <div className='but' onClick={correct ? this.onSubmit : undefined}><div className='valid'><Icon name='Check' /> </div></div>
                    </div>
                    <div className='photo'>
                        <Icon name='PencilCircle' className='pencil' />
                        {currentUser != null ? (currentUser.photo != null ? <img src={currentUser.photo} /> : <Icon name='UserImage' />) : <Icon name='UserImage' />}
                    </div>
                    <div className='w-80 flex-column d-flex justify-content-around'>
                        <label><div className='hint'> <Icon name='User' /></div>Ім'я
                            <input name="name"
                                placeholder="Назва"
                                value={this.state.user.name}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>
                        <label><div className='hint'> <Icon name='UserName' /></div>Ім'я користувача
                            <input name="userName"
                                placeholder="Назва"
                                value={this.state.user.userName}
                                onChange={this.onChange}
                                onBlur={this.validateField} />
                        </label>

                        <label className='age'><div className='hint'> <Icon name='Balloon' /> </div>День народження
                            <div><DayPickerInput
                                placeholder='День народження'
                                value={this.state.age}
                                formatDate={formatDate}
                                parseDate={parseDate}
                                onDayChange={this.ageChange} /> </div>
                            <div className='gender'>
                                <label className={`label ${this.state.user.gender == 0 ? '' : 'not-checked'}`}>
                                    <Icon name='Mars' />
                                    <input type="radio" value={0} name="gender" checked={this.state.user.gender === 0} onChange={this.onChange} onClick={this.validateField} />
                                </label>
                                <label className={`label ${this.state.user.gender == 1 ? '' : 'not-checked'}`}>
                                    <Icon name='Venus' />
                                    <input type="radio" value={1} name="gender" checked={this.state.user.gender === 1} onChange={this.onChange} onClick={this.validateField} />
                                </label>
                            </div>
                        </label>

                        <label><div className='hint'>   <Icon name='PhotoIcon' /> </div>Фото
                            <input name="photo"
                                placeholder="Фото"
                                value={this.state.user.photo}
                                onChange={this.onChange} />
                        </label>
                        <label><div className='hint'><Icon name='Password' />  </div>Старий пароль
                            <input name="oldPassword" type="password"
                                placeholder="Старий пароль"
                                value={this.state.oldPassword}
                                onChange={this.passwordChange}
                                onBlur={this.validateField} />
                        </label>
                        <label>
                            <div className='hint'> <Icon name='Password' />  </div>Новий пароль
                            <input name="newPassword"
                                type="password"
                                placeholder="Новий пароль"
                                value={this.state.newPassword}
                                onChange={this.passwordChange}
                                onBlur={this.validateField} />
                        </label>
                        <div className='section d-flex'>
                            <label className='contact'>
                                <Icon name='EditMail' />
                                <input name="email"
                                    placeholder="Email"
                                    value={this.state.user.email}
                                    onChange={this.onChange}
                                    onBlur={this.validateField} />
                            </label>
                            <label className='contact'>
                                <Icon name='EditTel' />
                                <input name="phoneNumber"
                                    placeholder="Телеграм"
                                    value={this.state.user.phoneNumber}
                                    onChange={this.onChange}
                                    onBlur={this.validateField} />
                            </label>
                            <label className='contact'><Icon name='EditInsta' />
                                <input name="instagram"
                                    placeholder="Instagram"
                                    value={this.state.user.instagram}
                                    onChange={this.onChange}
                                    onBlur={this.validateField} />
                            </label>
                        </div>
                    </div>

                </div>}
        </div>;
    }
}

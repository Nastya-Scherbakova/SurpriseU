import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon} from '../Shared/Icons';
import Authorized from './Utils/AuthHOC';
import { Route } from 'react-router-dom';
import Input, { DateInput } from '../Shared/Input';
import Fade from 'react-reveal/Fade';

@inject('userStore')
@observer
class EditUser extends React.Component {
    render() {
        const { currentUser, isUser } = this.props.userStore;
        return <Fade clear><div className="edit-form flex flex-column">
            <div style={styles.tabs}>
                { TabLink('/edit/account', ' Профіль ')}
                { TabLink('/edit/password', 'Пароль')}
                { TabLink('/edit/contacts', 'Контакти')}
            </div>
            <div className='photo'>
                <Icon name='PencilCircle' className='pencil' />
                {currentUser.photo != null ? <img src={currentUser.photo} /> : <Icon name='UserImage' /> }
            </div>
            <Route path="/edit/account" component={Account} />
            <Route path="/edit/password" component={Password} />
            <Route path="/edit/contacts" component={Contacts} />
        </div>
        </Fade>;
    }
}






const TabLink = (to, title) => <NavLink to={to} className='edit-tab' activeClassName="selected">{title}</NavLink>

var styles = {
    tabs: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        margin: '2vh 0 1vh 0'
    },
    tab: {
        outline: 'none',
        textDecoration: 'none',
        position: 'relative',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        height: '5vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888898'
    },
    formArea: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    gender: {
        display: 'flex',
        justifyContent:'space-between',
        width: '15vh',
        margin:'auto'
    },
    genderTrue: {
        width: '3vh',
        height: '3vh',
        opacity: 1
    },
    genderFalse: {
        width: '3vh',
        height: '3vh',
        opacity: 0.3
    },
    check: {
        fill: '#31394D',
        margin: '2vh auto'
    }
}

@inject('userStore')
@observer
class Account extends React.Component {
    state = {
        user: this.props.userStore.currentUser,
        name: this.props.userStore.currentUser.name,
        email: this.props.userStore.currentUser.email,
        photo: this.props.userStore.currentUser.photo,
        gender: this.props.userStore.currentUser.gender,
        age: '',
        errors: {
            name: '',
            email: '',
            photo: ''
        },
        formValid: [true]
     };
     
    componentDidMount() {
            var ageStr = this.state.age;
            var age = new Date(ageStr.substring(0, 4), ageStr.substring(5, 7), ageStr.substring(8, 10));
            this.setState({ age: age })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        e.target.value.length >= 5 && this.validateField(e)
    }

    ageChange=(date)=> {
        this.setState({ age: date })
    }
    validateField=(e)=> {
        let fieldErrors = this.state.errors,
            fieldValid = false,
            value = e.target.value;
        switch (e.target.name) {
            case 'name':
                fieldValid = value.length <= 30 && value.length >= 1 && value.search(/\d/) == -1;
                fieldErrors.name = fieldValid ? '' : `Ім'я не має містити цифр`;
                break;
            case 'email':
                let regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/;
                fieldValid = regexp.test(value);
                fieldErrors.email = fieldValid ? '' : 'Введіть коректний email';
                break;
            default:
                break;
        }
        this.setState({ errors: fieldErrors });
    }
    onSubmit=(e) =>{
        e.preventDefault();
        if (this.state.formValid.every(item => item)) {
            this.props.userStore.updateUser({
                name: this.state.user.name,
                email: this.state.user.email,
                gender: this.state.user.gender,
                age: this.state.user.age + ' 00:00:00',
                photo: this.state.user.photo,
                id: this.props.userStore.currentUser.id
            });
        }
    };

    render() {
        const { currentUser, isUser } = this.props.userStore;
        const { errors } = this.state;
        return <div style={styles.formArea}>

            <div style={styles.gender}>
                <label >
                    <Icon style={this.state.gender == 0 ? styles.genderTrue : styles.genderFalse} name='Mars' />
                    <input style={{display: 'none'}} type="radio" value={0} name="gender"  onChange={this.onChange} />
                </label>
                <label >
                    <Icon style={this.state.gender == 1 ? styles.genderTrue : styles.genderFalse} name='Venus' />
                    <input style={{ display: 'none' }} type="radio" value={1} name="gender"  onChange={this.onChange} />
                </label>
            </div>


            <Input label={`Ім'я`}
                    onChange={this.onChange}
                    value={this.state.name}
                    name="name"
                    iconName='User'
                    onBlur={this.validateField}
                    error={errors.name} />

                <Input label={`Ім'я користувача`}
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
                    iconName='UserName'
                    onBlur={this.validateField}
                    error={errors.email}/>
                <DateInput label={`День народження`}
                    value={this.state.age}
                    iconName='Balloon'
                    onDayChange={this.ageChange}
                     />
                 
                 <Input label='Фото'
                     onChange={this.onChange}
                     value={this.state.photo}
                     name="photo"
                     iconName='PhotoIcon'
                     onBlur={this.validateField}
                     error={errors.photo} />
                <Icon name='Check' style={styles.check}  onClick={this.onSubmit} />
            </div>
    }
}


@inject('userStore')
@observer
class Password extends React.Component {
    state = {
        newPassword: '',
        oldPassword: '',
        newPassword2: '',
        error: '',
        error2: ''
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = () => (this.state.error.length == 0 && this.state.error2.length == 0) &&
        this.props.userStore.changePassword({
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                id: this.props.userStore.currentUser.id
            });
        
    compare = () => {
        const { error2 } = this.state;
        error2 = this.state.newPassword == this.state.newPassword2 ? '' : 'Паролі відрізняються';
        this.setState({ error2 });
    };

    testComplexity = () => {
        const { error, newPassword, newPassword2 } = this.state;
        error = (newPassword.search(/\d/) == -1 || newPassword.length <= 6) ? 'Пароль має містити хоча б одну літеру та цифру' : '';
        newPassword2.length != 0 && this.compare();
        this.setState({ error });
    }


    render() {
        const { currentUser, isUser } = this.props.userStore;
        return <div style={styles.formArea}>
                <Input label={`Старий пароль`}
                    type="password"
                    onChange={this.onChange}
                    value={this.state.oldPassword}
                    name="oldPassword"
                    iconName='Password' />
                <Input label={`Новий пароль`}
                    type="password"
                    onChange={this.onChange}
                    onBlur={this.testComplexity}
                    value={this.state.newPassword}
                    name="newPassword"
                    error={this.state.error}
                    iconName='Password' />
                <Input label={`Повторіть пароль`}
                    type="password"
                    onChange={this.onChange}
                    onBlur={this.compare}
                    value={this.state.newPassword2}
                    name="newPassword2"
                    error={this.state.error2}
                    iconName='Password' />
                <Icon name='Check' style={styles.check} onClick={this.onSubmit} />
            </div>;
    }
}







@inject('userStore')
@observer
class Contacts extends React.Component {
    state = {
        mail: this.props.userStore.currentUser.email,
        telegram: '',
        instagram: '',
        formValid: [true]
    };
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.formValid.every(item => item)) {
            this.props.userStore.changeContacts({
                email: this.state.mail,
                id: this.props.userStore.currentUser.id
            });
        }
    };

    validateField(e) {
       
    }


    render() {
        const { currentUser, isUser } = this.props.userStore;
        return <div style={styles.formArea}>
            <Input label={`Email`}
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                iconName='EditMail' />
            <Input label={`Телеграм`}
                onChange={this.onChange}
                value={this.state.telegram}
                name="telegram"
                iconName='EditTel' />
            <Input label={`Instagram`}
                onChange={this.onChange}
                value={this.state.instagram}
                name="instagram"
                iconName='EditInsta' />
            <Icon name='Check' style={styles.check}  onClick={this.onSubmit} />
        </div>;
    }
}

export default Authorized(EditUser);

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import {  Redirect } from 'react-router'
import { Icon } from '../Shared/Icons';
import { Spinner } from '../Shared/Spinner';
import Input from './Input';
import Fade from 'react-reveal/Fade';

class Register extends React.Component {
    state = {
            name: '',
            email: '',
            gender: null,
            password: '',
            password2: '',
            formErrors: {
                name: 'null',
                email: 'null',
                gender: 'null',
                password: 'null',
                password2: 'null'
            },
            error: 'null',
            formValid: [null, null, null, null, null]
        };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        this.state.formValid.every(item => item) ? this.props.authStore.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            gender: Number(this.state.gender)
        }) : this.setState({error: 'Заповніть всі поля!'})
    };

    compare = () => this.state.password == this.state.password2 ? '' : 'Паролі відрізняються';

    testComplexity = () => (this.state.password.search(/\d/) == -1 || this.state.password.length <= 6) ? 'Пароль має містити хоча б одну літеру та цифру' : '';
     

    validateField= e => {
        let fieldErrors = this.state.formErrors,
            formValid = this.state.formValid,
            fieldValid = false,
            fieldName = e.target.name,
            value = e.target.value;
        switch (fieldName) {
            case 'name':
                fieldValid = value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1;
                fieldErrors.name = fieldValid ? '' : "Введіть ім'я";
                formValid[0] = fieldValid ? true : false;
                break;
            case 'email':
                let regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/;
                //Пропускаем до 15 символов a-z0-9_- перед собачкой, 
                //также это может быть до 4 слов, разделенных точками.
                //Затем собачка и имя домена (от 1 до 15 символов).
                //Затем доменная зона - от 2 до 6 латинских букв
                fieldValid = regexp.test(value);
                fieldErrors.email = fieldValid ? '' : 'Введіть коректний email';
                formValid[1] = fieldValid;
                break;
            case 'gender':
                formValid[2] = value >= 0 ? true : false;
                break;
            case 'password':
                this.state.password2.length != 0 && (fieldErrors.password2 = this.compare());
                fieldErrors.password = this.testComplexity();
                formValid[3] = !fieldErrors.password.length >= 5;
                formValid[4] = !fieldErrors.password2.length >= 5;
                break;
            case 'password2':
                fieldErrors.password2 = this.compare();
                formValid[4] = !fieldErrors.password2.length >= 5;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldErrors,
            formValid: formValid
        });
    }

   

    render() {
        return <form className='form d-flex justify-content-around flex-column align-items-center' onSubmit={this.onSubmit}>
            <Input iconName='User'
                name="name"
                placeholder="Ім'я"
                value={this.state.name}
                onChange={this.onChange}
                onBlur={this.validateField}
                error={this.state.formErrors.name} />
            <Input iconName='Email'
                name="email"
                placeholder="Електронна адреса"
                value={this.state.email}
                onChange={this.onChange}
                onBlur={this.validateField}
                error={this.state.formErrors.email} />
            <Input iconName='Password'
                name="password"
                placeholder="Пароль"
                value={this.state.password}
                onChange={this.onChange}
                onBlur={this.validateField}
                type='password'
                error={this.state.formErrors.password} />
            <Input iconName='Password'
                name="password2" type='password'
                placeholder="Повторіть пароль"
                value={this.state.password2}
                onChange={this.onChange}
                onBlur={this.validateField}
                error={this.state.formErrors.password2} />
            
            <div style={styles.gender}>
                <label >
                    <Icon style={this.state.gender == 0 ? styles.genderTrue : styles.genderFalse} name='Mars' />
                    <input style={{ display: 'none' }} type="radio" value={0} name="gender" onClick={this.validateField} onChange={this.onChange} />
                </label>
                <label >
                    <Icon style={this.state.gender == 1 ? styles.genderTrue : styles.genderFalse} name='Venus' />
                    <input style={{ display: 'none' }} type="radio" value={1} name="gender" onClick={this.validateField} onChange={this.onChange} />
                </label>
            </div>

           
             <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Зареєструватися</div>

             <Fade bottom collapse when={this.state.error.length > 5}>
                 <div style={styles.error}>
                     Заповніть всі поля
                </div>
             </Fade>
        </form>;

    }
}


const socialIcons = [' tw ', ' go ', ' face '].map((icon) =>
    <a key={icon} className={"d-flex justify-content-center align-items-center social-icon" + icon}></a>
);


var styles = {
    error: {
        color: '#DC3545'
    },
    gender: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '15vh',
        margin: 'auto'
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
    }
}

@inject('authStore')
@withRouter
@observer
class Login extends React.Component {
    state = {
            email: '',
            password: '',
            remember: false,
            forgetPassword: false
        };
       
    
    onRemember = () => this.setState(prevState => ({ remember: !prevState.remember }));
    onChange = e => this.setState({ [e.target.name]: e.target.value });
   
    onSubmit = e => {
        e.preventDefault();
        this.props.authStore.login({
            email: this.state.email,
            password: this.state.password,
            rememberMe: this.state.remember
        });
    };

    render() {
        const { errors, inProgress, loading } = this.props.authStore;
        return <form className='form d-flex justify-content-around flex-column  align-items-center' onSubmit={this.onSubmit}>
            <div className="d-flex justify-content-center flex-column  align-items-center">
                <div className="d-flex flex-row">
                    {socialIcons}
                </div>
            </div>

            <Fade bottom collapse when={errors == '401'}>
                <div style={styles.error}>
                    Невірний логін або пароль
                </div>
            </Fade>
            <Input iconName='User'
                name="email"
                required="required"
                placeholder="Логін"
                value={this.state.email}
                onChange={this.onChange} error='null'/>
            <Input iconName='Password'
                name="password"
                required="required"
                placeholder="Пароль"
                type="password"
                value={this.state.password}
                onChange={this.onChange} error='null'/>


            <div className='d-flex justify-content-center align-items-center w-100 check-label'>
                <span onClick={this.onRemember} className={`d-flex justify-content-center align-items-center mr-3 ${this.state.remember ? ' checkbox-true' : ' checkbox-false '}`}>
                    <Icon name='Check' className='check animated scaleIn'/>
                </span>
                Запам'ятати мене
            </div>

            {loading ? Spinner : <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Увійти</div>}
           
            </form>;
    }
}

@inject('userStore')
@withRouter
@observer
export default class LoginPage extends React.Component {
    state = { signIn: true };
    onRegister = () => this.setState({ signIn: false });
    onEnter = () => this.setState({ signIn: true });
    render() {
        const { currentUser, isUser } = this.props.userStore;
        return <div className='log-form w-100 h-100'>
           
            <div className="image"></div>
            <div className="content d-flex flex-column align-items-center">
                <div className={`${this.state.signIn && 'tab-active'} tab`} onClick={this.onEnter}>Вхід</div>
                <div className={`${this.state.signIn || 'tab-active'} tab`} onClick={this.onRegister}>Реєстрація</div>
                <NavLink className="name navlink-no" to={'/'}> <h2>SurpriseU</h2></NavLink>
              
                {this.state.signIn ? <Login /> : <Register />}
              
            </div>
            {currentUser != null && <Redirect to={`/id${currentUser.id.substr(0, 6)}`} />}
        </div>;

    }
}










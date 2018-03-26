import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import {  Check } from 'react-feather';
import { Redirect } from 'react-router'
import { Red, Ok, User, Email, Password } from './Icons';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            formValid: [null, null, null, null, null]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        this.state.formValid.every(item => item) && this.props.authStore.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            gender: Number(this.state.gender)
        });
    };

    validateField(e) {
        let fieldErrors = this.state.formErrors,
            formValid = this.state.formValid,
            fieldValid = false,
            fieldName = e.target.name,
            value = e.target.value;
        switch (fieldName) {
            case 'name':
                fieldValid = value.length <= 100 && value.length >= 3;
                fieldErrors.name = fieldValid ? '' : "Введіть ім'я";
                formValid[0] = fieldValid ? true : false;
                break;
            case 'email':
                fieldValid = value.length <= 100 && value.length >= 10;
                fieldErrors.email = fieldValid ? '' : 'Введіть коректний email';
                formValid[1] = fieldValid ? true : false;
                break;
            case 'gender':
                formValid[2] = value >= 0 ? true : false;
                break;
            case 'password':
                fieldValid = value.length >= 6;
                fieldErrors.password = fieldValid ? '' : 'Введіть коректний пароль';
                formValid[3] = fieldValid ? true : false;
                break;
            case 'password2':
                fieldValid = value.length >= 6 && value == this.state.password;
                fieldErrors.password2 = fieldValid ? '' : 'Паролі відрізняються';
                formValid[4] = fieldValid ? true : false;
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
        const showHint = (error) => error.length == 0 ? undefined : error != 'null' ? <p className='error'>{error}</p> : undefined,
            status = (error) => error.length == 0 ? Ok : error == 'null' ? undefined : Red;
        return <form className='form d-flex justify-content-around flex-column align-items-center' onSubmit={this.onSubmit}>
            <div className='field'>{User}
                <input name="name"
                    placeholder="Ім'я"
                    value={this.state.name}
                    onChange={this.onChange}
                    onBlur={this.validateField} />
                {status(this.state.formErrors.name)}
                {showHint(this.state.formErrors.name)}
            </div>

            <div className='field'> {Email}
                <input name="email"
                    placeholder="Електронна адреса"
                    value={this.state.email}
                    onChange={this.onChange}
                    onBlur={this.validateField} />
                {status(this.state.formErrors.email)}
                {showHint(this.state.formErrors.email)} </div>
           

            <div className='field'>{Password}
                <input name="password"
                placeholder="Пароль"
                value={this.state.password}
                onChange={this.onChange}
                onBlur={this.validateField}
                type="password" />
                {status(this.state.formErrors.password)}
                {showHint(this.state.formErrors.password)}</div>
          


             <div className='field'>{Password}
                <input name="password2"
                    placeholder="Повторіть пароль"
                    value={this.state.password2}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    type="password" />
                {status(this.state.formErrors.password2)}
                {showHint(this.state.formErrors.password2)} </div>
            

                    <div className='w-75 gender d-flex justify-content-center'>
                <label className='w-50 d-flex justify-content-center'>
                            <input type="radio" value={0} name="gender" checked={this.state.gender === 0} onChange={this.onChange} onClick={this.validateField} />
                            <div className={(this.state.gender == 0) ? ('male male' + '-checked') : 'male'} ></div>
                        </label>
                <label className='w-50 d-flex justify-content-center'>
                            <input type="radio" value={1} name="gender" checked={this.state.gender === 1} onChange={this.onChange} onClick={this.validateField} />
                            <div className={(this.state.gender == 1) ? ('female female' + '-checked') : 'female'} ></div>
                        </label>
                    </div>
                    <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Зареєструватися</div>
            </form>;

    }
}


const socialIcons = [' tw ', ' go ', ' face '].map((icon) =>
    <a key={icon} className={"d-flex justify-content-center align-items-center social-icon" + icon}></a>
);


@inject('authStore')
@withRouter
@observer
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            remember: false,
            forgetPassword: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRemember = this.onRemember.bind(this);
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
            <div className='field'>{User}
            <input className='inpt'
                name="email"
                required="required"
                placeholder="Логін"
                value={this.state.email}
                onChange={this.onChange}
                type="email" /></div>
            <div className='field'>{Password}
            <input className='inpt'
                name="password"
                required="required"
                placeholder="Пароль"
                value={this.state.password}
                onChange={this.onChange}
                type="password" />
            <div className="forget-text">Забули пароль?</div>
         </div>

            {errors == '401' && <p className='login-error'>Невірний логін або пароль</p>}

            <div className='d-flex justify-content-center align-items-center w-100 check-label'>
                <span onClick={this.onRemember} className={`d-flex justify-content-center align-items-center mr-3 ${this.state.remember ? ' checkbox-true' : ' checkbox-false '}`}><Check className='check animated scaleIn' /></span>
                Запам'ятати мене
            </div>

            {loading ? Spinner : <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Увійти</div>}
           
            </form>;
    }
}

@inject('userStore')
@withRouter
@observer
export class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: true
        };
    }
    onRegister = () => this.setState({ signIn: false });
    onEnter = () => this.setState({ signIn: true });
    render() {
        const { currentUser } = this.props.userStore;
      
        return <div className='log-form w-100 h-100'>
           
            <div className="image"></div>
            <div className="content d-flex flex-column align-items-center">
                <div className={`${this.state.signIn && 'tab-active'} tab`} onClick={this.onEnter}>Вхід</div>
                <div className={`${this.state.signIn || 'tab-active'} tab`} onClick={this.onRegister}>Реєстрація</div>
                <NavLink className="name navlink-no" to={'/'}> <h2>SurpriseU</h2></NavLink>
              
                {this.state.signIn ? <Login /> : <Register />}
              
            </div>
            {currentUser != null && <Redirect to={`/${currentUser.userName}`} />}
        </div>;

    }
}



const Spinner = <div className='spinner'>
    <div className='circle'><div className='inner'></div></div>
    <div className='circle'><div className='inner'></div></div>
    <div className='circle'><div className='inner'></div></div>
    <div className='circle'><div className='inner'></div></div>
    <div className='circle'><div className='inner'></div></div>
</div>







import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import {  Check } from 'react-feather';
import { Redirect } from 'react-router'

@inject('authStore')
@withRouter
@observer
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
                name: '',
                email: '',
                password: '',
                password2: ''
            },
            formValid: [false, false, false, false]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isErrorField = this.isErrorField.bind(this);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        this.props.authStore.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            gender: Number(this.state.gender)
        })
            .then(() => this.props.history.replace('/'));
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
                fieldValid = value == this.state.password;
                fieldErrors.password = fieldValid ? '' : 'Паролі відрізняються';
                formValid[3] = fieldValid ? true : false;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldErrors,
            formValid: formValid
        });
    }

    errorClass = (error) => error.length === 0 ? '' : 'has-error';

    isErrorField = (error) => error.length > 0 ? <p className='d-flex justify-content-center'>{error}</p> : <p > </p>;

    render() {
        let field = this.state.formValid,
            allFields = field[0] && field[1] && field[2] && field[3];
        return <form className='form d-flex justify-content-around flex-column align-items-center' onSubmit={this.onSubmit}>
                    <input className={`inpt ${this.errorClass(this.state.formErrors.name)}`}
                        name="name"
                        required="required" 
                        placeholder="Ім'я"
                        value={this.state.name}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        type="name"/>
                    {this.isErrorField(this.state.formErrors.name)}
                    <input className={`inpt ${this.errorClass(this.state.formErrors.email)}`}
                        name="email"
                        required="required" 
                        placeholder="Електронна адреса"
                        value={this.state.email}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        type="email" />
                    {this.isErrorField(this.state.formErrors.email)}
                    <input className={`inpt ${this.errorClass(this.state.formErrors.password)}`}
                        required="required" 
                        name="password"
                        placeholder="Пароль"
                        value={this.state.password}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        type="password" />
                    {this.isErrorField(this.state.formErrors.password)}
                    <input className={`inpt ${this.errorClass(this.state.formErrors.password2)}`}
                        required="required"
                        name="password2"
                        placeholder="Повторіть пароль"
                        value={this.state.password2}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        type="password" />
                    {this.isErrorField(this.state.formErrors.password2)}

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
                    <div onClick={this.onSubmit} className="sbm-but mb-3 d-flex justify-content-center align-items-center">Зареєструватися</div>
            </form>;

    }
}



const socialIcons = [' tw ', ' go ', ' face '].map((icon) =>
    <a key={icon} className={"d-flex justify-content-center align-items-center social-icon" + icon}></a>
);


@inject('authStore', 'userStore')
@withRouter
@observer
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            remember: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRemember = this.onRemember.bind(this);
    }

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
        const { errors, inProgress } = this.props.authStore;
        const { isUser } = this.props.userStore;
        return <form className='form d-flex justify-content-around flex-column  align-items-center' onSubmit={this.onSubmit}>
            <div className="d-flex justify-content-center flex-column  align-items-center">
                <div className="d-flex flex-row">
                    {socialIcons}
                </div>
            </div>
            <input className='inpt'
                name="email"
                required="required"
                placeholder="Логін"
                value={this.state.email}
                onChange={this.onChange}
                type="email" />
            <input className='inpt'
                name="password"
                required="required"
                placeholder="Пароль"
                value={this.state.password}
                onChange={this.onChange}
                type="password" />
            {errors == '401' && <p className='login-error'>Неправильний логін або пароль</p>}
           

            <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Увійти</div>

            <label className='d-flex justify-content-center align-items-center w-100 check-label'>
                <span onClick={this.onRemember} className={`d-flex justify-content-center align-items-center mr-3 ${this.state.remember ? ' checkbox-true' : ' checkbox-false '}`}><Check className='check animated scaleIn' /></span>
                Запам'ятати мене
            </label>
                    <div className="d-flex justify-content-center">Забули пароль?</div>
                    {isUser && <Redirect to="/profile" />}
            </form>;
    }
}

@inject('authStore', 'userStore')
@withRouter
@observer
export class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: 0
        };
        this.onTab = this.onTab.bind(this);
    }
    onTab = e => this.setState({ signIn: e.target.value });
    render() {
        return <div className='w-100 h-100 d-flex justify-content-center'>
            <div className='log-form row'>
            <div className="image"></div>
            <div className="content d-flex flex-column justify-content-around align-items-center">
                    <div className=" d-flex name justify-content-center align-items-center">
                        <h2>SurpriseU</h2>
                    </div>
                    <div className="tabs d-flex justify-content-start align-items-bottom ">
                            <label className={(this.state.signIn == 0) ? ('tab tab-active') : ('tab')}> Вхід
                                <input type="radio" value={0} onClick={this.onTab} />
                            </label>
                            <label className={(this.state.signIn == 1) ? ('tab tab-active') : ('tab')}>Реєстрація
                                <input type="radio" value={1} onClick={this.onTab} />
                            </label>
                    </div>
                    {(this.state.signIn == 0) ? <Login /> : <Register />}
            </div>
            </div>
        </div>;

    }
}

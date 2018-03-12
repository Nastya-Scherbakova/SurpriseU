import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import {  Check } from 'react-feather';
import { Redirect } from 'react-router'
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
            status = (error) => error.length == 0 ? Green : error == 'null' ? undefined : Red;
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


@inject('authStore', 'userStore')
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
        const { errors, inProgress } = this.props.authStore;
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

            <div onClick={this.onSubmit} className="sbm-but d-flex justify-content-center align-items-center">Увійти</div>
           
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
            {currentUser != null && <Redirect to="/profile" />}
        </div>;

    }
}










const User = <div className='hint'><svg viewBox="0 0 482.9 482.9" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px">
    <defs>
        <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="10%" stopColor="#1C1C59" />
            <stop offset="100%" stopColor="#03A9F4" />
        </linearGradient>
    </defs>
    <g>
        <path fill="url(#icon)" d={`M239.7,260.2c0.5,0,1,0,1.6,0c0.2,0,0.4,0,0.6,0c0.3,0,0.7,0,1,0c29.3-0.5,53-10.8,70.5-30.5
            c38.5-43.4,32.1-117.8,31.4-124.9c-2.5-53.3-27.7-78.8-48.5-90.7C280.8,5.2,262.7,0.4,242.5,0h-0.7c-0.1,0-0.3,0-0.4,0h-0.6
			c-11.1,0-32.9,1.8-53.8,13.7c-21,11.9-46.6,37.4-49.1,91.1c-0.7,7.1-7.1,81.5,31.4,124.9C186.7,249.4,210.4,259.7,239.7,260.2z
			 M164.6,107.3c0-0.3,0.1-0.6,0.1-0.8c3.3-71.7,54.2-79.4,76-79.4h0.4c0.2,0,0.5,0,0.8,0c27,0.6,72.9,11.6,76,79.4
			c0,0.3,0,0.6,0.1,0.8c0.1,0.7,7.1,68.7-24.7,104.5c-12.6,14.2-29.4,21.2-51.5,21.4c-0.2,0-0.3,0-0.5,0l0,0c-0.2,0-0.3,0-0.5,0
			c-22-0.2-38.9-7.2-51.4-21.4C157.7,176.2,164.5,107.9,164.6,107.3z`} />
        <path fill="url(#icon)" d="M446.8,383.6c0-0.1,0-0.2,0-0.3c0-0.8-0.1-1.6-0.1-2.5c-0.6-19.8-1.9-66.1-45.3-80.9c-0.3-0.1-0.7-0.2-1-0.3 c-45.1-11.5-82.6-37.5-83-37.8c-6.1-4.3-14.5-2.8-18.8,3.3c-4.3,6.1-2.8,14.5,3.3,18.8c1.7,1.2,41.5,28.9,91.3,41.7 c23.3,8.3,25.9,33.2,26.6,56c0,0.9,0,1.7,0.1,2.5c0.1,9-0.5,22.9-2.1,30.9c-16.2,9.2-79.7,41-176.3,41 c-96.2,0-160.1-31.9-176.4-41.1c-1.6-8-2.3-21.9-2.1-30.9c0-0.8,0.1-1.6,0.1-2.5c0.7-22.8,3.3-47.7,26.6-56 c49.8-12.8,89.6-40.6,91.3-41.7c6.1-4.3,7.6-12.7,3.3-18.8c-4.3-6.1-12.7-7.6-18.8-3.3c-0.4,0.3-37.7,26.3-83,37.8 c-0.4,0.1-0.7,0.2-1,0.3c-43.4,14.9-44.7,61.2-45.3,80.9c0,0.9,0,1.7-0.1,2.5c0,0.1,0,0.2,0,0.3c-0.1,5.2-0.2,31.9,5.1,45.3 c1,2.6,2.8,4.8,5.2,6.3c3,2,74.9,47.8,195.2,47.8s192.2-45.9,195.2-47.8c2.3-1.5,4.2-3.7,5.2-6.3 C447,415.5,446.9,388.8,446.8,383.6z" />
    </g>
</svg></div>

const Email = <div className='hint'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 483.3 483.3" >
    <g>
        <path fill="url(#icon)" d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1 v-249.5C483.4,84.35,456.9,57.75,424.3,57.75z M456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5 c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z" />
        <path fill="url(#icon)" d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3 c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95 c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4 c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z" />
    </g>
</svg></div>

const Password = <div className='hint'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 482.8 482.8">
    <g>
        <path fill="url(#icon)" d="M395.95,210.4h-7.1v-62.9c0-81.3-66.1-147.5-147.5-147.5c-81.3,0-147.5,66.1-147.5,147.5c0,7.5,6,13.5,13.5,13.5 s13.5-6,13.5-13.5c0-66.4,54-120.5,120.5-120.5c66.4,0,120.5,54,120.5,120.5v62.9h-275c-14.4,0-26.1,11.7-26.1,26.1v168.1 c0,43.1,35.1,78.2,78.2,78.2h204.9c43.1,0,78.2-35.1,78.2-78.2V236.5C422.05,222.1,410.35,210.4,395.95,210.4z M395.05,404.6 c0,28.2-22.9,51.2-51.2,51.2h-204.8c-28.2,0-51.2-22.9-51.2-51.2V237.4h307.2L395.05,404.6L395.05,404.6z" />
        <path fill="url(#icon)" d="M241.45,399.1c27.9,0,50.5-22.7,50.5-50.5c0-27.9-22.7-50.5-50.5-50.5c-27.9,0-50.5,22.7-50.5,50.5 S213.55,399.1,241.45,399.1z M241.45,325c13,0,23.5,10.6,23.5,23.5s-10.5,23.6-23.5,23.6s-23.5-10.6-23.5-23.5 S228.45,325,241.45,325z" />
    </g>
</svg></div>
const Green = <div className='valid'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512">
    <g>
        <path fill="#5BD2B3" stroke="#5BD2B3" strokeWidth='30'd={`M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
			c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
			C514.5,101.703,514.499,85.494,504.502,75.496z`} /> </g>
</svg></div>

const Red = <div className='valid'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" >
    <g>
        <path fill="#D25C5C" stroke="#D25C5C" strokeWidth='20' d={`M505.922,476.567L285.355,256L505.92,35.435c8.106-8.105,8.106-21.248,0-29.354c-8.105-8.106-21.248-8.106-29.354,0
            L256.001,226.646L35.434,6.081c-8.105-8.106-21.248-8.106-29.354,0c-8.106,8.105-8.106,21.248,0,29.354L226.646,256L6.08,476.567
			c-8.106,8.106-8.106,21.248,0,29.354c8.105,8.105,21.248,8.106,29.354,0l220.567-220.567l220.567,220.567
			c8.105,8.105,21.248,8.106,29.354,0S514.028,484.673,505.922,476.567z`}/> </g>
</svg></div>

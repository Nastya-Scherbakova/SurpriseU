import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            gender: null,
            password: '',
            formErrors: {
                name: '',
                email: '',
                password: ''
            },
            formValid: [false, false, false, false]
        };
        this.onAddUser = this.onAddUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isErrorField = this.isErrorField.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var newName = this.state.name,
            newPassword = this.state.password,
            newGender = Number(this.state.gender),
            newEmail = this.state.email;
        this.onAddUser({
            name: newName,
            email: newEmail,
            gender: newGender,
            password: newPassword
        });
        this.setState({
            name: props.name,
            email: props.email,
            gender: props.gender,
            password: props.password
        });

    };

    onAddUser(user) {
        if (user) {
            var data = JSON.stringify({
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "gender": user.gender,
            });
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
                else alert(xhr.status + ': ' + xhr.statusText);
            }.bind(this);
            xhr.send(data);
        }
    }

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
        const socialIcons = [' tw ', ' go ', ' face '].map((icon) =>
            <a key={icon} className={"d-flex justify-content-center align-items-center social-icon" + icon}></a>
        );
        let field = this.state.formValid,
            allFields = field[0] && field[1] && field[2] && field[3],
            check = allFields ? <div onClick={this.onSubmit} className="sbm-but">Зареєструватися</div> :
                <div className="sbm-but">Зареєструватися</div>;
        return <div>
            <div className="d-flex justify-content-center flex-column  align-items-center">
                <div className="d-flex flex-row">
                    {socialIcons}
                </div>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="d-flex justify-content-around flex-column input-area ">
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
                        maxLength='20'
                        type="email" />
                    {this.isErrorField(this.state.formErrors.email)}
                    <input className={`inpt ${this.errorClass(this.state.formErrors.password)}`}
                        required="required" 
                        name="password"
                        placeholder="Пароль"
                        value={this.state.password}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        maxLength='20'
                        type="password" />
                    {this.isErrorField(this.state.formErrors.password)}
                </div>
                <div className='w-100 mb-4 gender d-flex justify-content-around'>
                    {
                        [
                            { value: 0, gender: "male" },
                            { value: 1, gender: "female" }
                        ].map((item) => <label>
                            <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                            <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender)} ></div>
                        </label>)
                    }
                </div>
                <div  className="submit-wrap d-flex align-items-center">
                    {check}
                </div>
            </form>
        </div>;

    }
}




class SignIn extends React.Component {
    render() {
        const socialIcons = [' tw ', ' go ', ' face '].map((icon) =>
            <a key={icon} className={"d-flex justify-content-center align-items-center social-icon"+icon}></a>
        );

        return <div>
            <form action="#" method="post">
                <div className="d-flex justify-content-center flex-column  align-items-center">
                    <div className="d-flex flex-row">
                        {socialIcons}
                    </div>
                </div>
                <div className="d-flex justify-content-around flex-column input-area-2 ">
                    <input type="email" name="email" id="email" className="inpt" required="required" placeholder="Логін" />
                    <input type="password" name="password" id="password" className="inpt" required="required" placeholder="Пароль" />
                    <input type="submit" value="Увійти" className="sbm-but" />
                </div>
                <div className="d-flex justify-content-center">Забули пароль?</div>
                

            </form>
        </div>;

    }
}


export class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.onTab = this.onTab.bind(this);
        this.state = {
            signIn: true
        };
    }

    onTab() {
        this.setState(prevState => ({
            signIn: !prevState.signIn
        }));
    }
    render() {
        const signIn = this.state.signIn;
        let classI, classU, spans = null;
        if (signIn) {
            classI = 'tab active-tab';
            classU = 'tab ';
        } else {
            classI = 'tab';
            classU = 'tab active-tab';
        }
        return <div className='w-100 h-100 d-flex justify-content-center'>
            <div className='log-form row'>
            <div className="image"></div>
            <div className="content ">
                <div >
                    <div className=" d-flex  justify-content-center align-items-center">
                    <h2 className="name">SurpriseU</h2>
                    </div>
                        
                    <div className="tabs d-flex justify-content-start">
                        <span className={classI}><a onClick={this.onTab}>Вхід</a></span>
                        <span className={classU}><a onClick={this.onTab}>Реєстрація</a></span>
                    </div>
                </div>
                <div>
                        {signIn ? <SignIn /> : <SignUp apiUrl="/Account/Register"/>}
                </div>
            </div>
            </div>
        </div>;

    }
}

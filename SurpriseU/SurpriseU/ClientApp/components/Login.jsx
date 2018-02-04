import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 0
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return <div>
            <form action="#" method="post">
                <div className="d-flex justify-content-around flex-column input-area ">
                <input type="name" name="name" id="name" className="inpt" required="required" placeholder="Ім'я"/>
               <input type="email" name="email" id="email" className="inpt" required="required" placeholder="Електронна адреса"/>
                <input type="password" name="password" id="password" className="inpt" required="required" placeholder="Пароль"/>
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
                <input type="submit" value="Зареєструватися" className="sbm-but"/>
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
                        {signIn ? <SignIn /> : <SignUp />}
                </div>
            </div>
            </div>
        </div>;

    }
}

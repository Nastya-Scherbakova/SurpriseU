import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';

class ToogleSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.onMale = this.onMale.bind(this);
        this.onFemale = this.onFemale.bind(this);
        this.state = {
            female: false,
            male: true,
            classSw: 'sw-blue',
            classCr: 'cr-blue float-left'
        };
    }

    onFemale() {
        this.setState({
            female: true,
            male: false,
            classSw: 'sw-pink',
            classCr: 'cr-pink float-right'
        });
    }

    onMale() {
        this.setState({
            female: false,
            male: true,
            classSw: 'sw-blue',
            classCr: 'cr-blue float-left'
        });
    }

    render() {
        const male = this.state.male;
        const classSw = this.state.classSw;
        const classCr = this.state.classCr;
        let div = null;
        if (male) {
            div = <div className={classCr} onClick={this.onFemale}></div>
        } else {
            div = <div className={classCr} onClick={this.onMale}></div>
        }
        return <div>
            <div className={classSw}>
                {div}
            </div>
        </div>;

    }
}


class SignUp extends React.Component {
    render() {
        return <div>
            
            <form action="#" method="post">
                <div className="d-flex justify-content-around flex-column input-area ">
                <input type="name" name="name" id="name" className="inpt" required="required" placeholder="Your name"/>
             
                <input type="email" name="email" id="email" className="inpt" required="required" placeholder="Your email"/>
          
                 <input type="password" name="password" id="password" className="inpt" required="required" placeholder="Your password"/>
                
                 <input type="gender" name="gender" id="gender" className="inpt" required="required" placeholder="Your gender" />
                 <ToogleSwitch />
                 </div>
                <div  className="submit-wrap d-flex align-items-center">
                <input type="submit" value="Sign up" className="sbm-but"/>
            </div>
            </form>
        </div>;

    }
}


class SignIn extends React.Component {
    render() {
        return <div>
            iniiiiininin
        </div>;

    }
}


export class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.state = {
            signIn: false,
            signUp: true,
            classIn: 'tab ',
            classUp: 'tab active-tab'
        };
    }

    onSignIn() {
        this.setState({
            signIn: true,
            signUp: false,
            classIn: 'tab active-tab',
            classUp: 'tab '

        });
    }

    onSignUp() {
        this.setState({
            signIn: false,
            signUp: true,
            classIn: 'tab ',
            classUp: 'tab active-tab'
        });
    }

    render() {
        const signIn = this.state.signIn;
        const classI = this.state.classIn ;
        const classU =  this.state.classUp ;
        return <div className="row user-form">
            <div className="half-form-left "></div>
            <div className="half-form-right ">
                <div >
                    <div className=" d-flex  justify-content-center align-items-center">
                    <h2 className="form-name">SurpriseU</h2>
                    </div>
                    <div className="tabs">
                        <span className={classU}><a onClick={this.onSignUp}>Sign up</a></span>
                        <span className={classI}><a onClick={this.onSignIn}>Sign in</a></span>
                    </div>
                </div>
                <div>
                    {signIn ? <SignIn /> : <SignUp />}
                </div>
            </div>

        </div>;

    }
}

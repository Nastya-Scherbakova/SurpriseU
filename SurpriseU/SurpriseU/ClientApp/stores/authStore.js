import { observable, action, reaction } from 'mobx';
import requests from '../requests';
import userStore from './userStore';
import { validate } from '../ui/validation'


class AuthStore {
    @observable inProgress = false;
    @observable errors = '';
    @observable loading = false;
    @observable user = {
        email:'', 
        password: ''
    }
    @observable newUser = {
        email:'',
        name: '',
        password: '',
        password2: '',
        gender: 0
    }
    @observable newErrors = {
        email: null,
        name: null,
        password: null,
        password2: null
    }

@action updateLogin = (field, login) => this.user.email = login;

@action updatePassword = (field, password) => this.user.password = password;

@action registerChange = (field, value) => {
    this.newUser[field] = value;
};
@action comparePasswords = (field, value) => {
    this.newErrors[field] = value == this.newUser.password ? '' : 'Паролі відрізняються';
};
@action onFieldBlur = (field, value) => {
    this.newErrors[field]= validate(field, value);
};

    @action login() {
        this.loading = true;
        return requests.Auth.login(this.user)
            .catch(action((err) => {
                if (err.status == '401') {
                    this.loading = false;
                    this.errors = '401';
                };
                throw err;
            }))
            .then(action(user => {
                this.errors = '';
                userStore.pullUser(user)
            }));
        
    }

    @action register() {
        console.log(this.newUser)
        return requests.Auth.register(this.newUser)
            .then(action(user => userStore.pullUser(user)));
    }

    @action logout() {
        this.loading = false
        userStore.forgetUser();
        requests.Auth.logout();
    }

    @action forgetPassword(user) {

    }
}

export default new AuthStore();
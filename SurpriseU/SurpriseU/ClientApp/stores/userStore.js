import { observable, action, reaction } from 'mobx'
import requests from '../requests'
import { validate } from '../components/validation'

class UserStore {
    @observable currentUser = null;
    @observable isUser = false;
    @observable isAdmin = false;

    @observable password = {
        old: '',
        password: '',
        repeat: '',
        complexity: null,
        compare: null
    }

    @observable editForm = {
        name: '',
        email: '',
        gender: 0,
        photo: '',
        age: ''
    }

    @observable editErrors = {
        name: null,
        email: null,
        gender: null,
        photo: null,
        age: null
    }
    @action pullUser(user) {
        this.currentUser = user;
        this.editForm = {
            name: this.currentUser.name,
            email: this.currentUser.email,
            gender: this.currentUser.gender,
            photo: this.currentUser.photo,
            age: this.currentUser.age
            }
        this.isUser = true;
    }
    @action updateUser(newUser) {
        //this.updatingUser = true;

        requests.Auth.update(newUser);
        //    .then(action(({ user }) => { this.currentUser = user; }))



        //.finally(action(() => { this.updatingUser = false; }))
    }



    @action forgetUser() {
        this.currentUser = undefined;
        this.isUser = false;
    }


    @action getRole() {
        //this.loadingUser = true;
        this.isAdmin = this.currentUser.role === 'admin' ? true : false;
        //.finally(action(() => { this.loadingUser = false; }))
    }

    @action compare = (field, value) => this.password.compare = value == this.password.password ? '' : 'Паролі відрізняються';

    @action isComplex = (field, value) => this.password.complexity = validate(field, value);

    @action onPasswordChange = (field, value) => this.password[field] = value;

    @action onFieldChange = (field, value) => this.editForm[field] = value;

    @action onFieldBlur = (field, value) =>  this.editErrors[field] = validate(field, value);
}

export default new UserStore();



    //@action getUser() {
    //    //this.loadingUser = true;
    //    return requests.Auth.current()
    //        .then(action(({ user }) => {
    //            this.currentUser = user;
    //            this.getRole();
    //            this.isUser = true;
    //        }))
    //        .catch(action((err) => {
    //            if (err.status == '') {
    //                this.currentUser = undefined;
    //                this.isUser = false;
    //            };
    //            throw err;
    //        }))
    //    //.finally(action(() => { this.loadingUser = false; }))
    //}
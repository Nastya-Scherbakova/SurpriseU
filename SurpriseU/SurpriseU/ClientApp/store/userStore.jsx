import { observable, action, reaction } from 'mobx';
import requests from '../requests';

class UserStore {
    @observable currentUser;
    //@observable updatingUser;
    //@observable updatingUserErrors;
    
    @observable isUser = false;
    @observable isAdmin = false;

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
    @action getUser() {
        console.log(this.isUser);
        this.isUser = true;
        console.log(this.isUser);
    }
    @action updateUser(newUser) {
        //this.updatingUser = true;
        return requests.Auth.save(newUser)
            .then(action(({ user }) => { this.currentUser = user; }))
            //.finally(action(() => { this.updatingUser = false; }))
    }

    @action forgetUser() {
        this.currentUser = undefined;
        this.isUser = false;
    }


    @action getRole() {
        //this.loadingUser = true;
        this.isAdmin = this.currentUser.role == 'admin' ? true : false;
        //.finally(action(() => { this.loadingUser = false; }))
    }
}

export default new UserStore();
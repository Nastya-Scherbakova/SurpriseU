import { observable, action, reaction } from 'mobx';
import requests from '../requests';

class UserStore {
    @observable currentUser = undefined;
    @observable isUser = false;
    @observable isAdmin = false;

    @action pullUser(user) {
        this.currentUser = user;
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
        this.isAdmin = this.currentUser.role == 'admin' ? true : false;
        //.finally(action(() => { this.loadingUser = false; }))
    }
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
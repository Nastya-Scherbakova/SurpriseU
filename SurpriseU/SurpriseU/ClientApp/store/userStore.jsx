import { observable, action, reaction } from 'mobx';
import requests from '../requests';

class UserStore {

    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;

    @action pullUser() {
        this.loadingUser = true;
        return requests.Auth.current()
            .then(action(({ user }) => { this.currentUser = user; }))
            .finally(action(() => { this.loadingUser = false; }))
    }

    @action updateUser(newUser) {
        this.updatingUser = true;
        return requests.Auth.save(newUser)
            .then(action(({ user }) => { this.currentUser = user; }))
            .finally(action(() => { this.updatingUser = false; }))
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }

}

export default new UserStore();
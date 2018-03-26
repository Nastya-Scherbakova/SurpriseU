import { observable, action, reaction } from 'mobx';
import requests from '../requests';
import userStore from './userStore';


class AuthStore {
    @observable inProgress = false;
    @observable errors = '';
    @observable loading = false;

    @action login(user) {
        this.loading = true;
        return requests.Auth.login(user)
            .catch(action((err) => {
                if (err.status == '401') {
                    this.loading = false;
                    this.errors = '401';
                };
                throw err;
            }))
            .then(action(user => userStore.pullUser(user)));
        
    }

    @action register(user) {
        return requests.Auth.register(user)
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
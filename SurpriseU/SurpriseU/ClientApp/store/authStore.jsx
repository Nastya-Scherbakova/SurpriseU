import { observable, action, reaction } from 'mobx';
import requests from '../requests';
import userStore from './userStore';


class AuthStore {
    @observable inProgress = false;
    @observable errors = '';

    @action login(user) {
        return requests.Auth.login(user)
            .catch(action((err) => {
                if (err.status == '401') {
                    this.errors = '401';
                };
                throw err;
            }))
            .then(action(user => userStore.pullUser(user)));
    }

    @action register(user) {
        return requests.Auth.register(user)
            .then(action((res) => {
                alert('true' + res.status);
            }))
            .catch(action((err) => {
                alert(err.status);
                throw err;
            }))
    }

    @action logout() {
        userStore.forgetUser();
    }

}

export default new AuthStore();
import { observable, action, reaction } from 'mobx';
import requests from '../requests';
import userStore from './userStore';


class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @action login(user) {
        return requests.Auth.login(user)
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { userStore.getUser()}));
    }

    @action register(user) {
        this.errors = undefined;
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
        //commonStore.setToken(undefined);
        userStore.forgetUser();
        //return Promise.resolve();
    }

}

export default new AuthStore();
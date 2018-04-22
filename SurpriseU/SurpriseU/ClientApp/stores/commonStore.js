import { observable, action, reaction } from 'mobx';
import requests from '../requests';
class CommonStore {

    @observable token;
    //@observable appLoaded = false;

    constructor() {
        this.token = '';
    }
   
    @action setToken(token) {
        this.token = token;
    }

    //@action setAppLoaded() {
    //    this.appLoaded = true;
    //}

}

export default new CommonStore();
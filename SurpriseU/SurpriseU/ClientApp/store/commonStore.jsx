import { observable, action, reaction } from 'mobx';
import requests from '../requests';
import $ from "jquery";
class CommonStore {

    @observable token;
    //@observable appLoaded = false;

    constructor() {
        this.token =  $('input:hidden[name="__RequestVerificationToken"]').val();
    }
   
    @action setToken(token) {
        this.token = token;
    }

    //@action setAppLoaded() {
    //    this.appLoaded = true;
    //}

}

export default new CommonStore();
import { observable, action, computed } from 'mobx';
import requests from '../requests';
import { validate } from '../components/validation'

export class PresentsStore {
    @observable isLoading = false;
    @observable presentsState = [];
    @observable isFilter = false;
    @observable presentById = null;
    @observable formPresent = {
        title: '',
        content: '',
        gender: 0,
        photo: '',
        startAge: 6,
        endAge: 28
    }
    @observable formErrors = {
        title: null,
        content: null,
        gender: null,
        photo: null,
        startAge: null,
        endAge: null,
        form: null 
    }
    @observable searchParams = {
        title: '',
        gender: 0,
        startAge: 0,
        endAge: 100,
        tags: []
    }

    @action getEditablePresent(id) {
        this.presentById && this.presentById.id === id || this.getPresent(id);
        this.formPresent = {
            title: this.presentById.title || '',
            content: this.presentById.content || '',
            gender: this.presentById.gender || 0,
            photo: this.presentById.photo || '',
            startAge: this.presentById.startAge || 0,
            endAge: this.presentById.endAge || 100,
        }
    }
    @action newPresent() {
        this.formPresent = {
            title: '',
            content: '',
            gender: 0,
            photo: '',
            startAge: 0,
            endAge: 100
        }
        this.presentById = null;
    }
  

    @action searchPresents() {
        //requests.Presents.search(present).then(
        //    action(presents => {
        //        this.presentsState = presents.slice('');
        //    })
        //)
        var xhr = new XMLHttpRequest();
        xhr.open("post", '/api/Presents/Search', true);
        xhr.responseType = "blob";
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(this.searchParams));
        xhr.onload = function () {
            console.log(xhr.responseText);
        }
    }
    
  

    @action loadPresents() {
        this.isLoading = true;
        requests.Presents.all().then(
            action(presents => this.presentsState = presents.slice())
        )
      this.isLoading = false;
    }

    @action onSubmit = () => this.presentById == null ? this.createPresent(this.formPresent) : this.editPresent(this.formPresent)

    @action createPresent(pr) {
        this.presentsState.push(pr);
        return requests.Presents.add(pr);
    }
    

    @action deletePresent(id) {
        return requests.Presents.del(id)
            .then(action(() => this.loadPresents()))
    }

    @action editPresent(present) {
        return requests.Presents.edit(present)
            .then(action(() => {
                this.loadPresents();
            }))
    }
   
    @action getPresent(id) {
        this.presentById = null;
        this.isLoading = true;
        return requests.Presents.get(id)
            .then(action((present) => {
                this.presentById = present;
                this.isLoading = false;
            }))
    }

    @action searchChange = (field, value) => this.searchParams[field] = value;
    
    @action enableFilter = () =>this.isFilter = !this.isFilter;

    @action onFieldChange = (field, value) => this.formPresent[field] = value;

    @action onFieldBlur = (field, value) =>  this.formErrors[field] = validate(field, value);
    
}

export default new PresentsStore(); 

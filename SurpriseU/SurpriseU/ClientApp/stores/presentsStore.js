import { observable, action, computed } from 'mobx';
import requests from '../requests';
import { validate } from '../components/validation'

export class PresentsStore {
    @observable isLoading = false;
    @observable presentsState = [];
    @observable search = '';
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

    @action searchPresents(present) {
        //requests.Presents.search(present).then(
        //    action(presents => {
        //        this.presentsState = presents.slice('');
        //    })
        //)
        var xhr = new XMLHttpRequest();
        xhr.open("post", '/api/Presents/Search', true);
        xhr.responseType = "blob";
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(present));
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

    @action createPresent(pr) {
        this.presentsState.push(pr);
        return requests.Presents.add(pr);
    }
    

    @action deletePresent(present) {
        return requests.Presents.del(present.id)
            .then(action(() => this.loadPresents()))
    }

    @action editPresent(present) {
        return requests.Presents.edit(present)
            .then(action(() => {
                this.loadPresents();
            }))
    }
   
    @action getPresent(id) {
        this.isLoading = true;
        return requests.Presents.get(id)
            .then(action((present) => {
                this.presentById = present;
                this.isLoading = false;
            }))
    }

    @action searchInput(input) {
        this.search = input;
    }


    @action enableFilter() {
        this.isFilter = !this.isFilter;
    }

    @action
    onFieldChange = (field, value) => {
        this.formPresent[field] = value;
    };
    @action
    onFieldBlur = (field, value) => {
        this.formErrors[field] = validate(field, value);
    };
    @action
    onAgeChange = (value) => {
        this.formPresent.startAge = value[0];
        this.formPresent.endAge = value[1];
    };
    
    @action
    onAgeFieldChange = (field, value) => {
       
       this.formPresent[field] = Number(value);
       this.formErrors.startAge = (this.formPresent.startAge > this.formPresent.endAge) ?
        'Початковий вік має бути меншим ніж кінцевий' : '';
    };
    
}

export default new PresentsStore(); 

import { observable, action, computed } from 'mobx';
import requests from '../requests';


export class PresentsStore {
    @observable isLoading = false;
    @observable presentsState = [];
    @observable search = '';
    @observable isFilter = false;



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



    @action searchInput(input) {
        this.search = input;
    }


    @action enableFilter() {
        this.isFilter = !this.isFilter;
    }

    @action loadPresents() {
        this.isLoading = true;
        requests.Presents.all().then(
            action(presents => {
                this.presentsState = presents.slice('');
            })
        )
    }

    @action createPresent(present) {
        this.presentsState.push(present);
        return requests.Presents.add(present).then(action(() => {
            this.loadPresents();
        }))
    }
    

    @action deletePresent(present) {
        return requests.Presents.del(present.id)
            .then(action(() => {
                this.loadPresents();
            }))
    }
    @action editPresent(present) {
        return requests.Presents.edit(present)
            .then(action(() => {
                this.loadPresents();
            }))
    }

    @action getPresent(id) {
        return requests.Presents.edit(present)
            .then(action(() => {
                this.loadPresents();
            }))
    }

}

export default new PresentsStore(); 

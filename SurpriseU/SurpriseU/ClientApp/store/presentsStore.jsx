import { observable, action, computed } from 'mobx';
import requests from '../requests';
import superagent from 'superagent';
export class PresentsStore {
    @observable isLoading = false;
    @observable presentsRegistry = [{ title: 'aaaaa', content: 'dddd' }, { title: 'aaaaa', content: 'dddd' }];
    @observable predicate = {};


    

  
    
    @action loadPresents() {
        this.isLoading = true;
        var xhr = new XMLHttpRequest();
        var tmp = [];
        xhr.open("get", '/api/Presents', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            tmp = data.splice('');
            alert(tmp[0].title);
        };
        xhr.send();
    }
    

    @action loadPresent(id = {}) {
        this.isLoading = true;
        return requests.Present.get(id)
            .then(action(({ present }) => {
                this.presentsRegistry.set(present.id, present);
                return present;
            }))
            .finally(action(() => { this.isLoading = false; }));
    }
}

export default new PresentsStore();
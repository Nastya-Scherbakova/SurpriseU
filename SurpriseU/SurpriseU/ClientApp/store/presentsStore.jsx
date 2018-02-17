import { observable, action, computed } from 'mobx';
import requests from '../requests';


export class PresentsStore {
    @observable isLoading = false;
    @observable presentsState = [];
    
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

    @action tagsToNewPresent(present) {
        let tonew = this.presentsState.find(item => item.title === present.title);
        let newTags = tonew.tags.map(tag => { tag.presentId = tonew.id });
        

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

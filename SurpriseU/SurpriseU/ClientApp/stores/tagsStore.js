import { observable, action, computed } from 'mobx';
import requests from '../requests';

export class TagsStore {
    @observable likes = [];
    @observable celebrations = [];


    @action loadTags() {
        requests.Tag.all().then(
            action(tags => {
                tags.map(tag => tag.type === 0 ? this.likes.push(tag) : this.celebrations.push(tag));
            })
        )
    }
    

    @action createTag(tag) {
        return requests.Tag.add(tag);
    }


    @action deleteTag(tag) {
        return requests.Tag.del(tag.id)
            .then(action(() => {
                this.loadTags();
            }))
    }


    
    @action getTag(tag) {
        return requests.Tag.get(tag)
            .then(
            action(tag => { this.tag = tag; this.bb = 'correct' }))
            .catch(
            action(() => {
                this.createTag(tag);
                this.bb = 'error'
            }))
    }


 

}

export default new TagsStore();





//@action createPresentTag(presentId, tagId) {
//    return requests.Tag.tag({
//        presentId: presentId,
//        tagId: tagId
//    })
//}

//@action createTags(stringTags) {
//    stringTags.likes.split(' ').map(item => {
//        this.createTag({
//            name: item,
//            type: 0,
//            id: item.id
//        });
//        this.createPresentTag(stringTags.id, item.id);
//    })
//    stringTags.celebration.split(' ').map(item => {
//        this.createTag({
//            name: item,
//            type: 1,
//            id: item.id
//        });
//        this.createPresentTag(stringTags.id, item.id);
//    })
//}
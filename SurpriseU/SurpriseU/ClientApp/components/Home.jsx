import * as React from 'react';
import { ReactDOM } from 'react-dom';
import { PresentsList, HashTag} from './Present';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { X, Check } from 'react-feather';

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export class Home extends React.Component{
    render() {
        const { isFilter } = this.props.presentsStore;
        return <div>
            <div className="home-image"></div>
            {isFilter && <Filter />}
            <PresentsList />
        </div>;
    }
}


@inject('presentsStore', 'tagsStore')
@withRouter
@observer
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '0',
            startAge: '',
            endAge: '',
            tags: [],
            inputTags: '',
            popularTags: []
        };
        this.onChange = this.onChange.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.renderOffers = this.renderOffers.bind(this);
    }


    addTag = tag => {
        let tags = this.state.tags,
            popularTags = this.state.popularTags;
        if (tags.map(x => x.id).indexOf(tag.id) == -1) {
            tags.push({ id: tag.id, name: tag.name });
            popularTags.splice(popularTags.findIndex(x => x.id === tag.id), 1);
        };
        this.setState({
            tags: tags,
            popularTags: popularTags
        });
    }

    deleteTag = tag => {
        let tags = this.state.tags,
            popularTags = this.state.popularTags;
        popularTags.push({ id: tag.id, name: tag.name }); 
        tags.splice(tags.findIndex(x => x.id === tag.id), 1);
        this.setState({
            tags: tags,
            popularTags: popularTags
        });
    }

    componentWillMount() {
        let tags = this.props.tagsStore.likesStore.concat(this.props.tagsStore.celebrationStore);
        this.setState({ popularTags: tags });
    }

    openFilter = () => {
        this.props.presentsStore.enableFilter();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderOffers = (e) => {
        this.onChange(e);
        const inputValue = e.target.value.trim().toLowerCase(),
            inputLength = inputValue.length,
            likes = inputLength === 0 ? [] : this.props.tagsStore.likesStore.filter(
                item => item.name.toLowerCase().slice(0, inputLength) === inputValue),
            celebration = inputLength === 0 ? [] : this.props.tagsStore.celebrationStore.filter(
                item => item.name.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({ popularTags: likes.concat(celebration) });
    };
    render() {
        return <div className='filter-form animated fadeInDown'>
                <div className='d-flex w-100 h-75 justify-content-around align-items-center'>
                    <div className='d-flex flex-column align-items-center w-25 h-75'>
                        <input className='text'
                            name="startAge"
                            placeholder="Початковий вік"
                            value={this.state.startAge}
                            onChange={this.onChange} />
                        <input className='text'
                            name="endAge"
                            placeholder="Кінцевий вік"
                            value={this.state.endAge}
                            onChange={this.onChange} />
                        <input className='text'
                            name="inputTags"
                            placeholder="Теги"
                            value={this.state.inputTags}
                            onChange={this.renderOffers}
                    />
                        <div className='gender d-flex justify-content-around'>
                            {[
                                { value: 1, gender: "male" },
                                { value: 0, gender: "both" },
                                { value: 2, gender: "female" }
                            ].map((item) => <label key={item.value}>
                                <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                                <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender)} ></div>
                            </label>)}
                        </div>
                    </div>
                    <div className='popular-tags d-flex flex-wrap justify-content-start align-items-start'>
                    {this.state.tags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                    {this.state.popularTags.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.addTag.bind(this, tag)} />) }
                    </div>
            </div>
            <div className='w-100 d-flex justify-content-center icons'>
                <Check className='icon' />
                <X className='icon' onClick={this.openFilter} />
            </div>
        </div>;
    }
}

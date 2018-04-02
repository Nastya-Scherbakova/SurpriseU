import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { X, Check } from 'react-feather';
import { HashTag } from '../Layout';
import { withRouter } from 'react-router-dom';
@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class PresentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.present.title,
            content: props.present.content,
            gender: props.present.gender,
            photo: props.present.photo,
            startAge: props.present.startAge,
            endAge: props.present.endAge,
            id: props.present.id,
            likesTags: [],
            celebrationTags: [],
            likes: '',
            celebration: '',
            likesAuto: [],
            celebrationAuto: [],
            formErrors: {
                title: '',
                content: '',
                photo: '',
                age: ''
            },
            formValid: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.renderOffers = this.renderOffers.bind(this);
    }

    componentWillMount() {
        let likesTags = [],
            is = !this.props.isNew,
            celebrationTags = [];
        this.props.present.tags.map(tag => {
            let newTag = this.props.tagsStore.likesStore.find(storeTag => storeTag.id === tag.tagId);
            newTag != undefined ? likesTags.push(newTag) : celebrationTags.push(this.props.tagsStore.celebrationStore.find(storeTag => storeTag.id === tag.tagId));
        });
        this.setState({ likesTags: likesTags, celebrationTags: celebrationTags, formValid: [is, is, is, is] });
    }

    renderOffers = (e) => {
        this.onChange(e);
        const inputValue = e.target.value.trim().toLowerCase(),
            inputLength = inputValue.length,
            suggestions = inputLength === 0 ? [] : this.props.tagsStore[`${e.target.name}Store`].filter(
                item => item.name.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({ [`${e.target.name}Auto`]: suggestions });
    };

    onTagClick = tag => {
        let type = tag.type == '0' ? 'likes' : 'celebration';
        this.state[`${type}Tags`].map(x => x.id).indexOf(tag.id) == -1 && this.setState({
            [`${type}Tags`]: this.state[`${type}Tags`].concat({ id: tag.id, name: tag.name }),
            [type]: '',
            [`${type}Auto`]: []
        });
    }

    deleteTag = tag => {
        let type = this.state.likesTags.map(x => x.id).indexOf(tag.id) != -1 ? 'likes' : 'celebration';
        let tags = this.state[`${type}Tags`];
        tags.splice(tags.findIndex(x => x.id === tag.id), 1);
        this.setState({ [`${type}Tags`]: tags })
    }

    onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

    onSubmit(e) {
        e.preventDefault();
        let tags = this.state.likesTags.map(e => Object.assign({}, { presentId: '' }, { tagId: e.id })).concat(this.state.celebrationTags.map(e => Object.assign({}, { presentId: '' }, { tagId: e.id })));
        this.props.toClose();
        this.props.onPresentSubmit({
            title: this.state.title,
            content: this.state.content,
            gender: Number(this.state.gender),
            photo: this.state.photo,
            startAge: Number(this.state.startAge),
            endAge: Number(this.state.endAge),
            tags: tags,
            id: this.props.present.id
        });
    };

    validateField(e) {
        let fieldErrors = this.state.formErrors,
            formValid = this.state.formValid,
            fieldValid = false,
            value = e.target.value;
        switch (e.target.name) {
            case 'title':
                fieldValid = value.length <= 100 && value.length >= 3;
                fieldErrors.title = fieldValid ? '' : 'Назва має містити від 3 до 100 символів';
                formValid[0] = fieldValid ? true : false;
                break;
            case 'content':
                fieldValid = value.length <= 1000 && value.length >= 10;
                fieldErrors.content = fieldValid ? '' : 'Інформація має містити від 10 до 1000 символів';
                formValid[1] = fieldValid ? true : false;
                break;
            case 'photo':
                fieldValid = value.length >= 6;
                fieldErrors.photo = fieldValid ? '' : 'Вкажіть фото';
                formValid[2] = fieldValid ? true : false;
                break;
            case 'startAge':
                fieldValid = value >= 0;
                fieldErrors.age = fieldValid ? '' : 'Вкажіть межі віку від 0 до 100';
                formValid[3] = (fieldValid && value <= this.state.endAge) ? true : false;
                break;
            case 'endAge':
                fieldValid = value <= 100 && value >= this.state.startAge;
                fieldErrors.age = fieldValid ? '' : 'Вкажіть межі віку від 0 до 100';
                formValid[3] = fieldValid ? true : false;
                break;
            default:
                break;
        }
        this.setState({ formErrors: fieldErrors, formValid: formValid });
    }



    render() {

        const { likesTags, celebrationTags, likesAuto, celebrationAuto, formValid } = this.state,
            correct = formValid.every(item => item);

        return (
            <form className='new-present-form d-flex flex-column justify-content-around align-items-center' onSubmit={this.onSubmit}>
                <div className='w-100 h-input'>
                    <input className={`text ${errorClass(this.state.formErrors.title)}`}
                        name="title"
                        placeholder="Назва"
                        value={this.state.title}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        maxLength='100' /> </div>

                <div className='w-100 h-25'>
                    <textarea className={`${errorClass(this.state.formErrors.content)}`}
                        name="content"
                        placeholder="Інформація про подарунок"
                        value={this.state.content}
                        onChange={this.onChange}
                        onBlur={this.validateField}
                        maxLength='1000' /> </div>


                <div className='w-100 gender d-flex justify-content-around'>
                    {[
                        { value: 1, gender: "male" },
                        { value: 0, gender: "both" },
                        { value: 2, gender: "female" }
                    ].map((item) => <label key={item.value}>
                        <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                        <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender)} ></div>
                    </label>)}
                </div>


                <div className='w-100 h-input'>
                    <input className={`text ${errorClass(this.state.formErrors.photo)}`}
                        name="photo"
                        placeholder="Введіть посилання на фото"
                        value={this.state.photo}
                        onChange={this.onChange}
                        onBlur={this.validateField} />
                </div>


                <div className='w-100  h-input d-flex justify-content-between align-items-center'>
                    {[
                        { name: "startAge", placeholder: "Початковий вік", class: 'mr-2 ', toState: this.state.startAge },
                        { name: "endAge", placeholder: "Кінцевий вік", class: 'ml-2 ', toState: this.state.endAge }
                    ].map((item) => <input key={item.name} className={item.class + errorClass(this.state.formErrors.age) + ' text '}
                        name={item.name}
                        placeholder={item.placeholder}
                        value={item.toState}
                        onChange={this.onChange}
                        onBlur={this.validateField} />)}
                </div>

                <div className='w-100 h-input d-flex justify-content-between align-items-center'>
                    <input className={`${likesAuto.length == 0 ? ' text mr-2' : ' text is-true mr-2'}`}
                        name="likes" placeholder="Подобається"
                        value={this.state.likes}
                        onChange={this.renderOffers} />
                    <input className={`${celebrationAuto.length == 0 ? ' text ml-2' : 'text  is-true ml-2'}`}
                        name="celebration" placeholder="Свята"
                        value={this.state.celebration}
                        onChange={this.renderOffers} />
                </div>

                <div className='tags-background w-100 d-flex justify-content-between align-items-center mt-2'>
                    <div className='present-tags d-flex flex-wrap justify-content-start align-items-start  mr-2'>
                        {likesTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {likesAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.onTagClick.bind(this, tag)} />)}
                    </div>
                    <div className='present-tags d-flex flex-wrap justify-content-start align-items-start  ml-2'>
                        {celebrationTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {celebrationAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.onTagClick.bind(this, tag)} />)}
                    </div>
                </div>

                <div className='d-flex justify-content-around mt-3'>
                    <div className='but' onClick={correct ? this.onSubmit : undefined}><Check size="5vh" color={`${correct ? '#031560' : 'grey'}`} /></div>
                    <div className='but' onClick={this.props.toClose}><X size="5vh" color='#600303' /></div>
                </div>

            </form>
        );
    }
};

const errorClass = (error) => error.length === 0 ? '' : 'has-error';
const isError = (error) => error.length > 0 && <p className='error '>{error}  </p>;

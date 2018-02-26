import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { X, Check, Image, Upload, Edit, Trash, Hash} from 'react-feather';
import ReactModal from 'react-modal';
import { inject, observer } from 'mobx-react';
import 'react-tippy/dist/tippy.css';
import { Tooltip, withTooltip} from 'react-tippy';

@inject('presentsStore')
@withRouter
@observer
export class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.present,
            liked: false,
            showModal: false,
        };
        this.onLike = this.onLike.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onEditPresent = this.onEditPresent.bind(this);
        this.onRemovePresent = this.onRemovePresent.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    handleOpenModal = () => this.setState({ showModal: true });
    handleCloseModal = () => this.setState({ showModal: false });
    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));

    onEditPresent(present) {
        if (present) {
            this.props.presentsStore.editPresent(present);
        }
    }
    onRemovePresent = () => this.props.presentsStore.deletePresent(this.state.data);
    render() {
        return <div className="col-md-5 present animated fadeInDown">
            <img className="img  rounded-circle pull-left" src={this.state.data.photo} />
            <div className="info">
                <div className="d-flex justify-content-center align-items-center"><div className="title">{this.state.data.title}</div></div>
                <div className="settings">
                    <Edit className='mx-2' size="3vh" color='#C4C4D8' onClick={this.handleOpenModal}/>
                    <Trash className='mx-2' size="3vh" color='#C4C4D8' onClick={this.onRemovePresent} />
                </div>
                <div className="d-flex justify-content-start align-items-center about">
                    {this.state.data.content}
                </div>
                <div className="d-flex justify-content-between align-items-center bottom">
                    <NavLink className="navlink-no nav " to={'/'}>
                        <div className="d-flex justify-content-center align-items-center ">
                            Читати далі 
                        <div className="d-flex justify-content-center align-items-center arrow-right"></div>
                        </div>
                    </NavLink>
                    <div className="d-flex justify-content-center align-items-center" onClick={this.onLike}>
                        {this.state.liked ?  isLiked : notLiked }
                    </div>
            </div>
            </div>

            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                className='addPresent w-100 h-100 d-flex align-items-center'>
                <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
                    <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Редагувати подарунок</div>
                    <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.handleCloseModal} isNew={false} present={this.state.data} />
                </div>
            </ReactModal>
            
        </div>;
    }
}


@inject('presentsStore', 'commonStore')
@withRouter
@observer
export class NewPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: {
                title: '',
                content: '',
                gender: '0',
                photo: '',
                startAge: '',
                endAge: '',
                tags: []
            }
        };
        this.onAddPresent = this.onAddPresent.bind(this);
    }

    onAddPresent(present) {
        if (present) {
            this.props.presentsStore.createPresent(present);
        }
    }

    render() {
        return <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Додати подарунок</div>
            <PresentForm onPresentSubmit={this.onAddPresent} toClose={this.props.toClose} present={this.state.present} isNew={true}
            />
        </div>;
    }
}



@inject('presentsStore', 'commonStore')
@withRouter
@observer
export class PresentsList extends React.Component {
    componentDidMount() {
        this.props.presentsStore.loadPresents();
    }

    render() {
        const { presentsState } = this.props.presentsStore;
        return <div className="d-flex flex-row  flex-wrap justify-content-around">
                {
                presentsState.map(present => <Present key={present.id} present={present} />)
                }
        </div>;
    }
}

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export class PresentForm extends React.Component {
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
            tags: props.present.tags,
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
        this.onBlurAuto = this.onBlurAuto.bind(this);
        this.renderOffers = this.renderOffers.bind(this);
    }
    
    componentWillMount() {
        let tags = [], is = !this.props.isNew;
        this.state.tags.map(tag => {
            let newTag = this.props.tagsStore.likesStore.find(storeTag => storeTag.id === tag.tagId);
            newTag != undefined ? tags.push(newTag) : tags.push(this.props.tagsStore.celebrationStore.find(storeTag => storeTag.id === tag.tagId));
        });
        this.setState({ tags: tags, formValid: [is, is, is, is] });
    }

    onBlurAuto = (e) => { setTimeout(this.setState({ [`${e.target.name}Auto`]: [], [e.target.name]: ''}), 100)};

    renderOffers = (e) => {
        this.onChange(e);
        const inputValue = e.target.value.trim().toLowerCase(),
            inputLength = inputValue.length,
            suggestions = inputLength === 0 ? [] : this.props.tagsStore[`${e.target.name}Store`].filter(
            item => item.name.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({ [`${e.target.name}Auto`]: suggestions });
    };

    onTagClick = tag => {
        let tags = this.state.tags, type = tag.type == '0' ? 'likes' : 'celebration';
        tags.map(x => x.id).indexOf(tag.id) == -1 && tags.push({ id: tag.id, name: tag.name });
        this.setState({ tags: tags, [type]: '', [`${type}Auto`]: [] });
    }

    deleteTag = id => {
        let tags = this.state.tags;
        tags.splice(tags.findIndex(x => x.id === id), 1);
        this.setState({ tags: tags })
    }

    onChange(e) { this.setState({ [e.target.name]: e.target.value }) }
    
    onSubmit(e) {
        e.preventDefault();
        let tags = this.state.tags.map(e => Object.assign({}, { presentId: '' }, { tagId: e.id }));
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

        const { tags, likesAuto, celebrationAuto, formValid} = this.state,
            correct = formValid.every(item => item);
       
        return (
            <form className='new-present-form d-flex flex-column justify-content-around align-items-center' onSubmit={this.onSubmit}>
                <Tooltip title="Назва має містити від 3 до 100 символів" position="bottom"
                    open={this.state.formErrors.title.length != 0}
                    className='w-100 h-input' distance={-5} arrow={true} theme='light'
                >
                    <input className={`text ${errorClass(this.state.formErrors.title)}`}
                    name="title"
                    placeholder="Назва"
                    value={this.state.title}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='100' />
                </Tooltip>

                <Tooltip title="Інформація має містити від 10 до 1000 символів" position="bottom"
                    open={this.state.formErrors.content.length != 0}
                    className='w-100 h-25' distance={-25} arrow={true} theme='light'
                >
                <textarea className={`${errorClass(this.state.formErrors.content)}`}
                    name="content"
                    placeholder="Інформація про подарунок"
                    value={this.state.content}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='1000'
                  />
                </Tooltip>

                <div className='w-100 gender d-flex justify-content-around'>
                        {[
                            { value: 1, gender: "male" },
                            { value: 0, gender: "both" },
                            { value: 2, gender: "female" }
                        ].map((item) => <label key={item.value}>
                                <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                                <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender) } ></div>
                            </label>)}
                </div>


                <Tooltip title="Вкажіть фото" position="bottom"
                    open={this.state.formErrors.photo.length != 0}
                    className='w-100 h-input' distance={-5} arrow={true} theme='light'
                >
                        <input className={`text ${errorClass(this.state.formErrors.photo)}`}
                        name="photo"
                        placeholder="Введіть посилання на фото"
                        value={this.state.photo}
                        onChange={this.onChange}
                        onBlur={this.validateField}/>
                </Tooltip>


                <Tooltip title="Вкажіть межі віку від 0 до 100" position="bottom"
                    open={this.state.formErrors.age.length != 0}
                    className='w-100  h-input d-flex justify-content-between align-items-center' distance={-5} arrow={true} theme='light'
                >
                        {[
                                { name: "startAge", placeholder: "Початковий вік", class: 'mr-2 ', toState: this.state.startAge },
                                { name: "endAge", placeholder: "Кінцевий вік", class: 'ml-2 ', toState: this.state.endAge}
                        ].map((item) => <input key={item.name} className={item.class+ errorClass(this.state.formErrors.age)+ ' text '}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={item.toState}
                                onChange={this.onChange}
                                onBlur={this.validateField}/>
                                )
                        }
                </Tooltip>

                <div className='w-100 d-flex justify-content-between align-items-center tags-area'>
                    <div className='d-flex flex-column tags-cont w-100 h-100 justify-content-start mr-2'>
                        <input className={`${likesAuto.length == 0 ? ' text ' : ' text is-true '}`}
                                name="likes" placeholder="Подобається"
                                value={this.state.likes}
                                onChange={this.renderOffers}
                                onBlur={this.onBlurAuto} />
                        <div className={`${likesAuto.length == 0 ? ' hidden  ' : ' suggestions '}`}>
                                {likesAuto.map(like => <div key={like.id} className='suggestion' onMouseDown={this.onTagClick.bind(this, like)}> {like.name} </div>)}
                            </div>
                        </div>

                    <div className='d-flex flex-column tags-cont  w-100 h-100 justify-content-start ml-2 '>
                        <input className={`${celebrationAuto.length == 0 ? ' text ' : 'text  is-true '}`}
                                name="celebration" placeholder="Свята"
                                value={this.state.celebration}
                                onChange={this.renderOffers}
                                onBlur={this.onBlurAuto} />
                        <div className={`${celebrationAuto.length == 0 ? ' hidden ' : ' suggestions  '}`}>
                                {celebrationAuto.map(like => <div key={like.id} className='suggestion' onMouseDown={this.onTagClick.bind(this, like)}>{like.name}</div>)}
                            </div>
                        </div>
                </div>
                <p></p>
                <div className='tags d-flex w-100 flex-wrap justify-content-center align-items-center'>
                    {tags.length != 0
                        ? tags.map(like => <HashTag key={like.id} name={like.name} check={true} onClick={this.deleteTag.bind(this, like.id)} />)
                        : <p className='text-center'>Додайте теги</p>
                    }
                </div>

                <div className='d-flex justify-content-around mt-3'>
                    <div className='but' onClick={correct && this.onSubmit}><Check size="5vh" color={`${correct ? '#031560' : 'grey'}`}/></div> 
                    <div className='but' onClick={this.props.toClose}><X size="5vh" color='#600303' /></div>
                </div>
            </form>
        );
    }
};
//<div className='d-flex w-100 h-25 justify-content-between align-items-center'>
//    <div className='d-flex flex-column h-100 w-50 justify-content-around align-items-center'>
//        <div className='d-flex flex-column tags-cont  justify-content-start '>
//            <input className={`${likesAuto.length == 0 ? ' tags-input ' : ' tags-input is-true '}`}
//                name="likes" placeholder="Подобається"
//                value={this.state.likes}
//                onChange={this.renderOffers}
//                onBlur={this.onBlurAuto} />
//            <div className={`${likesAuto.length == 0 ? ' hidden ' : ' suggestions '}`}>
//                {likesAuto.map(like => <div key={like.id} className='suggestion' onMouseDown={this.onTagClick.bind(this, like)}> {like.name} </div>)}
//            </div>
//        </div>

//        <div className='d-flex flex-column tags-cont justify-content-start '>
//            <input className='tags-input'
//                name="celebration" placeholder="Свята"
//                value={this.state.celebration}
//                onChange={this.renderOffers}
//                onBlur={this.onBlurAuto} />
//            <div className={`${celebrationAuto.length == 0 ? ' hidden ' : ' suggestions '}`}>
//                {celebrationAuto.map(like => <div key={like.id} className='suggestion' onMouseDown={this.onTagClick.bind(this, like)}>{like.name}</div>)}
//            </div>
//        </div>
//    </div>

//    <div className='tags d-flex flex-wrap justify-content-center align-items-center'>
//        {this.state.tags.length != 0
//            ? this.state.tags.map(like => <HashTag key={like.id} name={like.name} onDelete={this.deleteTag.bind(this, like.id)} />)
//            : <p className='text-center'>Додайте теги</p>
//        }
//    </div>
//</div>



export class HashTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: this.props.check
        };
    }
    render() {
        return <div className={`tag-${this.state.check ? 'check' : 'proposal'}  d-flex align-items-center`}
            onClick={this.props.onClick}>
            #{this.props.name}
        </div>
    }
}

const errorClass = (error) => error.length === 0 ? '' : 'has-error';
const isError = (error) => error.length > 0 && <p className='error '>{error}  </p>;


const isLiked = <svg className='animated opac' xmlns="http://www.w3.org/2000/svg" width="6vh" height="6vh" viewBox="0 0 30 30">
        <path fill="#7496DB" d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z" />
    </svg>;

const notLiked = <svg xmlns="http://www.w3.org/2000/svg" width="6vh" height="6vh" viewBox="0 0 30 30">
        <path fill="#DBDBE3" d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z" />
    </svg>;


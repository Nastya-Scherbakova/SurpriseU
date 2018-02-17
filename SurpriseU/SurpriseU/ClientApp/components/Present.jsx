import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { X, Check, Image, Upload, Edit, Trash} from 'react-feather';
import ReactModal from 'react-modal';
import { inject, observer } from 'mobx-react';
import Autosuggest from 'react-autosuggest'
import Radium from 'radium';

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

    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    onLike() {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }
    onEditPresent(present) {
        if (present) {
            this.props.presentsStore.editPresent(present);
        }
    }
    onRemovePresent() {
            this.props.presentsStore.deletePresent(this.state.data);
    }
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
                    <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.handleCloseModal} present={this.state.data} />
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
                gender: '',
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
            <PresentForm onPresentSubmit={this.onAddPresent} toClose={this.props.toClose} present={this.state.present}
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
@Radium
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
            likes: [],
            celebration: [],
            likesValue: '',
            celebrationValue: '',
            likesSuggestions: [],
            celebrationSuggestions: [],
            formErrors: {
                title: '',
                content: '',
                photo: '',
                age: ''
            },
            formValid: [false, false, false, false, false]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isErrorField = this.isErrorField.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    componentWillMount() {
        let likes = [], celebration = [];
        this.state.tags.map(tag => {
            let newTag = this.props.tagsStore.likesStore.find(storeTag => storeTag.id === tag.tagId);
            newTag != undefined ? likes.push(newTag) : celebration.push(this.props.tagsStore.celebrationStore.find(storeTag => storeTag.id === tag.tagId));
        });
        this.setState({
            likes: likes,
            celebration: celebration
        })
    }

    onTagChange = (e, { newValue, method }) => {
        this.setState({ [`${e.target.id}Value`]: newValue});
    };

    onSuggestionsFetchRequested = (value, reason) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const suggestions = inputLength === 0 ? [] : this.props.tagsStore[`${reason}Store`].filter(
            lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({ [`${reason}Suggestions`]: suggestions});
    };

    onSuggestionsClearRequested = (e) => {
        this.setState({ [`${e.target.id}Suggestions`]: [] })
    };
    
    newTag(name, id, e) {
        let tags = this.state[`${e.target.id}`];
        tags.map(x => x.id).indexOf(id) == -1 && tags.push({ id: id, name: name });
        this.setState({
            [e.target.id]: tags,
            [`${e.target.id}Value`]: ''
        });
    }

    deleteTag(id, field, e) {
        e.preventDefault();
        let tags = this.state[`${field}`];
        tags.splice(tags.findIndex(x => x.id === id), 1);
        this.setState({ [field]: tags })
    }   

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();
        let presentTag = e => Object.assign({}, { presentId: '' }, { tagId: e.id });
        let tags = this.state.likes.map(like => presentTag(like)).concat(this.state.celebration.map(cel => presentTag(cel)));
        this.props.onPresentSubmit({
            title: this.state.title,
            content: this.state.content,
            gender: Number(this.state.gender),
            photo: this.state.photo,
            startAge: Number(this.state.startAge),
            endAge: Number(this.state.endAge),
            tags: tags
        });
        
    };

    validateField(e) {
        let fieldErrors = this.state.formErrors,
            formValid = this.state.formValid,
            fieldValid = false,
            fieldName = e.target.name,
            value = e.target.value;
        switch (fieldName) {
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
            case 'gender':
                formValid[2] = value >= 0 ? true : false;
                break;
            case 'photo':
                fieldValid = value.length >= 6;
                fieldErrors.photo = fieldValid ? '' : 'Вкажіть фото';
                formValid[3] = fieldValid ? true : false;
                break;
            case 'startAge':
                fieldValid = value >= 0;
                fieldErrors.age = fieldValid ? '' : 'Початковий вік має бути більше 0 та менше кінцевого';
                formValid[4] = (fieldValid && value <= this.state.endAge) ? true : false;
                break;
            case 'endAge':
                fieldValid = value <= 100 && value >= this.state.startAge;
                fieldErrors.age = fieldValid ? '' : 'Кінцевий вік має бути менше 100 та більше початкового';
                formValid[4] = fieldValid ? true : false;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldErrors,
            formValid: formValid
        });
    }

    errorClass = (error) => error.length === 0 ? '' : 'has-error';
    
    isErrorField = ( error ) => error.length > 0 ? <p className='w-100 d-flex justify-content-center'>{error}  </p> : <p > </p>;

    render() {
        const { likes, celebration, likesValue, celebrationValue, likesSuggestions, celebrationSuggestions} = this.state;
        let field = this.state.formValid,
            allFields = field[0] && field[1] && field[2] && field[3] && field[4],
            check = allFields ? <div className='but' onMouseDown={this.onSubmit} onMouseUp={this.props.toClose}><Check size="5vh" color='#031560' /> </div> :
                <div className='but' onMouseDown={this.onSubmit} onMouseUp={this.props.toClose}><Check size="5vh" color='grey' /> </div>;
        return (
            <form className='w-75 new-present-form d-flex flex-column justify-content-around align-items-center' onSubmit={this.onSubmit}>

                <div className='w-100  h-input'>
                    <input className={`text ${this.errorClass(this.state.formErrors.title)}`}
                    name="title"
                    placeholder="Назва"
                    value={this.state.title}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='100' />
                {this.isErrorField(this.state.formErrors.title)}
                </div>

                <div className='w-100 h-25'>
                <textarea className={`${this.errorClass(this.state.formErrors.content)}`}
                    name="content"
                    placeholder="Інформація про подарунок"
                    value={this.state.content}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='1000'
                  />
                {this.isErrorField(this.state.formErrors.content)}
                </div>
                
                <div className='w-100 gender d-flex justify-content-around'>
                        {
                            [
                                { value: 1, gender: "male" },
                                { value: 0, gender: "both" },
                                { value: 2, gender: "female" }
                            ].map((item) => <label>
                                <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                                <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender) } ></div>
                            </label>)
                        }
                    </div>
                
                    <div className='w-100 h-input d-flex justify-content-between align-items-center'>
                        <input className={`text mr-3 ${this.errorClass(this.state.formErrors.photo)}`}
                        name="photo"
                        placeholder="Введіть посилання або завантажте вручну"
                        value={this.state.photo}
                        onChange={this.onChange}
                        onBlur={this.validateField}/>
                    <Image size='3.6vh' color='#4E6677' />
                </div>
                {this.isErrorField(this.state.formErrors.photo)}
                
                    <div className='w-100  h-input d-flex justify-content-between align-items-center'>
                        {
                            [
                                { name: "startAge", placeholder: "Початковий вік", class: 'mr-2 ', toState: this.state.startAge },
                                { name: "endAge", placeholder: "Кінцевий вік", class: 'ml-2 ', toState: this.state.endAge}
                            ].map((item) => <input className={item.class+ this.errorClass(this.state.formErrors.age)+ ' text '}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={item.toState}
                                onChange={this.onChange}
                                onBlur={this.validateField}/>
                                )
                        }
                    </div>
                    {this.isErrorField(this.state.formErrors.age)}

               
                    <div className='tags d-flex flex-wrap align-items-center'>{likes.map(item => <div className='tag'>{item.name}
                        <X size='2vh' color='black' onClick={e => this.deleteTag(item.id, 'likes', e)} /></div>)}
                    <Autosuggest
                        id={'likes'}
                        theme={theme}
                        suggestions={likesSuggestions}
                        onSuggestionsFetchRequested={({ value }) => this.onSuggestionsFetchRequested(value, 'likes').bind(this)}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                        onSuggestionSelected={(e, { suggestion }) => this.newTag(suggestion.name, suggestion.id, e).bind(this)}
                        getSuggestionValue={suggestion => suggestion.name}
                        renderSuggestion={suggestion => <div> {suggestion.name} </div>}
                        inputProps={{ placeholder: 'Подобається', value: likesValue, onChange: this.onTagChange.bind(this), id: 'likes'}}
                        highlightFirstSuggestion={true} />
                    </div><p></p>
                

                    <div className='tags d-flex flex-wrap align-items-center'>{celebration.map(item => <div className='tag'>{item.name}
                        <X size='2vh' color='black' onClick={e => this.deleteTag(item.id, 'celebration', e)} /></div>)}
                    <Autosuggest
                        id={'celebration'}
                        theme={theme}
                        suggestions={celebrationSuggestions}
                        onSuggestionsFetchRequested={({ value}) => this.onSuggestionsFetchRequested(value, 'celebration').bind(this)}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                        onSuggestionSelected={(e, { suggestion }) => this.newTag(suggestion.name, suggestion.id, e).bind(this)}
                        getSuggestionValue={suggestion => suggestion.name}
                        renderSuggestion={suggestion => <div> {suggestion.name} </div>}
                        inputProps={{ placeholder: 'Свята', value: celebrationValue, onChange: this.onTagChange.bind(this), id: 'celebration'}}
                        highlightFirstSuggestion={true} />
                    </div>
                    <p></p>
                  

                <div className='d-flex justify-content-around mt-3'>
                    {check}
                    <div className='but' onClick={this.props.toClose}><X size="5vh" color='#600303' /></div>
                </div>
            </form>
        );
    }
};
const theme = {
    input: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        margin: '0 0 0 2%',
        width: '100%',
    },
    container: {
        height: '75%',
        position: 'relative',
        width: '25%'
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        top: '4vh',
        width: '100%'
    },
    suggestionsList: {
        listStyleType: 'none',
        background: 'rgba(255, 255, 255, 0.2)',
        margin: '0',
        padding: '0'
    },
    suggestion: {
        padding: '1% 4%',
        flex: 'row'
    },
    suggestionHighlighted: {
        background: 'rgba(255, 255, 255, 0.5)'
    }
};




//const theme = {

//    container: {
//        width: '50%',
//        minHeight: '10%',
//               background: 'blue',
    
//    },
//    input: {
//       outline: 'none',
//       background: 'rgba(255, 255, 255, 0.9)',
//       width:'100%',
//       padding: '0.7vh 1vw',
//       height: '70%',
//       border: '1px solid rgba(170,170,170, 0.6)',
//       borderRadius: '2.5vh',
//       borderBottomRightRadius: '2.5vh',
//       borderBottomLeftRadius: '2.5vh',
//    },
//    inputFocused: {
//        borderBottomRightRadius: '0',
//        borderBottomLeftRadius: '0',
//        borderBottom: 'none',
//    },
//    suggestionsContainerOpen: {
//        borderBottomRightRadius: '2.5vh',
//        borderBottomLeftRadius: '2.5vh',
//        border: '1px solid rgba(170,170,170, 0.6)',
//        borderTop: 'none',
//         background: 'rgba(255, 255, 255, 0.9)',
//    },
//    suggestionsList: {
//        listStyleType: 'none',
        
//    },
//    suggestion: {
//        padding: '1% 4%'
//    },
//    suggestionHighlighted: {
//        background: 'rgba(255, 255, 255, 0.5)'
//    }
//};




const isLiked = <svg className='animated opac'
        xmlns="http://www.w3.org/2000/svg"
        width="6vh" height="6vh" viewBox="0 0 30 30">
        <path fill="#7496DB" d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z" />
    </svg>;

const notLiked = <svg xmlns="http://www.w3.org/2000/svg"
      
        width="6vh" height="6vh" viewBox="0 0 30 30">
        <path fill="#DBDBE3" d="M2.2 9.4c0 1.3.2 3.3 2 5.1 1.6 1.6 6.9 5.2 7.1 5.4.2.1.4.2.6.2s.4-.1.6-.2c.2-.2 5.5-3.7 7.1-5.4 1.8-1.8 2-3.8 2-5.1 0-3-2.4-5.4-5.4-5.4-1.6 0-3.2.9-4.2 2.3-1-1.4-2.6-2.3-4.4-2.3-2.9 0-5.4 2.4-5.4 5.4z" />
</svg>;


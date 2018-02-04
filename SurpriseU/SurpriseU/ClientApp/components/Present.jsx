import * as React from 'react';
import '../css/style.css';
import { Link, NavLink } from 'react-router-dom';
import { X, Check, Image, Upload, Square, CheckSquare} from 'react-feather';
import '../css/Site.scss'; 
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import ReactModal from 'react-modal';

export class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.present,
            liked: false,
            showModal: false,
        };
        this.onClick = this.onClick.bind(this);
        this.onLike = this.onLike.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    onLike() {
        this.setState(prevState => ({
            liked: !prevState.liked
        }));
    }
    render() {
        const liked = this.state.liked;
        const likeStyle = null;
        if (liked) {
            likeStyle = ' like-true '
        } else {
            likeStyle = ' like-false '
        }
        return <div className="col-md-5 present animated fadeInDown">
            <img className="img  rounded-circle pull-left" src={this.state.data.photo} />
            <div className="info">
                <div className="d-flex justify-content-center align-items-center"><div className="title">{this.state.data.title}</div></div>
                <div className="d-flex justify-content-start align-items-center about">{this.state.data.content.split(".", 1)}</div>
                <div className="d-flex justify-content-between align-items-center bottom">
                    <NavLink className="navlink-no nav " to={'/'}>
                        <div className="d-flex justify-content-center align-items-center ">
                            Читати далі 
                        <div className="d-flex justify-content-center align-items-center arrow-right"></div>
                        </div>
                    </NavLink>
                    <p><button onClick={this.onClick}>Delete</button></p>
                    <p><button onClick={this.handleOpenModal}>Edit</button></p>
                    <div className={"d-flex justify-content-center align-items-center like-icon" + likeStyle} onClick={this.onLike}></div>
                </div>
            </div>
            <ReactModal
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                className='addPresent w-100 h-100 d-flex align-items-center'
            >
                <EditPresent apiUrl="/api/Presents" loadData={this.props.loadData} present={this.state.data} toClose={this.handleCloseModal} />
            </ReactModal>
        </div>;
    }
}

export class EditPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: props.present
        };
        this.onEditPresent = this.onEditPresent.bind(this);
    }

    onEditPresent(present) {
        if (present) {
            var data = JSON.stringify({
                "title": present.title,
                "content": present.content,
                "gender": present.gender,
                "photo": present.photo,
                "startAge": present.startAge,
                "endAge": present.endAge,
                "likes": present.likes,
                "celebration": present.celebration,
                "id": this.state.present.id
            });
            var xhr = new XMLHttpRequest();
            var url = this.props.apiUrl + "/" + this.state.present.id;
            xhr.open("put", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 204) {
                    this.props.loadData;
                }
                else alert(xhr.status + ': ' + xhr.statusText);
            }.bind(this);
            xhr.send(data);
        }
    }

    render() {
        return <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Редагувати подарунок</div>
            <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.props.toClose} present={this.state.present}
            />
        </div>;
    }
}





export class NewPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: {
                title: '',
                content: '',
                gender: null,
                photo: '',
                startAge: null,
                endAge: null,
                likes: null,
                celebration: []
            }
        };
        this.onAddPresent = this.onAddPresent.bind(this);
    }

    onAddPresent(present) {
        if (present) {
            var data = JSON.stringify({
                "title": present.title,
                "content": present.content,
                "gender": present.gender,
                "photo": present.photo,
                "startAge": present.startAge,
                "endAge": present.endAge,
                "likes": present.likes,
                "celebration": present.celebration
            });
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
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



export class PresentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presents: [],
            showModal: false
        };
        this.onRemovePresent = this.onRemovePresent.bind(this);
    }
   
    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ presents: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    } 

    // удаление объекта
    onRemovePresent(present) {
        if (present) {
            var url = this.props.apiUrl + "/" + present.id;
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {
        var remove = this.onRemovePresent;
        var loadData = this.loadData;
        return <div className="d-flex flex-row  flex-wrap justify-content-around">
                {
                    this.state.presents.map(function (present) {
                    return <Present key={present.id} present={present} onRemove={remove} loadData={loadData} />
                    })
                }
        </div>;
    }
}


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
            likes: props.present.likes,
            celebration: props.present.celebration,
            formErrors: {
                title: '',
                content: '',
                photo: '',
                age: '',
                likes: ''
            },
            formValid: [false, false, false, false, false, false, false]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.isErrorField = this.isErrorField.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheckboxChanged(newCelebration) {
        this.setState({
            celebration: newCelebration
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onPresentSubmit({
            title: this.state.title,
            content: this.state.content,
            gender: (typeof this.state.gender == 'string') ? Number(this.state.gender) : this.state.gender,
            photo: this.state.photo,
            startAge: (typeof this.state.startAge == 'string') ? Number(this.state.startAge) : this.state.startAge,
            endAge: (typeof this.state.endAge == 'string') ? Number(this.state.endAge) : this.state.endAge,
            likes: (typeof this.state.likes == 'string') ? this.state.likes.split(',') : this.state.likes,
            celebration: this.state.celebration
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
            case 'likes':
                fieldValid = value.length >= 3;
                fieldErrors.likes = fieldValid ? '' : 'Вкажіть хоча б одне подобається';
                formValid[5] = fieldValid ? true : false;
                break;
            case 'celebration':
                formValid[6] = value.length >= 0 ? true : false;
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
    
    checkItem = (item) => this.state.celebration.indexOf(item) !== -1 ? <CheckSquare size="2vh" color="#fff" className='mr-3' /> : <Square size="2vh" color="#fff" className='mr-3'/>;

    isErrorField = ( error ) => error.length > 0 ? <p className='w-100 d-flex justify-content-center'>{error}  </p> : <p > </p>;

    render() {
        let field = this.state.formValid,
            allFields = field[0] && field[1] && field[2] && field[3] && field[4] && field[5] && field[6],
            check = allFields ? <div className='but' onMouseDown={this.onSubmit} onMouseUp={this.props.toClose}><Check size="5vh" color='#031560' /> </div> :
                <div className='but' onMouseDown={this.onSubmit} onMouseUp={this.props.toClose}><Check size="5vh" color='grey' /> </div>;
        return (
            <form className='w-75 new-present-form d-flex flex-column justify-content-around align-items-center' onSubmit={this.onSubmit}>

                <div className='w-100'>
                    <input className={`text ${this.errorClass(this.state.formErrors.title)}`}
                    name="title"
                    placeholder="Назва"
                    value={this.state.title}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='100' />
                {this.isErrorField(this.state.formErrors.title)}
                </div>

                <div className='w-100'>
                <textarea className={`${this.errorClass(this.state.formErrors.content)}`}
                    name="content"
                    placeholder="Інформація про подарунок"
                    value={this.state.content}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='1000' />
                {this.isErrorField(this.state.formErrors.content)}
                </div>
                
                    <div className='w-100 mb-4 gender d-flex justify-content-around'>
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

                <div className='w-100'>
                    <div className='w-100 d-flex justify-content-between align-items-center'>
                        <input className={`text mr-3 ${this.errorClass(this.state.formErrors.photo)}`}
                        name="photo"
                        placeholder="Введіть посилання або завантажте вручну"
                        value={this.state.photo}
                        onChange={this.onChange}
                        onBlur={this.validateField}/>
                    <Image size='3.6vh' color='#4E6677' />
                </div>
                {this.isErrorField(this.state.formErrors.photo)}
                </div>

                <div className='w-100'>
                    <div className='w-100 d-flex justify-content-between align-items-center'>
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
                </div>

                <div className='w-100'>
                    <input className={`text ${this.errorClass(this.state.formErrors.likes)}`}
                    name="likes"
                    placeholder="Подобається (через кому)"
                    value={this.state.likes}
                    onChange={this.onChange}
                    onBlur={this.validateField}/>
                {this.isErrorField(this.state.formErrors.likes)}
                </div>

                <CheckboxGroup
                    checkboxDepth={2}
                    name="celebration"
                    value={this.state.celebration}
                    onChange={this.onCheckboxChanged}
                    onClick={this.validateField}
                    className='d-flex w-100 justify-content-between flex-wrap'
                > {
                        [
                            { value: 0, label: "День народження" },
                            { value: 1, label: "Новий рік" },
                            { value: 2, label: "Жіночий день" },
                            { value: 3, label: "Чоловічий день" },
                            { value: 4, label: "День матері" },
                            { value: 5, label: "Інші" }
                        ].map((item) => < label className='d-flex align-items-center w-50'>{this.checkItem(item.value)} <Checkbox value={item.value} /> {item.label}</label>)
                    }
                </CheckboxGroup>
                <div className='d-flex justify-content-around'>
                    {check}
                    <div className='but' onClick={this.props.toClose}><X size="5vh" color='#600303' /></div>
                </div>
            </form>
        );
    }
};

import * as React from 'react';
import '../css/style.css';
import { Link, NavLink } from 'react-router-dom';
import { X, Check, Image, Upload} from 'react-feather';
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
                <EditPresent present={this.state.data} toClose={this.handleCloseModal} />
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
                "age": present.age,
                "likes": present.likes,
                "hobbies": ["хобби"],
                "celebration": 0
            });
            var xhr = new XMLHttpRequest();
            var url = "/api/Presents/" +  present.id;
            xhr.open("put", url, true);
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
        return <div className='form-add h-75 w-25 d-flex flex-column align-items-center animated fadeInDown'>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Додати подарунок</div>
            
            <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.props.toClose}
                title={this.state.present.title}
                content={this.state.present.content}
                gender={this.state.present.gender}
                photo={this.state.present.photo}
                age={[0, 100]}
                likes={this.state.present.likes}
                celebration={this.state.present.celebration}
                />
        </div>;
    }
}



export class NewPresent extends React.Component {
    constructor(props) {
        super(props);
        this.onAddPresent = this.onAddPresent.bind(this);
    }

    onAddPresent(present) {
        if (present) {
            var data = JSON.stringify({
                "title": present.title,
                "content": present.content,
                "gender": present.gender,
                "photo": present.photo,
                "age":/* present.age,*/['10', '39'],
                "likes": ["wert", "ddff"],
                //"hobbies": ["хобби"],
                "celebration": [0]
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
        return <div className='form-add h-75 w-25 d-flex flex-column align-items-center animated fadeInDown'>
                <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Додати подарунок</div>
                <PresentForm onPresentSubmit={this.onAddPresent} toClose={this.props.toClose}
                title='' content='' gender={-1} photo='' age={['','']} likes='' celebration={[]}
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
        return <div className="d-flex flex-row  flex-wrap justify-content-around">
                {
                    this.state.presents.map(function (present) {
                    return <Present key={present.id} present={present} onRemove={remove} />
                     })
                }
        </div>;
    }
}





const FormErrors = ({ error }) => error.length > 0 ? <p >{error}  </p> : <p > </p>;
export class PresentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content,
            gender: props.gender,
            photo: props.photo,
            age: props.age,
            likes: props.likes,
            celebration: props.celebration,
            formErrors: {
                title: '',
                content: '',
                gender: '',
                photo: '',
                age: '',
                likes: '',
                celebration: ''
            },
            formValid: [false, false, false, false, false, false, false]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.celChanged = this.celChanged.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    celChanged(newCelebration) {
        this.setState({
            celebration: newCelebration
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var newTitle = this.state.title.trim();
        var newContent = this.state.content.trim();
        var newGender = this.state.gender;
        var newPhoto = this.state.photo;
        var newAge = this.state.age;
        var newLikes = this.state.likes.trim().split(',');
        var newCelebration = this.state.celebration;
        this.props.onPresentSubmit({
            title: newTitle,
            content: newContent,
            gender: newGender,
            photo: newPhoto,
            age: newAge,
            likes: newLikes,
            celebration: newCelebration
        });
        this.setState({
            title: props.title,
            content: props.content,
            gender: props.gender,
            photo: props.photo,
            age: props.age,
            likes: props.likes,
            celebration: props.celebration
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
                fieldValid = value >= 0;
                fieldErrors.gender = fieldValid ? '' : 'Оберіть стать';
                formValid[2] = fieldValid ? true : false;
                break;
            case 'photo':
                fieldValid = value.length >= 6;
                fieldErrors.photo = fieldValid ? '' : 'Вкажіть фото';
                formValid[3] = fieldValid ? true : false;
                break;
            case 'age':
                fieldValid = value >= 0;
                fieldErrors.age = fieldValid ? '' : 'Введіть коректні межі віку';
                formValid[4] = fieldValid ? true : false;
                break;
            case 'likes':
                fieldValid = value.length >= 3;
                fieldErrors.likes = fieldValid ? '' : 'Вкажіть хоча б одне подобається';
                formValid[5] = fieldValid ? true : false;
                break;
            case 'celebration':
                fieldValid = value.length >= 0;
                fieldErrors.celebration = fieldValid ? '' : 'Оберіть хоча б одне свято';
                formValid[6] = fieldValid ? true : false;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldErrors,
            formValid: formValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    render() {
        let field = this.state.formValid,
            allFields = field[0] && field[1] && field[2] && field[3] && field[4] && field[5] && field[6],
            check = allFields ? <div className='but' onMouseDown={this.onSubmit} onMouseUp={this.props.toClose}><Check size="5vh" color='#031560' /> </div> :
            <div className='but' ><Check size="5vh" color='grey' /> </div>;
        return (
            <form className=' w-75 new-present-form d-flex flex-column justify-content-around align-items-center' onSubmit={this.onSubmit}>

                <input className={`std ${this.errorClass(this.state.formErrors.title)}`}
                    name="title"
                    placeholder="Назва"
                    value={this.state.title}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='100' />
                <FormErrors error={this.state.formErrors.title} />

                <textarea className={`${this.errorClass(this.state.formErrors.content)}`}
                    name="content"
                    placeholder="Інформація про подарунок"
                    value={this.state.content}
                    onChange={this.onChange}
                    onBlur={this.validateField}
                    maxLength='1000' />
                <FormErrors error={this.state.formErrors.content} />

                <div className='mb-4 gender d-flex justify-content-around'>
                    <label>
                        <input type="radio" value="0" name="gender" checked={this.state.gender === '0'} onChange={this.onChange} onClick={this.validateField}/>
                        <div className={(this.state.gender == '0') ? 'male checked' : 'male'} ></div>
                    </label>
                    <label>
                        <input type="radio" value="2" name="gender" checked={this.state.gender === '2'} onChange={this.onChange} onClick={this.validateField}/>
                        <div className={(this.state.gender == '2') ? 'both checked' : 'both'}></div>
                    </label>
                    <label >
                        <input type="radio" value="1" name="gender" checked={this.state.gender === '1'} onChange={this.onChange} onClick={this.validateField}/>
                        <div className={(this.state.gender == '1') ? 'female checked' : 'female'}></div>
                    </label>
                </div>
                <FormErrors error={this.state.formErrors.gender} />

                <div className='w-100 d-flex justify-content-center align-items-center'>
                    <input className='std photo'
                        name="photo"
                        placeholder="Введіть посилання або завантажте вручну"
                        value={this.state.photo}
                        onChange={this.onChange}
                        onBlur={this.validateField}/>
                    <Image size='3.6vh' color='#4E6677' />
                </div>
                <FormErrors error={this.state.formErrors.photo} />

                <div className='d-flex w-75 justify-content-around align-items-center'>
                    
                    <input className={`std age ${this.errorClass(this.state.formErrors.age)}`}
                        name="age"
                        placeholder="Початковий вік"
                        value={this.state.age[0]}
                        onChange={this.onChange}
                        onBlur={this.validateField} />
                    <input className={`std age ${this.errorClass(this.state.formErrors.age)}`}
                        name="age"
                        placeholder="Кінцевий вік"
                        value={this.state.age[1]}
                        onChange={this.onChange}
                        onBlur={this.validateField} />
                </div>
                <FormErrors error={this.state.formErrors.age} />

                <input className={`std ${this.errorClass(this.state.formErrors.likes)}`}
                    name="likes"
                    placeholder="Подобається (через кому)"
                    value={this.state.likes}
                    onChange={this.onChange}
                    onBlur={this.validateField} />
                <FormErrors error={this.state.formErrors.likes} />
                
                <CheckboxGroup
                    checkboxDepth={2} 
                    name="celebration"
                    value={this.state.celebration}
                    onChange={this.celChanged}
                    onClick={this.validateField}
                >
                    <label><Checkbox value="0" /> День народження</label>
                    <label><Checkbox value="1" /> Новий рік</label>
                    <label><Checkbox value="2" /> Жіночий день</label>
                    <label><Checkbox value="3" /> Чоловічий день</label>
                    <label><Checkbox value="4" /> День матері</label>
                    <label><Checkbox value="5" /> Інші</label>
                </CheckboxGroup>
                <FormErrors error={this.state.formErrors.celebration} />
                <div className='d-flex justify-content-around'>
                    {check}
                    <div className='but' onClick={this.props.toClose}><X size="5vh" color='#600303' /></div>
                </div>
            </form>
        );
    }
};

import * as React from 'react';
import '../css/style.css';
import 'bootstrap';

    //<p><button onClick={this.onClick}>Delete</button></p>
export class Present extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.present };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div className="col-md-5 present-div animated fadeInDown">
                <img className="present-img  rounded-circle pull-left" src={this.state.data.photo} />
                <div className="present-info">
                <p className="text-center">{this.state.data.title}</p>
                <p className="">{this.state.data.content}</p>
                </div>
          </div>;
    }
}
var genderEnum = {
    "All":2,
    "Male":0,
    "Female":1
}
var celebrationEnum = {
    "Birthday":0,
    "NewYear":1,
    "WomenDay":2,
    "MenDay":3,
    "MothersDay":4,
    "Other":5
}
export class PresentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
           gender: 0,
            photo: "",
            age: [0, 100],
            likes: "",
            hobbies: "",
            celebration: 0
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onLikesChange = this.onLikesChange.bind(this);
        this.onHobbiesChange = this.onHobbiesChange.bind(this);
        this.onCelebrationChange = this.onCelebrationChange.bind(this);
    }
   
    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    onContentChange(e) {
        this.setState({ content: e.target.value });
    }
    onGenderChange(e) {
        this.setState({ gender: e.target.value });
    }
    onPhotoChange(e) {
        this.setState({ photo: e.target.value });
    }
    onAgeChange(e) {
        this.setState({ age: e.target.value });
    }
    onLikesChange(e) {
        this.setState({ likes: e.target.value });
    }
    onHobbiesChange(e) {
        this.setState({ hobbies: e.target.value });
    }
    onCelebrationChange(e) {
        this.setState({ celebration: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var newTitle = this.state.title.trim();
        var newContent = this.state.content.trim();
        var newGender = this.state.gender;
        var newPhoto = this.state.photo;
        var newAge = this.state.age;
        var newLikes = this.state.likes.trim().split(',');
        var newHobbies = this.state.hobbies.trim().split(',');
        var newCelebration = this.state.celebration;

        this.props.onPresentSubmit({
             title: newTitle,
             content: newContent,
             gender: newGender,
             photo: newPhoto,
             age: newAge,
             likes: newLikes,
             hobbies: newHobbies,
             celebration: newCelebration
        });
        this.setState({
            title: "",
            content: "",
            gender: 0,
            photo: "",
            age: 0,
            likes: "",
            hobbies: "",
            celebration: 0
        });
    };

    render() {
        return (
            <form>
                <input
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.onTitleChange}

                />
                <br />
                <input
                    name="content"
                    placeholder="Content"
                    value={this.state.content}
                    onChange={this.onContentChange}
                />
                <br />
                <select 
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onGenderChange} >
                     <option value="0">Male</option>
                     <option value="1">Female</option>
                     <option value="2">All</option>
                  </select >
                <br />  <input
                    name="photo"
                    placeholder="Photo"
                    value={this.state.photo}
                    onChange={this.onPhotoChange}
                />
                <br />  <input
                    name="age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={this.onAgeChange}
                />
                <br />  <input
                    name="hobbies"
                    placeholder="Hobbies"
                    value={this.state.hobbies}
                    onChange={this.onHobbiesChange}
                />
                <br />  <input
                    name="likes"
                    placeholder="Likes"
                    value={this.state.likes}
                    onChange={this.onLikesChange}
                />
                <br />
                <select 
                    name="celebration"
                    value={this.state.celebration}
                    onChange={this.onCelebrationChange}>
                    <option value="0">Birthday</option>
                    <option value="1">NewYear</option>
                    <option value="2">WomenDay</option>
                    <option value="3">MenDay</option>
                    <option value="4">MothersDay</option>
                    <option value="5">Other</option>
         
                </select >
                <br />
                <br />
                <input type="submit" value="Добавить" />
            </form>
        );
    }
};

var test = [
    {
        title: "present 1",
        content: "информация про подарок ваыавыавыафвававававыф",
        gender: 0,
        photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
        age: [0, 100],
        likes: ["asdds", "Asdfsds"],
        hobbies: ["asdds", "Asdfsds"],
        celebration: 0,
        id: 1
    },

    {
        title: "present 1",
        content: "информация про подарок ваыавыавыафвававававыф",
        gender: 0,
        photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
        age: [0, 100],
        likes: ["asdds", "Asdfsds"],
        hobbies: ["asdds", "Asdfsds"],
        celebration: 0,
        id: 2
    },
    {
        title: "present 1",
        content: "информация про подарок ваыавыавыафвававававыф",
        gender: 0,
        photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
        age: [0, 100],
        likes: ["asdds", "Asdfsds"],
        hobbies: ["asdds", "Asdfsds"],
        celebration: 0,
        id: 3
    },
]


export class PresentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { presents: test };

        this.onAddPresent = this.onAddPresent.bind(this);
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
    // добавление объекта
    onAddPresent(present) {
        if (present) {
            var data = JSON.stringify({
                "title":present.title,
                "content":present.content,
                "gender":present.gender,
                "photo":present.photo,
                "age":present.age,
                "likes":present.likes,
                "hobbies":present.hobbies,
                "celebration":present.celebration
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
        return <div>
            <PresentForm onPresentSubmit={this.onAddPresent} />
            <h2>Presents</h2>
            <div>
                {
                    this.state.presents.map(function (present) {

                        return
                        <div >
                        <Present key={present.id} present={present} onRemove={remove} />
                        </div>
                            })
                }
            </div>
        </div>;
    }
}


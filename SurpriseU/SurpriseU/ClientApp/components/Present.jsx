import * as React from 'react';

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
        return <div>
            <p><b>{this.state.data.Title}</b></p>
            <p><button onClick={this.onClick}>Delete</button></p>
        </div>;
    }
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
            likes: [],
            hobbies: [],
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
        var newContent = this.state.content;
        var newGender = this.state.gender;
        var newPhoto = this.state.photo;
        var newAge = this.state.age;
        var newLikes = this.state.likes;
        var newHobbies = this.state.hobbies;
        var newCelebration = this.state.celebration;
        if (!newTitle || !newPhoto) {
            return;
        }
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
            age: [0, 100],
            likes: [],
            hobbies: [],
            celebration: 0
        });
    };

    render() {
        return (
            <form>
                <input
                    name="Title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <br />
                <input
                    name="Content"
                    placeholder="Content"
                    value={this.state.content}
                    onChange={this.onContentChange}
                />
                <br />
                <input
                    name="Gender"
                    placeholder="Gender"
                    value={this.state.gender}
                    onChange={this.onGenderChange}
                />
                <br />  <input
                    name="Photo"
                    placeholder="Photo"
                    value={this.state.photo}
                    onChange={this.onPhotoChange}
                />
                <br />  <input
                    name="Age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={this.onAgeChange}
                />
                <br />  <input
                    name="Hobbies"
                    placeholder="Hobbies"
                    value={this.state.hobbies}
                    onChange={this.onHobbiesChange}
                />
                <br />  <input
                    name="Likes"
                    placeholder="Likes"
                    value={this.state.likes}
                    onChange={this.onLikesChange}
                />
                <br />  <input
                    name="Celebration"
                    placeholder="Celebration"
                    value={this.state.celebration}
                    onChange={this.onCelebrationChange}
                />
                <br />
                <br />
                <button onClick={this.onSubmit(e)}>Add</button>
            </form>
        );
    }
};

export class PresentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { presents: [] };

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
    onRemovepresent(present) {

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
            <PresentForm onPresentSubmit={this.onAddpresent} />
            <h2>Presents</h2>
            <div>
                {
                    this.state.presents.map(function (present) {

                        return <Present key={present.id} present={present} onRemove={remove} />
                    })
                }
            </div>
        </div>;
    }
}

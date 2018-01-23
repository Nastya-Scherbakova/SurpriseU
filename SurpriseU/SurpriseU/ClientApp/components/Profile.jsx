import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';
import { Present } from './Present.jsx';
import '../css/Site.scss';

var Nastya = {
    name: 'Настя',
    age: '19',
    gender: 1,
    instagram: '',
    telegram: '',
    facebook: '',
    likes: ['спорт', 'хореографія'],
    hobbies: ['співати', 'програмування'],
    photo: 'https://pp.userapi.com/c840025/v840025300/39a4/aQuz84zS8-0.jpg'
}

class Tag extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className='tag'>
            { this.props.data}
        </div>;
    }
}


class UserLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }
    render() {

        const gender = this.state.user.gender;
        let genderIcon = null;
        if (gender == 0) {
            genderIcon = 'user-he'
        }
        else {
            genderIcon = 'user-she'
        }
        return <div className="d-flex flex-column align-items-center w-25 justify-content-center" >
                <img className="img rounded-circle " src={this.state.user.photo} />
                <div className="d-flex flex-row justify-content-around w-50">
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  tel" href={this.state.user.telegram}></a>
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  insta " href={this.state.user.instagram}></a>
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no  face" href={this.state.user.facebook}></a>
                </div>
        </div>;
    }
}

class UserRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
        this.tagsOut = this.tagsOut.bind(this)
    }

    

    tagsOut = (e) => {
        let tags = e.map(item => 
            <Tag data={item} />);
        return <div className="d-flex flex-wrap">
            <form id="form" onsubmit=''>
            <div className="input-null"> <input placeholder="Додати" /></div>
            </form>
            {tags}
        </div>;
    }
    render() {
        const hobbies = this.state.user.hobbies, likes = this.state.user.likes, tagsOut = this.tagsOut;
        return <div className="d-flex flex-column w-75">
            <div className="d-flex justify-content-center align-items-center">
                <div className="name">{this.state.user.name}, {this.state.user.age}</div>
            </div>
            <div className="d-flex justify-content-around">
            <div>
                <div className="tagTitle"><div className="title">Хоббі</div></div>
               {tagsOut(hobbies)}
             </div>
            <div >
                <div className="tagTitle"><div className="title">Подобається</div></div>
               {tagsOut(likes)}
            </div>
            </div>
        </div>;
    }
}

class LikedPresent extends React.Component {
    render() {
        return <div className="user-present">
                <img className="rounded-circle h-100" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
        </div>;
    }
}

class UserPresents extends React.Component {
    render() {
        const field = [
            {
                title: 'Друзі',
                presentFormat: ''
            },
            {
                title: 'Вподобані подарунки',
                presentFormat: ''
            },
            {
                title: 'Запропоновані подарунки',
                presentFormat: ''
            }
        ];

        let fields = field.map(item =>
            <div className="d-flex flex-column fields w-25">
                <div className="d-flex w-100 nav justify-content-center align-items-center">{item.title}</div>
                    <div className="d-flex flex-wrap justify-content-around">
                        <LikedPresent />
                        <LikedPresent />
                        
                    </div>
            </div>);
        
        return <div className="d-flex">
            {fields}
        </div>;
    }
}


export class Profile extends React.Component {
    render() {
        
        return <div className="profile h-100 w-100">
            <div className="d-flex flex-row info">
                <a className="d-flex justify-content-center align-items-center social-icon navlink-no edit"></a>
            <UserLeft user={Nastya} />
            <UserRight user={Nastya} />
            </div>
            <UserPresents user={Nastya}/>
        </div>;
    }
}




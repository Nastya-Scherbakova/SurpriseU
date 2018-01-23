import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactDOM from 'react-dom';
import { PresentsList, Present } from './Present.jsx';
import '../css/style.css';
import { Ball } from './Ball.jsx';


var test = {
    title: "Капкейки",
    content: "капкейкикапкейки",
    gender: 0,
    photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
    age: [0, 100],
    likes: ["asdds", "Asdfsds"],
    hobbies: ["asdds", "Asdfsds"],
    celebration: 0,
    id: 1
}

var test2 = {
    title: "Кульки",
    content: "кулькикульки",
    gender: 0,
    photo: "http://www.sezon.zp.ua/wp-content/uploads/2017/01/21-%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D1%8B%D0%B9-%D1%88%D0%B0%D1%80.jpg",
    age: [0, 100],
    likes: ["asdds", "Asdfsds"],
    hobbies: ["asdds", "Asdfsds"],
    celebration: 0,
    id: 2
}

var test3 = {
    title: "Капкейки22",
    content: "капкейкикапкейки",
    gender: 0,
    photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
    age: [0, 100],
    likes: ["asdds", "Asdfsds"],
    hobbies: ["asdds", "Asdfsds"],
    celebration: 0,
    id: 3
}

var test4 = {
    title: "Кульки22",
    content: "кулькикульки",
    gender: 0,
    photo: "http://www.sezon.zp.ua/wp-content/uploads/2017/01/21-%D0%B2%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D1%8B%D0%B9-%D1%88%D0%B0%D1%80.jpg",
    age: [0, 100],
    likes: ["asdds", "Asdfsds"],
    hobbies: ["asdds", "Asdfsds"],
    celebration: 0,
    id: 4
}
const tests = [test, test2, test3, test4];

//const Portal = ({ children }) => {
//    return ReactDOM.createPortal(
//        children,
//        document.getElementById('portal-nav-input')
//    );
//};

class SearchPlugin extends React.Component {

    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e) {
        this.props.filter(text);
    }

    render() {
        return <input className="form-control w-50" type="search" placeholder="Пошук" onChange={this.onTextChanged} />;   
            
        }
}


class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: this.props.data };

        this.filterList = this.filterList.bind(this);
    }

    filterList(text) {
        var filteredList = this.props.data.filter(function (item) {
            return item.title.toLowerCase().search(text.toLowerCase()) !== -1;
        });
        this.setState({ items: filteredList });
    }

    render() {
        return (
            <div>
               
                <SearchPlugin filter={this.filterList} />
                <div className="d-flex flex-row  flex-wrap justify-content-around">
                    {
                        this.state.items.map(function (item) {
                            return <Present present={item} key={item.id} />
                        })
                    }
                </div>
            </div>);
    }
}


export class Home extends React.Component{
    render() {
        return <div>
            <div className="home-image"></div>


            <PresentList />
        </div>;

    }
}


var PresentList = React.createClass({
    getInitialState: function () {
        return {
            displayedPresents: tests
        };
    },
    handleSearch: function (event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedPresents = tests.filter(function (el) {
            var searchValue = el.title.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            displayedPresents: displayedPresents
        });
    },
    render: function () {
        return (
            <div>
                <div className="w-25 mx-auto pb-3"> <input type="text" placeholder="Пошук" className="form-control" onChange={this.handleSearch} /> </div>

                <div className="d-flex flex-row  flex-wrap justify-content-around">
                    {
                        this.state.displayedPresents.map(function (el) {
                            return <Present present={el} key={el.id} />
                        })
                    }
                </div>
            </div>
        );
    }
});

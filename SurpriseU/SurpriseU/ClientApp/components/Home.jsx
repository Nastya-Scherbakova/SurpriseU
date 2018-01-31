import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReactDOM } from 'react-dom';
import { PresentsList, Present } from './Present.jsx';
import '../css/style.css';
import { Ball } from './Ball.jsx';

export class Home extends React.Component{
    render() {
        return <div>
            <div className="home-image"></div>
            <PresentsList apiUrl="/api/Presents" />
        </div>;

    }
}













var createReactClass = require('create-react-class');

var PresentList = createReactClass({
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


const Portal = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.getElementById('portal-nav-input')
    );
};

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


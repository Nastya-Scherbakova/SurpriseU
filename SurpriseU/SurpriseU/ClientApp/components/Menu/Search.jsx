import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon } from '../Shared/Icons';


@inject('presentsStore')
@withRouter
@observer
export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.openSearch = this.openSearch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ search: e.target.value });
        this.props.presentsStore.searchInput(e.target.value);
    }

    openSearch = () => {
        this.search.focus();
        this.props.presentsStore.enableFilter();
    }
    render() {
        const { isFilter } = this.props.presentsStore;
        return <div className='d-flex align-items-center h-100 w-100'>
            <div className={`d-flex align-items-center search ${isFilter && ' open'} `}>

                <input type="search" ref={(input) => { this.search = input }} className="search-input"
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
                <Icon name='ChevronRight' className='ios-right  nav-icon' onClick={this.openSearch} />
                <Icon name='Search' className='ios-search  nav-icon' onClick={this.openSearch} />
          
            </div>
        </div >;
    }
}

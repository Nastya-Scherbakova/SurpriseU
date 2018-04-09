import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from '../Shared/Icons';
import Radium, { StyleRoot } from 'radium';

@inject('presentsStore')
@observer
@Radium
class SearchInput extends React.Component {

    state = { search: '' };

    onChange = e => {
        this.setState({ search: e.target.value });
        this.props.presentsStore.searchInput(e.target.value);
    }

    openSearch = () => {
        this.search.focus();
        this.props.presentsStore.enableFilter();
    }

    render() {
        const { isFilter } = this.props.presentsStore;
        return <div className={`search  ${isFilter && 'open '} `}  style={[styles.baseInputDiv, styles[`${isFilter}InputDiv`]]}>
            <input type="search" ref={(input) => { this.search = input }} style={styles.input}
                    value={this.state.search} placeholder="Пошук" onChange={this.onChange} />
                <Icon name='ChevronRight' className='ios-right  nav-icon' onClick={this.openSearch} />
                <Icon name='Search' className='ios-search  nav-icon' onClick={this.openSearch} />
        </div >;
    }
}

@Radium
export default class Search extends React.Component {
    render() {
        return <div style={styles.div}>
            <StyleRoot><SearchInput /></StyleRoot>
        </div>;
    }
}


var styles = {
    div: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    baseInputDiv: {
        fontSize: '0.7em',
        marginLeft: '1vw',
        height: '4vh',
        position: 'relative',
        transition: 'all easy 0.3'
    },
    input: {
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        border: 'none',
        color: 'black',
        padding: '0 3vw',
        fontSize: '12px',
        backgroundColor: 'transparent',
        ':focus': {
            outline: 'none'
        }
    }

}
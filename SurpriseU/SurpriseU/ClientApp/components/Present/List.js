import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PresentPreview from './PresentPreview';
import { StyleRoot } from 'radium';
@inject('presentsStore', 'commonStore')
@withRouter
@observer
export default class PresentsList extends React.Component {
    componentDidMount() {
        this.props.presentsStore.presentsState.length == 0 
         && this.props.presentsStore.loadPresents();
    }
    getPresent = (id) => {
        const store = this.props.presentsStore.presentById,
            isUpdate = store == null ? true :
                store.id == id ? false : true;
        isUpdate && this.props.presentsStore.getPresent(id);
        this.props.history.push('present/' + id);
    }
    render() {
        const { presentsState } = this.props.presentsStore;
        return <div style={styles.list}>
            {
                presentsState.map(present =>
                    <StyleRoot key={present.id}> 
                        <PresentPreview
                            getPresent={this.getPresent}
                            present={present} />
                    </StyleRoot>)
            }
        </div>;
    }
}

var styles = {
    list: {
        width: '97vw',
        margin: 'auto',
        overflowX: 'hidden',
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-around'
    }
}
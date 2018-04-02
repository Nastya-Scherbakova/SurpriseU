import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PresentPreview from './PresentPreview';

@inject('presentsStore', 'commonStore')
@withRouter
@observer
export default class PresentsList extends React.Component {
    componentDidMount() {
        this.props.presentsStore.loadPresents();
    }

    render() {
        const { presentsState } = this.props.presentsStore;
        return <div className="d-flex flex-row  flex-wrap justify-content-around">
            {
                presentsState.map(present => <PresentPreview key={present.id} present={present} />)
            }
        </div>;
    }
}
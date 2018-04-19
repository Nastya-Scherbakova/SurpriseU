import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Filter from '../Menu/Filter'
import PresentsList from '../Present/List';
import { LoginForm } from '../organisms'

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class Home extends React.Component {
    render() {
        const { isFilter } = this.props.presentsStore;
        return <div>
            <div className={`${isFilter && 'image-fixed'}  home-image`}></div>
            {isFilter && <Filter />}
            <PresentsList />
        </div>;
    }
}






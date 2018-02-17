import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Menu } from './Menu';
import '../css/style.css';
import '../css/Site.scss';

@inject('userStore', 'commonStore', 'tagsStore')
@withRouter
@observer
export class Layout extends React.Component{
    //componentWillMount() {
    //    if (!this.props.commonStore.token) {
    //        this.props.commonStore.setAppLoaded();
    //    }
    //}

    //componentDidMount() {
    //    if (this.props.commonStore.token) {
    //        this.props.userStore.pullUser()
    //            .finally(() => this.props.commonStore.setAppLoaded());
    //    }
    //}
    componentDidMount() {
        this.props.tagsStore.loadTags();
    }
    render() {
        return <div >
            <div className='container-fluid pad'>
                    <Menu />
                </div>
            <div>
                    { this.props.children }
                </div>
        </div>;
    }
}

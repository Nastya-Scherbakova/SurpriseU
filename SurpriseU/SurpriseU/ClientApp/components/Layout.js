import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Menu from './Menu/Menu';
import '../css/Site.scss';

@inject('userStore', 'tagsStore', 'authStore')
@withRouter
@observer
export default class Layout extends React.Component{
    //componentWillMount() {
    //    this.props.userStore.getUser();
    //}
    
    componentDidMount() {
        this.props.tagsStore.loadTags();
    }
    render() {
        return <div >
            <Menu />
                <div>
                    { this.props.children }
                </div>
        </div>;
    }
}



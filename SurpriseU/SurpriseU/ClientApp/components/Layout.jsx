import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Menu } from './Menu';
import '../css/Site.scss';

@inject('userStore', 'tagsStore', 'authStore')
@withRouter
@observer
export class Layout extends React.Component{
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




export class HashTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: this.props.check
        };
    }
    render() {
        return <div className={`tag-${this.state.check ? 'check' : 'proposal'}  d-flex align-items-center`}
            onClick={this.props.onClick}>
            #{this.props.name}
        </div>
    }
}

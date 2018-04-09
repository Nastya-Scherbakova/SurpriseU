import * as React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, IconLink } from '../Shared/Icons';
import Nav from './Nav';

export default class All extends React.Component {
    render() {
        const { title } = this.props;
        return <div className="all-content animated fadeInDown">
            <Nav title={title}  />
            {this.props.children}
        </div>;
    }
}
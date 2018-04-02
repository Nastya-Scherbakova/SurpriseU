import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';




export default class HashTag extends React.Component {
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

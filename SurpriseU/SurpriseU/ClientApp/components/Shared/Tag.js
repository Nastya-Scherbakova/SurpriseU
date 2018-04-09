import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import Radium from 'radium';
import { Icon } from './Icons';

@Radium
export default class HashTag extends React.Component {
    state = { check: this.props.check }
    render() {
        return <div onClick={this.props.onClick}
            style={[styles[this.props.check], styles.base]}>
            #{this.props.name}
        </div>
    }
}


@Radium
export class UserTag extends React.Component {
    state = { check: this.props.check }
    render() {
        return <div onClick={this.props.onClick}
            style={[styles.base, styles.user]}>
            #{this.props.name}
            <Icon name='X' style={styles.deleteTag}/>
        </div>
    }
}




var styles = {
    base: {
        fontFamily: "'Lobster', cursive",
        margin: '0 1vw',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center'
    },
    true: {
        color: 'black'
    },
    false: {
        color: 'rgba(0, 0, 0, 0.3)',
        ':hover': {
            color: 'rgba(0, 0, 0, 0.5)'
        }
    },
    user: {
        margin: '0.3vh 1vh',
        fontSize: '0.75rem',
        borderRadius: '2vh',
        border: '1px solid #ECE4F4',
        padding: '0.25rem 0rem 0.25rem 0.4rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.3)',
        transition: 'all .7s ease',
        ':hover': {
            padding: '0.25rem 1rem 0.25rem 0.4rem',
        }
    },
    deleteTag: {
        position: 'relative',
        right: '-0.5rem',
        width: '0.5rem',
        height:'0.5rem'
    }
}

import * as React from 'react';
import { Icon } from './Icons';
import Radium from 'radium';
import { func, bool } from 'prop-types'


@Radium
export default class Like extends React.Component {
    static propTypes = {
        liked: bool.isRequired,
        onLike: func
    }
    render() {
        const kind = this.props.liked ? 'liked' : 'disliked';
        return <Icon name='HeartOutline' onClick={this.props.onLike}
            className={kind == 'liked' ? 'opac' : ''}
            style={styles[kind]} />
    }
}


var styles = {
    base: {
        width: '3vh',
        height:'3vh'
    },
    disliked: {
        fill: '#DBDBE3'
    },
    liked: {
        fill: '#7496DB'
    }
};

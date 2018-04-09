import * as React from 'react';
import { string } from 'prop-types';
import Radium, { StyleRoot } from 'radium';

@Radium
class Img extends React.Component {
    render() {
        return <img style={styles.present} src={this.props.src} />;
    }
}

export default class LikedPresent extends React.Component {
    static propTypes = {
        src: string
    }
    render() {
        return <StyleRoot>
            <Img src={this.props.src} />
        </StyleRoot>;
    }
}



var styles = {
    present: {
        '@media(orientation: portrait)': {
            height: '10vh',
            width: '10vh'
        },
        '@media (orientation: landscape)': {
            height: '15vh',
            width: '15vh'
        },
        backgroundColor: '#E5E6FF',
        margin: '1vh',
        borderRadius: '50%'
    }
};
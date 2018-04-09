import React, { Component } from 'react'
import { oneOfType, string, bool, number , func, object} from 'prop-types';
import Fade from 'react-reveal/Fade';
import { Icon } from '../Shared/Icons';


var styles = {
    label: {
        width: '100%',
       position: 'relative',
        minHeight: '6vh'
    },
    input: {
        width: '100%',
        height: '6vh',
        padding: '2vh 6vh',
        position: 'relative',
        transition: 'all easy 0.3',
        background: 'white',
        border: '1px solid #EAEAEA',
        borderRadius: '2px'
    },
    error: {
        color: '#DC3545'
    },
    hint: {   
        position: 'absolute',
        width: '2vh',
        height: '2vh',
        top: '2vh',
        left: '2vh',
        zIndex: '1'
    },
    valid: {
        position: 'absolute',
        width: '1vh',
        height: '1vh',
        top: '2.5vh',
        right: '2.5vh',
        zIndex: '1'
    }
}

export default class Input extends Component {
    static propTypes = {
        value: oneOfType([number, string, object]),
        label: oneOfType([object, string]),
        iconName: string,
        error: string
    };

    static defaultProps = {
        iconName: '',
        error: ''
    }

    render() {
        const { iconName, value, error, ...other } = this.props;
        return <label style={styles.label}>
            <Icon style={styles.hint} name={iconName} />
            <input style={styles.input} {...other}
                value={value} />
            <Fade bottom collapse when={error.length > 4}>
                <div style={styles.error}>
                    {error}
                </div>
            </Fade>
            <Fade clear when={error.length > 4}>
                <Icon style={styles.valid} name='X' fill="#D25C5C" />
            </Fade>
            <Fade clear when={error.length == 0}>
                <Icon style={styles.valid} name='Check' fill='#5BD2B3' />
            </Fade>
        </label>;
    }
}
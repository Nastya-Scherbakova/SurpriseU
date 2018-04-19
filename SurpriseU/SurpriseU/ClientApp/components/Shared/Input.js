import React, { Component } from 'react'
import { oneOfType, string, bool, number , func, object} from 'prop-types';
import Fade from 'react-reveal/Fade';
import { Icon } from './Icons';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';


var styles = {
    label: {
        width: '100%',
        position: 'relative',
        margin: '1vh 0'
    },
    input: {
        width: '100%',
        height: '5vh',
        paddingLeft: '5.5vh',
        paddingRight: '2vh',
        position: 'relative',
        transition: '$transition',
        fontSize: '1em',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(170, 170, 170, 0.6)',
        borderRadius: '2.5vh'
    },
    error: {
        color: '#DC3545'
    },
    hint: {
        position: 'absolute',
        width: '3vh',
        height: '3vh',
        bottom: '1vh',
        left: '1.5vh',
        zIndex: '1'
    }
}

export default class Input extends Component {
    static propTypes = {
        value: oneOfType([number, string, object]),
        label: oneOfType([object, string]),
        iconName: string,
        error: string,
        onChange: func,
        onBlur: func
    };

    static defaultProps = {
        label: '',
        iconName: '',
        error: ''
    }

    render() {
        const { label, iconName, value, error, onChange, onBlur, ...other } = this.props;
        return <label style={styles.label}>{label}
            <Icon style={styles.hint} name={iconName} />
            <input style={styles.input} {...other}
                placeholder={this.props.placeholder || label}
                value={value}
                onChange={onChange}
                onBlur={onBlur} />
            <Fade bottom collapse when={error.length > 0}>
                <div style={styles.error}>
                    {error}
                </div>
            </Fade>
        </label>;
    }
}

export class DateInput extends Component {
    static propTypes = {
        value: oneOfType([number, string, object]),
        label: oneOfType([object, string]),
        iconName: string,
        error: string,
        onChange: func,
        onBlur: func
    };

    static defaultProps = {
        label: '',
        iconName: '',
        error: ''
    }
    
    render() {
        const { label, iconName, value, error, onChange, onBlur, ...other } = this.props;
        return <label style={styles.label}>{label}
            <Icon style={styles.hint} name={iconName} />
            <DayPickerInput style={styles.input} 
                value={value}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={onChange} {...other } />
            <Fade bottom collapse when={error.length > 0}>
                <div style={styles.error}>
                    {error}
                </div>
            </Fade>
        </label>;
    }
}
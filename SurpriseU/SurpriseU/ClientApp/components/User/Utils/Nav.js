import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from '../../Shared/Icons';
import { string } from 'prop-types'

@withRouter
export default class Nav extends React.Component {
    static propTypes = {
        title: string
    }

    back = () => this.props.history.goBack();

    render() {
        const { title } = this.props;
        return <div style={styles.nav}>
            <Icon onClick={this.back} name='Back' style={styles.liked}/>{title}
        </div>;
    }
}



export const PreviewTitle = ({ title = 'React' }) => <div style={styles.nav}>{title}</div>

PreviewTitle.propTypes = {
    title: string
}

var styles = {
    nav: {
        width: '100%',
        position: 'relative',
        background: 'linear-gradient(to right, #FFFFFF, #C1C3FF)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '2vh 2vh 0 0',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '1.3em',
        height: '6vh'
    },
    liked: {
        fill: 'url(#icon)',
        width: '3vh',
        height: '3vh',
        position: 'absolute',
        left: '1.5vh',
        top: '1.5vh'
    }
};
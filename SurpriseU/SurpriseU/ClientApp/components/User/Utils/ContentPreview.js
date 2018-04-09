import * as React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, IconLink } from '../../Shared/Icons';
import { string, bool, array } from 'prop-types'
import { PreviewTitle } from './Nav';
import Radium, { StyleRoot } from 'radium';
import LikedPresent from './ImgItem';

@withRouter
@Radium
export default class Preview extends React.Component {
    static propTypes = {
        title: string,
        isAdd: bool,
        link: string,
        presents: array
    }
    static default = {
        isAdd: false
    }
    render() {
        const { title, isAdd, link, presents } = this.props;
        return <div className="presents">
            <PreviewTitle title={title} />
            <div style={[styles[`${isAdd}add`], styles.itemsBase]}>
                {isAdd && <StyleRoot><Add /></StyleRoot>}
                {presents.map(present => <LikedPresent key={present.id} src={present.src} />)}
                <IconLink name='ChevronRight' className='more' to={this.props.match.url + '/' + link} />   
            </div>
            </div>;
    }
}


const Add = Radium(() => <div style={styles.plusDiv}>
    <IconLink to="/presents/new" name='Plus' style={styles.plusIcon} className='scale1-1' />
</div>);


var styles = {
    itemsBase: {
        display: 'flex',
        flexWrap: 'nowrap',
        height: '100%',
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    trueAdd: {
        '@media(orientation: portrait)': {
            paddingLeft: '12vh'
        },
        '@media (orientation: landscape)': {
            paddingLeft: '17vh'
        },
    },
    plusDiv: {
        position: 'relative',
        left: '1vh',
        background: '#E5E6FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        marginRight: '1vh',
        '@media (orientation: portrait)': {
            width: '10vh',
            height: '10vh'
        },
        '@media (orientation: landscape)': {
            width: '15vh',
            height: '15vh'
        }
    },
    plusIcon: {
        fill: 'white',
        width: '5vh',
        height: '5vh',
        left: '2.5vh',
        top: '2.5vh'
    }
};
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, IconLink } from './../Shared/Icons';
import ContentPreview from './Utils/ContentPreview';
import LikedPresent from './Utils/ImgItem';
import Friends from './Friends'
import Likes from './Tags'



@withRouter
export default class Info extends React.Component {
    render() {
        const { currentUser } = this.props;
        return <div className="info">
            <Icon name='Search' style={styles.search}/> 
            <IconLink to={'/edit/account'} name='Edit' style={styles.settings} />
             
            <div className='left d-flex flex-column'>
            <div className='photo'>
                <div className='plus-photo'><Icon name='Upload' /></div>
                {currentUser != null &&
                    (currentUser.photo == null ?
                        <Icon name='UserImage' /> :
                        <img src={currentUser.photo} />)}
            </div>

            <div className='name'>{currentUser.name}</div>
            <div className="d-flex align-items-center age"> <Icon name='Clock' /> {currentUser.age.substr(0, 11)}</div>
            </div>


            <div className='fr-likes d-flex flex-column'>
                <Likes />
                <Friends />
            </div>

            <div className='social-tabs'>
                <div className='twitter'>   <Icon name='Twitter' />    </div>
                <div className='social-border'>   <Icon name='Instagram' />    </div>
                <div className='social-border'>   <Icon name='Facebook' />    </div>
            </div>

        </div>;
    }
}

var styles = {
    settings: {
        position: 'absolute',
        top: '2vh',
        right: '2vh',
        width: '2vh',
        height: '2vh'
    },
    search: {
        position: 'absolute',
        top: '2vh',
        left: '2vh',
        width: '2vh',
        height: '2vh'
    }
}
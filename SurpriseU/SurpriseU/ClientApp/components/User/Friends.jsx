import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon } from '../Shared/Icons';


export const Friends = () => <div className="friends">
    <div className="title"><div className='text'>Друзі</div></div>
    <div className="d-flex h-100 align-items-center">
        <div className="items">
            {LikedPresent}
            {LikedPresent}
        </div>
        <Icon name='ChevronRight' className='scale1-1' fill='#E5E6FF' height='5vh'/>
    </div>
</div>;


const LikedPresent = <div className="user-present rounded-circle border-0">
    <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
</div>;

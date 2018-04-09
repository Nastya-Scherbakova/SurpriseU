import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Authorized from './Utils/AuthHOC';
import Info from './Info'
import ContentPreview from './Utils/ContentPreview';

@inject('userStore')
@observer
class UserMain extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        return <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{console.log(currentUser)}</div>
                <Info currentUser={currentUser}/>
                <div className='d-flex content align-items-center'>
                <LikedPresents presents={presents}/>
                <AddedPresents presents={presents}/>
                </div>
            </div>;
    }
}

export default Authorized(UserMain);



class LikedPresents extends React.Component {
    render() {
        const { presents } = this.props;
        return <ContentPreview
            title={'Вподобані подарунки'}
            presents={presents}
            isAdd
            link={'likes'}
        />;
    }
}

class AddedPresents extends React.Component {
    render() {
        const { presents } = this.props;
        return <ContentPreview
            title={'Запропоновані подарунки'}
            presents={presents}
            link={'offers'}
        />;
    }
}

const presents = [
    { id: 1, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 2, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 3, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 4, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 5, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800'}, 
    { id: 6, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 7, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' }
];
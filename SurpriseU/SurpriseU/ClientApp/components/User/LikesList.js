import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, IconLink } from '../Shared/Icons';
import Authorized from './Utils/AuthHOC';
import All from './Utils/AllContent';
import LikedPresent from './Utils/ImgItem';

class Likes extends React.Component {
    render() {
        return <All title='Вподобані подарунки'>
            <div className="content">
                {presents.map(present => <LikedPresent key={present.id} src={present.src} />)}
            </div>
        </All>;
    }
}

export default Authorized(Likes);
const presents = [
    { id: 1, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 2, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 3, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 4, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 5, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 6, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    { id: 7, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' }
];


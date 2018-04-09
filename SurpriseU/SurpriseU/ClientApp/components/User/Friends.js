import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, IconLink } from '../Shared/Icons';
import Authorized from './Utils/AuthHOC';
import All from './Utils/ContentPreview';
import { PreviewTitle } from './Utils/Nav';

@withRouter
export default class Friends extends React.Component {
    //static propTypes = {
    //    title: string,
    //    link: string,
    //    presents: array
    //}
    render() {
        const { title, isAdd, link ='friends'} = this.props;
        return <div className="fr">
            <div style={styles.nav}>
                Друзі</div>
            <div style={styles.itemsBase}>
                {presents.map(present => <img key={present.id}style={styles.present} src={present.src } />)}
                <IconLink name='ChevronRight' className='more' to={this.props.match.url + '/' + link} />
            </div>
        </div>;
    }
}



var styles = {
    itemsBase: {
        display: 'flex',
        height: '100%',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    present: {
        width: '7vh',
        height: '7vh',
        margin: '1vh',
        borderRadius: '50%'
    },
    nav: {
        width: '100%',
        position: 'absolute',
        background: 'linear-gradient(to right, #FFFFFF, #C1C3FF)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '2vh 2vh 0 0',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '1.3em',
        height: '3vh',
        top: '0'
    },
};

        const presents = [
    {id: 1, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 2, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 3, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 4, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 5, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800'},
    {id: 6, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' },
    {id: 7, src: 'https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800' }
];



import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter, NavLink } from 'react-router-dom';
import { UserTag} from '../Shared/Tag';



export default class Likes extends React.Component {
    render() {
        const likes = [{ name: 'спорт', id: 1 }, { name: 'хореографія', id: 2 }, { name: 'співати', id: 3 }, { name: 'програмування', id: 4 }];
        return <div className="likes" >
            <div style={styles.title}>Подобається</div>
            <div className="tags">
                <input placeholder="+" />
                {
                    likes.map(like => <UserTag key={like.id} name={like.name} check={true} />)
                }   </div>
        </div>;
    }
}
var styles = {
    title: {
        fontWeight: '400',
        color: '#8B8690'
    }
}
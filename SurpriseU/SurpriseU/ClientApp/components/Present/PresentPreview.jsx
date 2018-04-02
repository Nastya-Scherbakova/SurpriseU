import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Icon } from '../Shared/Icons';



@inject('presentsStore')
@withRouter
@observer
export default class PresentPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.present,
            liked: false,
            showModal: false,
        };
        this.onLike = this.onLike.bind(this);
    }

    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));

    render() {
        return <div className="present-preview animated fadeInDown">
            <img className="img  rounded-circle pull-left" src={this.state.data.photo} />
            <div className="info">
                <div className="title">{this.state.data.title}</div>
                <div className="d-flex justify-content-start align-items-center about">
                    {this.state.data.content}
                </div>
                <div className="bottom">

                    <NavLink className="navlink-no nav " to={`/present/${this.state.data.id}`}>
                        Читати далі<Icon name='RightArrow' />
                    </NavLink>
                    <div className="like-users">
                        <div className='add1'></div>
                        <div className='add2'></div>
                        <div className='add3 mr-1'></div>  +1143

                    </div>
                    <Icon onClick={this.onLike} className={` ${this.state.liked ? 'like' : 'without-like'}`} name='Heart' />
                </div>
            </div>
        </div>;
    }
}
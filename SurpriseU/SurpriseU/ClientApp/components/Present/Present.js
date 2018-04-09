import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { inject, observer } from 'mobx-react';
import { Icon, IconLink } from '../Shared/Icons';
import Radium from 'radium';
import { Spinner } from '../Shared/Spinner';
import { string, shape, number} from 'prop-types';
import Like from '../Shared/Like';


@inject('presentsStore')
@withRouter
@observer
class Present extends React.Component {
    state = {
        liked: false
    }
    static propTypes = {
        present: shape({
            title: string,
            photo: string,
            content: string
        })
    }
    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));
   
    onRemovePresent = () => this.props.presentsStore.deletePresent(this.state.data);

    render() {
        const present = this.props.presentsStore.presentById,
        { isLoading }= this.props.presentsStore;
        return <div className="present-back"> <div className="present animated fadeInDown">
            {isLoading ? Spinner :
                <div className='main'>
                    <div className='top'>
                        <IconLink name='Back' to={`/`} />
                        <Like liked={this.state.liked} onLike={this.onLike} />
                    </div>
                    <img className="img" src={present.photo} />
                    <div className="info">
                        <div className="title">
                            {present.title}
                        </div>
                        <div className="age">
                            <div className="age"> <Icon name='UserSimple' />
                                ж, ч</div>
                            <div className="age"> <Icon name='Clock' /> 
                         
                                {present.startAge}-{present.endAge}</div>
                            <div className="age"> <Icon name='HeartOutline' />
                                    12 </div>
                        </div>
                        <div className="about">
                            {present.content}
                        </div>
                       
                    </div>
                    <div className="settings">
                    <IconLink to={`${this.props.match.url}/edit`} name='Pencil' />
                    <Icon onClick={this.onRemovePresent} name='Trash' />
                </div>
                </div>}
        </div> </div>
        };
    }

export default Present;


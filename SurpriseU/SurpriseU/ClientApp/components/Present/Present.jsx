import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { inject, observer } from 'mobx-react';
import { Button } from '../Icons';
import Radium from 'radium';


var styles = {
    notliked: {
        fill: '#DBDBE3'
    },
    liked: {
        fill: '#7496DB'
    }
};



@inject('presentsStore')
@withRouter
@observer
class Present extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
        this.onRemovePresent = this.onRemovePresent.bind(this);
    }
    componentDidMount() {
        this.props.presentsStore.getPresent(this.props.location.pathname.substr(9));
    }
    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));
    
    onRemovePresent = () => this.props.presentsStore.deletePresent(this.state.data);
    render() {
        const present = this.props.presentsStore.currentPresent;
        return <div className="present-back"> <div className="present animated fadeInDown">
            {present != null &&
                <div className='main'>
                    <div className='top'>
                        <NavLink className="navlink-no" to={`/`}>
                            <Button name='Back' className='back' />
                        </NavLink>
                        <Button name='HeartOutline' onClick={this.onLike}
                            className={this.state.liked ? 'animated opac': ''}
                            style={this.state.liked ? styles.liked:styles.notliked} />
                    </div>
                    <img className="img" src={present.photo} />
                    <div className="info">
                        <div className="title">
                            {present.title}
                        </div>
                        <div className="age">
                            <div className="age"> <Button name='UserSimple' />
                                ж, ч</div>
                            <div className="age"> <Button name='Clock' /> 
                         
                                {present.startAge}-{present.endAge}</div>
                            <div className="age"> <Button name='HeartOutline' />
                                    12 </div>
                        </div>
                        <div className="about">
                            {present.content}
                        </div>
                       
                    </div>
                <div className="settings">
                    <NavLink className="navlink-no nav " to={`/present/${present.id}/edit`}><Button name='Pencil' /></NavLink>
                    <Button onClick={this.onRemovePresent} name='Trash' />
                </div>
                </div>}
        </div> </div>
        };
    }

export default Radium(Present);


import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PresentForm from './BaseForm';
import { Redirect } from 'react-router';
import HashTag from '../Shared/Tag';
import { Icon } from '../Shared/Icons';

@inject('presentsStore', 'commonStore')
@withRouter
@observer
export default  class EditPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: this.props.presentsStore.presentById.title,
                content: this.props.presentsStore.presentById.content,
                gender: this.props.presentsStore.presentById.gender,
                photo: this.props.presentsStore.presentById.photo,
                startAge: this.props.presentsStore.presentById.startAge,
                endAge: this.props.presentsStore.presentById.endAge,
                tags: []
            },
            close: false
        };
        this.onEditPresent = this.onEditPresent.bind(this);
    }

    onEditPresent(present) {
        if (present) {
            this.props.presentsStore.editPresent(present);
        }
    }
    close = () => this.props.history.goBack();
    render() {
        return <div className='addPresent w-100 h-100 d-flex align-items-center' >
            <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
                <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Редагувати подарунок</div>
                <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.close} isNew={false} present={this.state.data} />
            </div>
        </div>;
    }
}






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
export default class NewPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            present: {
                title: '',
                content: '',
                gender: '0',
                photo: '',
                startAge: '',
                endAge: '',
                tags: []
            }
        };
        this.onAddPresent = this.onAddPresent.bind(this);
    }

    onAddPresent(present) {
        if (present) {
            this.props.presentsStore.createPresent(present);
        }
    }

    render() {
        return <div className='addPresent'><div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Додати подарунок</div>
            <PresentForm onPresentSubmit={this.onAddPresent} toClose={this.props.toClose} present={this.state.present} isNew={true}
            />
        </div>
        </div>;
    }
}

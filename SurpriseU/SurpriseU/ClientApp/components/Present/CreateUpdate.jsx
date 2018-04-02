import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PresentForm from './BaseForm';
import { Redirect } from 'react-router';


@inject('presentsStore', 'commonStore')
@withRouter
@observer
export class EditPresent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: this.props.presentsStore.currentPresent.title,
                content: this.props.presentsStore.currentPresent.content,
                gender: this.props.presentsStore.currentPresent.gender,
                photo: this.props.presentsStore.currentPresent.photo,
                startAge: this.props.presentsStore.currentPresent.startAge,
                endAge: this.props.presentsStore.currentPresent.endAge,
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
    close = () => this.setState({ close: true });
    render() {
        return <div className='addPresent w-100 h-100 d-flex align-items-center' >
            <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
                <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Редагувати подарунок</div>
                <PresentForm onPresentSubmit={this.onEditPresent} toClose={this.close} isNew={false} present={this.state.data} />
            </div>
            {this.state.close && <Redirect to={this.props.location.pathname.slice(0, -5)} />}
        </div>;
    }
}





@inject('presentsStore', 'commonStore')
@withRouter
@observer
export class NewPresent extends React.Component {
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
        return <div className='form-add d-flex flex-column align-items-center animated fadeInDown'>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center name">Додати подарунок</div>
            <PresentForm onPresentSubmit={this.onAddPresent} toClose={this.props.toClose} present={this.state.present} isNew={true}
            />
        </div>;
    }
}

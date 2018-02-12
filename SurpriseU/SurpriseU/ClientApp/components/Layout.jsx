import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Menu } from './Menu.jsx';
import '../css/style.css';





@inject('commonStore')
@withRouter
@observer


export class Layout extends React.Component{
    



    render() {
        return <div >
            <div className='container-fluid pad'>
                    <Menu />
                </div>
            <div>
                    { this.props.children }
                </div>
        </div>;
    }
}

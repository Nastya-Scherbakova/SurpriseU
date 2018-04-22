import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Menu, Filter, PresentsList } from '../organisms'

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class Home extends React.Component {
    render() {
        return <div>
            <Filter /><Menu isSearch />
            <PresentsList />
        </div>;
    }
}






import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { PresentCard } from '../organisms'
import styled from 'styled-components'
@inject('presentsStore')
@withRouter
@observer
export default class PresentsList extends React.Component {
    componentDidMount() {
        this.props.presentsStore.presentsState.length == 0
            && this.props.presentsStore.loadPresents();
    }
    getPresent = (id) => {
        const store = this.props.presentsStore.presentById,
            isUpdate = store == null ? true :
                store.id == id ? false : true;
        isUpdate && this.props.presentsStore.getPresent(id);
        this.props.history.push('present/' + id);
    }
    render() {
        const { presentsState } = this.props.presentsStore;
        return <List>
            {
                presentsState.map(present =>
                    <PresentCard key={present.id}
                        present={present} />)
            }
        </List>;
    }
}



const List = styled.div`
 width: 97vw;
        margin: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

`
